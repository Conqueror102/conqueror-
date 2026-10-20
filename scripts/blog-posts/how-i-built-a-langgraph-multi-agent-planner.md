I built B4Build as a LangGraph state machine with five nodes: a rule-based coordinator that decides what is missing, a phase worker that runs nine planning phases, a synthesizer that compiles the report, a red-team agent that attacks it, and a conversation handler that re-runs only the phases a follow-up question affects. A FastAPI backend streams each phase to a Next.js interface as it finishes, and the whole thing runs on AWS, provisioned with Terraform.

This post walks through why I split it up that way, what each agent does, and the parts that were harder than the diagram suggests.

## The problem a single prompt can't solve

Founders building with AI face dozens of decisions at once. Is the idea worth building? Which model? Build or buy? Where should it run, and what will it cost when people actually use it? Most people get those answers in pieces, from different people, after they've already started.

My first instinct, like everyone's, was one big prompt: describe the idea, get a plan back. It doesn't hold up. The answers depend on each other. The model you choose changes the architecture, the architecture changes the infrastructure, and the infrastructure changes the cost. A single response flattens all of that, and when the founder changes one assumption you have to start again.

So the plan has to be broken into phases that build on each other, checked for weak spots, and updated when one input changes. That is a graph, not a prompt.

## Five nodes, each with one job

B4Build's graph has five nodes:

1. **Coordinator.** Looks at the current state and decides which phase is missing next.
2. **Phase worker.** Runs the planning phases, from pressure-testing the idea and choosing a model through architecture, infrastructure, cost, security and observability to the scaling path. Each phase reads the results of the ones before it.
3. **Synthesizer.** Compiles the finished phases into one structured report.
4. **Red team.** Attacks the report looking for fatal flaws before the founder relies on it.
5. **Conversation handler.** Classifies follow-up questions and works out which phases they touch.

In LangGraph terms the shape looks roughly like this. This is a simplified sketch, not the code from the repo:

```python
# Simplified sketch of the graph shape
from langgraph.graph import StateGraph, END

graph = StateGraph(PlanState)
graph.add_node("coordinator", coordinator)
graph.add_node("phase_worker", run_phase)
graph.add_node("synthesizer", synthesize)
graph.add_node("red_team", red_team)

graph.set_entry_point("coordinator")
graph.add_conditional_edges("coordinator", next_step, {
    "phase": "phase_worker",
    "synthesize": "synthesizer",
})
graph.add_edge("phase_worker", "coordinator")
graph.add_edge("synthesizer", "red_team")
graph.add_edge("red_team", END)
```

The loop between the coordinator and the phase worker is the heart of it. The coordinator sends work out, the result comes back into shared state, and the coordinator decides again.

## Why the coordinator isn't an LLM

A lot of multi-agent examples use a model as the router: "here is the state, which agent should go next?" I didn't do that.

Deciding which phase is missing next doesn't need judgment. If the cost phase hasn't run, run it. If every phase is done, synthesize. Plain rules make routing free, fast and predictable, and they never decide on a whim to skip security. I only spend model calls where judgment is actually needed: inside the phases, in the synthesis and in the red team.

That one decision made the system much easier to debug. When a run goes wrong, I know the routing wasn't the problem.

## A red team that tries to break the plan

The red-team agent is the part people ask about most. Once the synthesizer has produced a plan, a second agent reads it with a different brief: find what would make this fail. Every plan gets one critique before the founder sees it as finished.

The reason is simple. The agent that wrote a plan is the worst reviewer of it, because it shares all of the plan's assumptions. A separate agent with an adversarial prompt doesn't. It's the same reason we do code review.

## Follow-ups that don't start from scratch

The question I wanted B4Build to answer well is "what if I use Claude instead?"

Changing the model shouldn't mean re-running everything. The conversation handler classifies the question, works out which phases it affects, and only those phases run again. The rest of the plan stays as it was, and plans and their versions are stored in Postgres with SQLAlchemy and Alembic migrations, so you can compare one iteration with the last.

This is also the trade-off I'm most careful about. Partial re-runs are fast and cheap, but the impact analysis has to be right about which phases a change touches. If it misses one, part of the plan goes stale without anyone noticing.

## Keeping model calls on a leash

Every model call in B4Build goes through one LLM client. That client enforces timeouts, retries and cost caps, and every call is traced in LangSmith.

Agent systems have a habit of quietly running up bills. One phase retries, another loops, and nobody notices until the invoice arrives. With a single client, no phase can do that on its own, and when something looks odd I can open the trace and see exactly which agent said what.

## Streaming a run that takes minutes

A full plan runs nine phases and can take minutes. A normal HTTP request would time out, and the user would stare at a spinner the whole time.

The FastAPI backend streams progress with Server-Sent Events as each phase finishes, and the Next.js interface renders the plan as it arrives, with architecture diagrams, cost charts and version history. You can start reading the idea validation while the infrastructure phase is still running.

## The AWS parts that bit me

B4Build runs on AWS Fargate with RDS and Redis, provisioned with Terraform and deployed by GitHub Actions. Three things took longer than I expected.

**Mixed content.** The frontend on Amplify is HTTPS, but the API sat behind a plain-HTTP load balancer, so browsers blocked every call. Terraform now puts CloudFront in front of the load balancer, which gives the API an HTTPS URL without buying a domain, with the option to add a custom domain on the load balancer later.

**A private database.** RDS lives in private subnets with TLS required, so migrations couldn't run from my laptop, and the container rejected the database certificate. Migrations now run as a one-off ECS task with its own task definition, and the Docker image ships Amazon's global CA bundle, so the TLS connection is verified rather than switched off.

**Secrets in CI.** There are no AWS keys in GitHub. Deployments assume a role through GitHub OIDC, and Terraform state lives in S3 with a DynamoDB lock, so two applies can't corrupt it.

The honest cost of all this is a fixed monthly bill even when nobody is using it. A VPC, Fargate, RDS and Redis are a production-grade reference architecture, not the cheapest way to host a side project.

## What I'd tell someone building their first agent system

- Give every agent one job, and make the router boring.
- Put a second agent on the output whose only job is to disagree.
- Route every model call through one place with timeouts, retries and a cost cap.
- Stream progress. Minutes of silence feels broken even when it isn't.
- Store versions, so a follow-up is a diff and not a rewrite.

The full code, including the agent graph, prompts and Terraform, is [on GitHub](https://github.com/Conqueror102/b4build), and the [B4Build case study](/projects/b4build) covers the architecture in more detail.

## FAQ

**What is B4Build?**
B4Build is a multi-agent AI tool I built that turns an AI product idea into a full build plan across nine phases, from pressure-testing the idea to the scaling path, then sends a red-team agent to find its weak spots.

**Which tools does B4Build use?**
Python, FastAPI, LangGraph, the OpenAI API, Pydantic and PostgreSQL on the backend, Next.js and TypeScript with Clerk on the frontend, and AWS with Terraform, Docker and GitHub Actions for infrastructure, with LangSmith for tracing.

**Can you build an agent workflow like this for my product?**
Yes. I can add LLM features to an existing product or design an agent workflow from scratch. [Tell me what you're building](/#contact).
