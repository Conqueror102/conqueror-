To stop a photo from checking someone in, TimeWise asks the person to turn their head left and right in a random order after their face is recognised, and measures the turn itself from facial landmarks: the nose tip's offset from the point between the eyes, divided by the distance between the eyes. A real head turn moves that ratio by at least 0.09, while a printed or on-screen photo tilted towards the camera barely moves it. In my tests against CompreFace, photos tilted up to 55 degrees moved it by only 0.036.

This post explains how I got there, including the library bug that sent me down this path.

## Face recognition only proves the camera saw a face

TimeWise is a free, multi-tenant attendance platform. Staff check in at a kiosk by staff ID, QR code, a ZKTeco fingerprint device, or hands-free face recognition through CompreFace or AWS Rekognition.

Face recognition answers one question: whose face is this? It doesn't answer whether that face belongs to a living person standing in front of the kiosk. Hold up a printed photo of a colleague, or a picture on your phone, and a recognition engine will happily match it. For attendance, that is the whole game. If a photo can check someone in, the feature is worse than useless, because the records look trustworthy and aren't.

## First, ignore the people walking past

Before liveness, there was an easier problem. A camera that is always on sees everyone who walks past the kiosk, and recording the wrong person silently corrupts their attendance.

So a match only counts when the face fills at least 15% of the frame, roughly arm's length, and the same person is recognised in two scans in a row. Check-in then happens hands-free. Check-out needs a tap, because an accidental check-out is worse than a slow one. After someone has been handled, they're ignored for a minute.

None of that stops a photo, though. Someone could hold one up at arm's length for two scans.

## The plugin that looked like the answer

CompreFace has a head-pose plugin that estimates which way a face is turned. The plan was obvious: ask the person to turn their head, check the pose changes, done.

When I tested it, the numbers didn't make sense. It read faces looking straight at the camera as turned 7 to 16 degrees, and when I mirrored the photo, the reading didn't flip, which it must if it's measuring a real angle. I dug in and found the cause: the plugin passes the image centre to OpenCV with x and y swapped. The head angles it reported weren't trustworthy enough to build a security check on.

That's the habit that saves me most often: question the obvious answer and test it before committing. A head-pose check built on that plugin would have passed review and been wrong.

## Measuring the turn myself

Instead of trusting an angle, I measure something simpler from the landmarks the engine already returns:

- Take the point halfway between the eyes.
- Take the horizontal offset of the nose tip from that point.
- Divide by the distance between the eyes.

When you face the camera, the nose sits roughly between the eyes and the ratio is near zero. Turn your head left or right and the nose moves sideways relative to the eyes, so the ratio swings positive or negative.

```ts
// Simplified: head-turn ratio from face landmarks
type Point = { x: number; y: number }

function turnRatio(leftEye: Point, rightEye: Point, noseTip: Point) {
  const midX = (leftEye.x + rightEye.x) / 2
  const eyeDistance = Math.hypot(rightEye.x - leftEye.x, rightEye.y - leftEye.y)
  return (noseTip.x - midX) / eyeDistance
}
```

Dividing by the eye distance is what makes it work at any distance from the camera. It also happens to be what defeats photos.

## Why a tilted photo can't fake it

The obvious attack is to hold a photo and tilt it, hoping the face looks turned. But a flat photo tilted towards the camera squeezes evenly. The eyes get closer together and the nose moves closer to their midpoint by the same proportion, so the ratio barely changes.

I tested this against CompreFace. Photos tilted up to 55 degrees moved the ratio by 0.036. A real head turn needs 0.09. There's a wide gap between the two, so the threshold doesn't have to be tuned on a knife edge.

## A challenge, not a gesture

Measuring the turn is half of it. The other half is making sure the turn happens live, in the right order, now.

After a face is recognised, the kiosk asks the person to turn left and right in a random order, so nobody can know the sequence in advance. Each step is a signed token with a fixed deadline. Only a completed challenge earns the check-in proof, and the check-in is accepted only with that proof.

That fits the rest of TimeWise's security model. Kiosk sessions, enrolment links and biometric proofs are all signed tokens. The tenant comes from the token, never from the request body, so a crafted request can't record attendance for another company, and each kiosk only accepts the check-in methods its admin enabled.

## Where face data lives

Face recognition runs on self-hosted CompreFace by default, so face data stays on the organization's own server. Teams already on AWS can switch to Rekognition without code changes. When Cloudinary isn't configured, check-in photos are kept in MongoDB for seven days and then expire automatically. They are short-lived evidence, not an archive.

## Why fingerprints went to hardware

Face check-in isn't the only biometric option. My first fingerprint check-in used WebAuthn in the browser, but WebAuthn is built for one person proving who they are on their own device. On a kiosk shared by a whole office it couldn't reliably tell which staff member had touched the sensor. I replaced it with real attendance hardware: TimeWise speaks the ZKTeco ADMS push protocol, and each punch is read in the organization's timezone.

Different problem, same lesson. Use the tool built for the job you actually have.

## What I took away

- Recognition and liveness are separate problems. Solve both.
- Test the library before you build on it, especially for security.
- Prefer a measurement you understand over an angle you have to trust.
- Make the challenge random and time-limited, and sign every step.

The code, setup guide and user guide are [on GitHub](https://github.com/Conqueror102/time-wise-v2), and the [TimeWise case study](/projects/time-wise) covers the multi-tenant design and deployment.

## FAQ

**How does TimeWise stop someone checking in with a photo?**
After recognising a face, the kiosk asks the person to turn their head left and right in a random order and measures each turn from facial landmarks. A flat photo can't produce the change a real head turn does, and each step must be completed before a signed deadline.

**Which face recognition engines does TimeWise support?**
Self-hosted CompreFace by default, so face data stays on the organization's server, or AWS Rekognition for teams already on AWS.

**Can you build a face or biometric check-in for my organization?**
Yes. TimeWise is free to use and can be self-hosted with Docker Compose, and I can adapt it or build something new. [Get in touch](/#contact).
