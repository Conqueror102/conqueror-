Paystack webhooks done right means four things: verify the signature before you trust anything, re-verify the transaction with Paystack before you give anything away, make recording a payment idempotent so the webhook and the redirect can both arrive without charging or crediting twice, and keep money as whole kobo in a ledger instead of a running total. That's how I built payments for SureCova, a subscription telemedicine platform for Nigeria and Ghana, and the same rules show up across the other Paystack integrations I've built.

Here is each rule, why it exists, and the failure it prevents.

## Why webhooks are where payments go wrong

When someone pays with Paystack, you usually hear about it twice. The customer's browser is redirected back to your site, and Paystack sends a webhook to your server. They tend to arrive close together, in either order. Sometimes the customer closes the tab and the redirect never comes. Sometimes Paystack retries the webhook because your server was slow to answer.

So a payment integration has to be correct when it is told about the same payment zero, one or several times, by two different paths, in any order. Most bugs I've fixed in other people's payment code come down to assuming exactly one notification.

## Rule 1: verify the signature over the raw body

Paystack signs every webhook. The `x-paystack-signature` header is an HMAC-SHA512 of the request body, keyed with your secret key. If the signature doesn't match, the request didn't come from Paystack and you drop it.

The detail that catches people out is computing it over the raw body. If your framework has already parsed the JSON and you re-serialize it, the bytes can differ and valid webhooks fail. In NestJS that means keeping the raw body available for this one route.

```ts
// Simplified: verify a Paystack webhook signature
import { createHmac, timingSafeEqual } from "node:crypto"

function isFromPaystack(rawBody: Buffer, signature: string, secret: string) {
  const expected = createHmac("sha512", secret).update(rawBody).digest("hex")
  return signature.length === expected.length &&
    timingSafeEqual(Buffer.from(signature), Buffer.from(expected))
}
```

I check webhook signatures with HMAC-SHA512 on the Milky Way store as well, and on DriveStack, which bills through Dodo Payments rather than Paystack, the same idea applies: the signature is verified over the raw body before anything else happens.

## Rule 2: never trust the amount the client sends

The server decides the price. On Course Correct, a paid course platform for university students, checkout reads the price from the admin settings and converts it to kobo itself, and the payment is verified with Paystack before the course unlocks. The client never says how much it paid.

The redirect is the same story. A redirect back to your site is just a URL with a reference in it, and anyone can visit a URL. On Milky Way the callback re-verifies the transaction with Paystack before touching the order. The redirect is a hint to go and check, never proof.

One small rule from Course Correct that I like: accept overpayment, reject only underpayment. A student who paid the full amount or more should never be locked out because of a rounding difference somewhere upstream.

## Rule 3: make recording a payment idempotent

Since the webhook and the redirect can both confirm the same payment, and Paystack can retry the webhook, recording a payment has to be safe to do more than once. Whichever path arrives first confirms it. The second one finds it already done and does nothing.

There are a few ways to get there:

- **Record the event inside the same transaction as its effects.** On DriveStack, the webhook id is stored in the same database transaction that changes the subscription, so a repeat is recognised and ignored. If the transaction fails, neither the record nor the effect exists, and the retry runs cleanly.
- **Idempotency keys on checkout.** On Tender Cradle, a nursery shop, checkout accepts an idempotency key. A double-click or a slow network that submits twice gets the first order back instead of creating a second one.
- **Key recurring charges to the period.** On SureCova, billing is capped at one settlement per calendar month. A scheduler that runs twice, or a test run repeated, verifies instead of charging again.

The common thread is that "has this already happened?" is answered by the database, not by timing.

## Rule 4: never retry a call to the payment provider

This one sounds backwards, because retries usually make systems more reliable. But a retry on a network call to a payment provider is how money gets sent twice. If the request timed out, you don't know whether it went through.

On SureCova, the retry helper only retries PostgreSQL's serialization failures and deadlocks (error codes `40001` and `40P01`) with bounded backoff, and it never retries calls to a payment provider. A timed-out provider call is something to look into, not something to fire again.

## Rule 5: keep money in a ledger, in whole units

SureCova's payments live in their own service with their own database. Clinical data and money have different failure modes and different auditors, and isolating payments means a bug in scheduling can't touch balances.

Inside that service, every movement of money is a balanced double-entry journal entry, stored as an exact integer in minor units. Kobo, not naira with decimals. A doctor's payout is traced line by line instead of trusting a running total, and it shows exactly what reaches the bank after fees.

The hardest bug I hit there was reserving a doctor's earnings for a payout. That's a compare-and-set on money. The ORM's single-row update failed a concurrency test that fired simultaneous reservations at the same balance, because it resolved the row first and then wrote by id. I rewrote guarded money writes as one `UPDATE` whose `WHERE` clause checks both a version number and the available amount, and I count the rows it changed. Zero rows means a conflict or not enough balance. Only when exactly one row changes is the ledger entry written, in the same transaction. That concurrency test is now part of the suite.

The cost of a separate payments service is real: two services to deploy, a network hop between them, and contracts that have to stay in step. For anything that pays people out, I think it's worth it.

## A checklist you can use today

- Verify the webhook signature over the raw body, and use a constant-time comparison.
- Re-verify the transaction with Paystack before granting anything, on both the webhook and the redirect.
- Let the server decide the price, in kobo.
- Make recording a payment idempotent, and decide "already done?" in the database.
- Retry database conflicts, never provider calls.
- Store money as integers in a ledger, and test concurrent writes against the same balance.

The [SureCova case study](/projects/surecova) covers the full platform, including the payments service and the ledger.

## FAQ

**How do I verify a Paystack webhook?**
Compute an HMAC-SHA512 of the raw request body using your Paystack secret key and compare it with the `x-paystack-signature` header using a constant-time comparison. Reject the request if they don't match.

**Should I confirm a Paystack payment on the redirect or the webhook?**
Both. Treat whichever arrives first as the trigger, re-verify the transaction with Paystack, and make recording idempotent so the second one does nothing. That way a closed tab never leaves a paid order stuck as pending.

**Can you integrate Paystack into my product?**
Yes. I've built Paystack collections, verified webhooks, reconciliation and doctor payouts for SureCova, and Paystack checkouts for course, shop and nursery platforms. [Get in touch](/#contact).
