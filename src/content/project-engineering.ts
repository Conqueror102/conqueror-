import type { ProjectEngineering } from "./projects"

/**
 * How each project was built: the hard problems hit along the way, the decisions made and why,
 * and what each choice gave up. Written from each codebase, its docs and its commit history.
 */
export const projectEngineering: Record<string, ProjectEngineering> = {
  surecova: {
    challenges: [
      { title: "Money that can’t be double-spent", problem: "Reserving a doctor’s earnings for a payout is a compare-and-set on money. The obvious approach, the ORM’s single-row update, failed a concurrency test that fired simultaneous reservations at the same balance, because it resolved the row first and then wrote by id.", solution: "I rewrote guarded money writes as one UPDATE whose WHERE clause carries both a version number and an available-amount check, and count the rows it changed. Zero rows means a conflict or insufficient balance; only when exactly one row changes is the ledger entry written, in the same transaction. The concurrency test is now part of the suite, and the rule is recorded in an architecture decision so nobody “simplifies” it back." },
      { title: "A schema that worked on every laptop and failed in production", problem: "Seeding used the ORM’s synchronize mode, so local databases always matched the entity files. Production only ever saw migrations. A forgotten migration was invisible locally and surfaced as a 500 on a column that existed everywhere except the server.", solution: "I wrote a schema-drift check that builds one database from migrations and another from entities, then diffs them. It caught 69 statements of accumulated drift, which went out as one corrective migration, and it now runs after every entity change." },
      { title: "Prescriptions a stranger can trust", problem: "A pharmacist in whatever pharmacy the patient walks into has to confirm a printed prescription is real, without an account and without seeing the patient’s records. Once a sheet is printed, its QR code can never be changed.", solution: "Each prescription gets a long random verify token, separate from its id, encoded in the QR code. A public page shows only what dispensing needs: valid, expired or lapsed, the medicines and doses, and the prescribing doctors and their credentials. Because the link’s origin is baked in at issue time, I made the web origin an explicit, documented setting rather than a default." },
      { title: "One login refresh, many requests", problem: "The mobile app fires several API calls at once. When the access token expired, each of them would start its own refresh at the same moment.", solution: "The API client queues every request that hits a 401 behind a single refresh, then replays them all with the new token, so the app refreshes exactly once." },
    ],
    decisions: [
      { title: "Payments as a separate service with its own database", why: "Clinical data and money have different failure modes and different auditors. Isolating payments means a bug in scheduling can’t touch balances, and the ledger can be reasoned about on its own." },
      { title: "An immutable double-entry ledger in whole minor units", why: "Every movement of money is a balanced journal entry stored as an exact integer, so a doctor’s payout can be traced line by line instead of trusting a running total." },
      { title: "Retry only deadlocks and serialization failures", why: "The retry helper only retries PostgreSQL’s 40001 and 40P01 errors, with bounded backoff, and never retries calls to a payment provider. Retrying a network call to a provider is how payments get sent twice." },
      { title: "Billing capped at one settlement per calendar month", why: "Charging is keyed to the month, so a scheduler running twice, or a test run repeated, verifies instead of charging again." },
    ],
    tradeoffs: [
      { choice: "One 2 GB VPS running Docker Compose instead of a managed cloud platform", gained: "A predictable monthly bill and a setup the whole team understands, which matters for an early-stage product in two markets.", cost: "No autoscaling and a manual deploy, so I documented the procedure step by step and added a health monitor." },
      { choice: "A separate payments service instead of a module in the main API", gained: "Strong isolation and a ledger that can be tested on its own.", cost: "Two services to deploy and a network hop between them, plus contracts that have to be kept in step." },
      { choice: "Five apps that only talk over HTTP, with no shared code", gained: "Each app can be built, deployed and replaced independently.", cost: "Types are duplicated across apps, so a server change can drift from what a client expects; I found four client types that disagreed with what the API actually sends and aligned them." },
    ],
  },
  "time-wise": {
    challenges: [
      { title: "Fingerprints at a shared kiosk", problem: "My first fingerprint check-in used WebAuthn in the browser. WebAuthn is built for one person proving who they are on their own device. On a kiosk shared by a whole office it could not reliably tell which staff member had touched the sensor, and passkey listing needed workarounds.", solution: "I replaced it with real attendance hardware. TimeWise speaks the ZKTeco ADMS push protocol: the device hands its serial number over, uploads punches line by line, and polls for commands, and each punch is read in the organization’s timezone. Device status shows up in Settings." },
      { title: "Face check-in that ignores passers-by", problem: "A camera that is always on will see everyone who walks past the kiosk, and recording the wrong person silently corrupts their attendance.", solution: "A match only counts when the face fills at least 15% of the frame, roughly arm’s length, and the same person is recognised in two scans in a row. Check-in then happens hands-free, but check-out needs a tap, because an accidental check-out is worse than a slow one. After someone is handled they are ignored for a minute." },
      { title: "Stopping a photo from checking someone in", problem: "Face recognition only proves the camera saw a face. A printed photo or a picture on a phone held up to the kiosk would be recognised as the staff member. CompreFace’s head-pose plugin looked like the answer, but in testing it read straight-on faces as turned 7 to 16 degrees and didn’t flip when the photo was mirrored: it passes the image centre to OpenCV with x and y swapped.", solution: "After a face is recognised, the kiosk asks the person to turn their head left and right in a random order. I measure the turn from the landmarks instead: the nose tip’s offset from the point between the eyes, divided by the eye distance. A real head changes that ratio, while a photo tilted towards the camera squeezes evenly and barely moves it; tested against CompreFace, photos tilted up to 55 degrees moved it by 0.036, well under the 0.09 a real turn needs. Each step is a signed token with a fixed deadline, and only a completed challenge earns the check-in proof." },
      { title: "Tenants that can’t be spoofed", problem: "Check-in requests came from an unauthenticated kiosk, and the organization was taken from the request, so a crafted request could record attendance for another company.", solution: "Kiosk sessions, enrolment links and biometric proofs became signed tokens. The tenant comes from the token, never the request body, and each kiosk only accepts the check-in methods the admin enabled. I also removed open registration routes, re-check user and organization status on every request, and use constant-time comparisons." },
      { title: "Lateness that depended on where the server was", problem: "Reports had off-by-one date ranges, a weekday shift and lateness errors, because dates were handled in the server’s timezone instead of the organization’s.", solution: "Every date range is now a calendar day string in the organization’s timezone, converted once at the edge. Analytics, reports and device punches all share the same helper." },
    ],
    decisions: [
      { title: "Self-hosted CompreFace, with AWS Rekognition as an option", why: "Face data stays on the organization’s own server by default, and teams already on AWS can switch providers without code changes." },
      { title: "Make the product free", why: "Paid plans, trials and feature gates added code paths that had to be tested and secured. Removing them simplified the system and let me focus on reliability." },
      { title: "Ship with Docker Compose and automatic HTTPS", why: "Organizations can run their own instance with one command, behind Caddy with certificates handled for them." },
    ],
    tradeoffs: [
      { choice: "Dedicated fingerprint devices instead of browser fingerprints", gained: "Reliable identification and a standard, well-documented protocol.", cost: "Organizations need hardware, so ID, QR code and face check-in remain fully supported without it." },
      { choice: "Check-in photos kept in MongoDB for 7 days when Cloudinary isn’t configured", gained: "Zero extra setup for self-hosters, with storage that cleans itself up.", cost: "Photos are short-lived evidence, not an archive." },
    ],
  },
  drivestack: {
    challenges: [
      { title: "Moving files between Google accounts", problem: "Google Drive has no “move to another account”. Ordinary files have to be downloaded and uploaded again, and Google Docs, Sheets and Slides can’t be downloaded in their native form at all.", solution: "Binary files stream straight from the source account into the destination with no temporary file, and a transform stream reports bytes moved over a WebSocket. For native Google files I grant the destination account read access, have Drive copy the file server-side, then revoke the permission in a finally block so it never lingers. Folders are rebuilt recursively, paging through children with a cursor so large trees never sit in memory." },
      { title: "Moves that survive a crash halfway", problem: "A move touches two accounts and can take minutes. If a worker died after the copy but before cleanup, a retry would copy the file again.", solution: "Every move is a persisted operation with phases, from preparing and copying through trashing the source and syncing the cache. The destination file id is saved as soon as it exists, so a retry skips straight to cleanup, and a source that is already gone counts as done." },
      { title: "Webhooks that arrive twice", problem: "Payment providers retry webhooks, and a duplicate “subscription active” event must not grant time twice.", solution: "The signature is verified over the raw body, and the webhook id is recorded in the same database transaction as its effects, so a repeat is recognised and ignored." },
    ],
    decisions: [
      { title: "Encrypt every OAuth token with AES-256-GCM", why: "Refresh tokens are the keys to people’s Drives. Stored encrypted with authentication, a database leak alone doesn’t expose them." },
      { title: "Trash the source instead of deleting it", why: "If anything goes wrong after a move, the original is still recoverable from the user’s trash." },
      { title: "Redis-backed rate limits and queues, with an in-memory fallback", why: "Limits hold across several instances in production, and the API still runs locally without Redis." },
    ],
    tradeoffs: [
      { choice: "One USD price with Dodo’s adaptive currency instead of my own NGN and USD pricing", gained: "Much less checkout and pricing code, and local currency handled by the payment provider.", cost: "Less control over the exact local price shown to Nigerian customers." },
      { choice: "Trashing rather than deleting moved files", gained: "Safety and an easy undo.", cost: "Trashed files still count against the source account’s quota until the trash is emptied." },
    ],
  },
  lemonwaresex: {
    challenges: [
      { title: "Money math without floating point", problem: "Floats can’t represent most decimal amounts exactly, and in currency conversion those tiny errors become visible pennies, especially after triangulating through a third currency.", solution: "Every calculation uses arbitrary-precision decimals at 15 internal digits, and only the final result is rounded, half-up, to the target currency’s own minor unit: zero places for yen, two for naira." },
      { title: "Two markets that quote differently", problem: "Official rates come from the European Central Bank, based in euros. Nigeria’s street rates are quoted against the US dollar, and the gap between the two is exactly what people need to see.", solution: "Official cross rates are derived through the euro, parallel-market cross rates through the dollar, and every derived rate is flagged as derived. Parallel quotes also show the premium over the official rate as a percentage." },
      { title: "Buy and sell rates that flip", problem: "With bid and ask prices, inverting a pair is not just one over the rate: the buy and sell sides swap.", solution: "Inverted lookups compute the new buy rate from the old sell rate and the new sell rate from the old buy rate, and a customer buying is priced at the dealer’s sell rate." },
    ],
    decisions: [
      { title: "Flag stale rates instead of hiding them", why: "The ECB doesn’t publish on weekends or holidays. Rates older than four days are returned with their age and marked stale, so API users decide what that means for them." },
      { title: "Providers behind a single contract", why: "Frankfurter (ECB), the parallel-market source and a fake provider for tests all implement one interface, so a new source is one class, and tests never call the internet." },
    ],
    tradeoffs: [
      { choice: "Store rates and convert from the database instead of calling a provider per request", gained: "Fast, metered API responses that don’t depend on an upstream being up.", cost: "Rates are only as fresh as the last sync, which is why every result carries its rate date and staleness." },
    ],
  },
  "course-correct": {
    challenges: [
      { title: "Paid videos that can’t just be shared", problem: "If a lesson is a public video URL, one paying student can share the course with a whole department.", solution: "Videos upload straight from the admin’s browser to Mux and are stored with a signed playback policy. The API hands enrolled students a playback URL signed with a token that expires after 24 hours, so a copied link stops working." },
      { title: "One account, one device", problem: "Even with signed videos, a shared login is a shared course.", solution: "Each login records an active device on the account and puts that device id in the token. The auth middleware rejects any token whose device isn’t the active one, so signing in on a new phone signs the old one out." },
      { title: "Access sold outside the checkout", problem: "Not every sale happens through the online checkout, and those students still need a way in.", solution: "Admins issue single-use passkeys, formatted to be read aloud and typed without confusing characters. Redeeming one marks it used and creates a 30-day enrolment in the same transaction." },
    ],
    decisions: [
      { title: "The server decides the price", why: "Checkout reads the price from admin settings and converts it to kobo itself, and payments are verified with Paystack before access is granted. The client never says how much it paid." },
      { title: "Accept overpayment, reject only underpayment", why: "A student who paid the full amount or more should never be locked out; only short payments are refused." },
      { title: "Delete Mux and Cloudinary media when a lesson is deleted", why: "Orphaned videos keep costing money every month, so cleanup is part of deleting the lesson." },
    ],
    tradeoffs: [
      { choice: "Strict single-device login", gained: "Paid accounts can’t be passed around.", cost: "Students who switch between a phone and a laptop have to sign in again each time." },
      { choice: "Mux for video instead of serving files myself", gained: "Adaptive streaming, signed playback and no video infrastructure to run.", cost: "A per-minute cost and a dependency on one provider." },
    ],
  },
  b4build: {
    challenges: [
      { title: "Long AI runs in a web page", problem: "A full plan runs nine phases and can take minutes. A normal request would time out, and the user would stare at a spinner.", solution: "The FastAPI backend streams progress with Server-Sent Events as each phase finishes, and the interface renders the plan as it arrives." },
      { title: "HTTPS everywhere on AWS", problem: "The frontend on Amplify is HTTPS, but the API sat behind a plain-HTTP load balancer, so browsers blocked every call as mixed content.", solution: "Terraform puts CloudFront in front of the load balancer, which gives the API an HTTPS URL without buying a domain, with an option to add a custom domain on the load balancer later." },
      { title: "A private database the app can still reach", problem: "RDS lives in private subnets with TLS required, so migrations couldn’t run from a laptop, and the container rejected the database certificate.", solution: "Migrations run as a one-off ECS task with its own task definition, and the Docker image ships Amazon’s global CA bundle so the TLS connection is verified rather than disabled." },
    ],
    decisions: [
      { title: "A rule-based coordinator instead of an LLM router", why: "Deciding which phase is missing next doesn’t need a model. Plain rules make routing free, fast and predictable, and models are only used where judgment is needed." },
      { title: "Every model call through one client", why: "A single LLM client enforces timeouts, retries and cost caps, and is traced in LangSmith, so no phase can quietly run up a bill." },
      { title: "No AWS keys in GitHub", why: "Deployments assume a role through GitHub OIDC, and Terraform state lives in S3 with a DynamoDB lock so two applies can’t corrupt it." },
    ],
    tradeoffs: [
      { choice: "Re-running only the phases a follow-up question affects", gained: "Fast, cheap answers to “what if I use Claude instead?”.", cost: "The impact analysis has to be right about which phases each change touches, or part of the plan goes stale." },
      { choice: "A full AWS stack (VPC, ECS Fargate, RDS, Redis)", gained: "Production-grade isolation and a realistic reference architecture.", cost: "A fixed monthly cost even when nobody is using it." },
    ],
  },
  "milky-way": {
    challenges: [
      { title: "Checkouts failing on a pooled database", problem: "Placing an order failed in production but never locally. The database pooler shares server connections between clients, so PHP’s server-side prepared statement names were sometimes already taken; the driver ignored the clash, but it aborted the transaction and the next query failed.", solution: "I switched to preparing statements in PHP, which works safely through the pooler, and checkouts went through again." },
      { title: "A 500 caused by an empty setting", problem: "The live site crashed with an argument error deep inside Laravel. The host defined SESSION_DRIVER but left it blank, and Laravel returns the blank value instead of its default, which then built an invalid driver name.", solution: "I reproduced it on the identical stack, then made every driver, store and connection setting fall back to its default when blank." },
      { title: "Paystack telling me twice", problem: "A payment is reported both by the shopper’s redirect and by Paystack’s webhook, usually close together, and a shopper may never come back at all.", solution: "The callback re-verifies the transaction with Paystack before touching the order, the webhook is checked with an HMAC-SHA512 signature, and recording a payment is idempotent, so either path can confirm it and neither doubles it." },
      { title: "Never selling stock you don’t have", problem: "Two shoppers can check out the last item at the same moment.", solution: "Placing an order locks the product rows and decrements stock inside the transaction, refusing the order if stock ran out in the meantime. Products without a stock count simply aren’t tracked." },
    ],
    decisions: [
      { title: "Preview prices on preview deployments", why: "Many products are priced on request, which made checkout impossible to test. Preview builds show a stable stand-in price marked “Preview price”, and nothing about it is saved." },
      { title: "Admins control content and colours", why: "The store owner can change homepage photos and copy, categories, delivery fees and the site’s colours without a developer." },
    ],
    tradeoffs: [
      { choice: "Laravel in a FrankenPHP container on Vercel", gained: "Push-to-deploy previews for every branch on a platform the owner already uses.", cost: "Serverless quirks like blank environment variables and pooled connections, which I had to track down and fix." },
    ],
  },
  "tender-cradle": {
    challenges: [
      { title: "Overselling under concurrent checkouts", problem: "Several parents can buy the last item in a size at the same time.", solution: "Stock has a reserved count. Checkout reserves stock with a single conditional update that only succeeds if enough unreserved stock remains, payment commits it, and a cancelled or expired order releases it." },
      { title: "Double-clicks that create two orders", problem: "A slow network or an impatient double-click can submit checkout twice.", solution: "Checkout accepts an idempotency key. A repeated request with the same key returns the first result instead of creating a second order." },
    ],
    decisions: [
      { title: "Confirm payments by webhook as well as redirect", why: "Paystack redirects the parent back and also sends a webhook. The order is confirmed by whichever arrives, so a closed tab doesn’t leave a paid order stuck as pending." },
      { title: "Amounts in kobo", why: "Prices are stored and sent as whole kobo, Paystack’s smallest unit, so no fractional naira can creep in." },
    ],
    tradeoffs: [
      { choice: "A separate Express API instead of server code inside the frontend", gained: "One backend serving the public site, parent accounts and the admin, deployable on its own.", cost: "Two apps to deploy and keep in step." },
    ],
  },
  ifaf: {
    challenges: [
      { title: "Ticket sales without a card processor", problem: "The festival sells tickets by bank transfer, which means a human has to match every receipt to real money and the same transfer could be used twice.", solution: "Each booking gets a private link where the guest uploads a receipt. An admin approves it only against the bank’s transaction reference, which the database refuses to accept twice." },
      { title: "Places that aren’t held forever", problem: "A guest can reserve and never pay, holding seats that others want.", solution: "Unpaid reservations expire on a schedule, and expiry is also enforced whenever a reservation is created, viewed or reviewed, so the count is right even if the scheduler is late. Bookings already under review don’t expire." },
    ],
    decisions: [
      { title: "QR codes generated in the browser", why: "Tickets and the check-in scanner never send ticket data to an outside QR service." },
      { title: "Receipts private to admins", why: "Bank receipts contain personal details, so they’re stored privately and served only to signed-in admins." },
    ],
    tradeoffs: [
      { choice: "Private booking links instead of customer accounts", gained: "No sign-up friction for a one-day event.", cost: "Losing the link means losing easy access, so the browser remembers each guest’s bookings on that device." },
    ],
  },
}
