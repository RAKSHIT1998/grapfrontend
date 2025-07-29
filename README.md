# Grap Frontend

This is a simple single page application that mimics a Grab style user flow. It
provides placeholder screens for:

- Restaurant delivery with backend data
- Taxi service
- Mart delivery
- Porter service
- Medicine delivery
- Bike taxi service
- User signup and login
- Payment flow (simulated)
- Interactive driver location tracking map
- Customer settings for location and currency

The food delivery page fetches restaurant data from `/api/restaurants`. The
driver tracking view polls `/api/driver` for current location updates.

Open `index.html` in your browser to explore the different services. Each
section is a minimal mock screen that demonstrates basic navigation between the
home page and the individual services.

Authentication and payment remain simulated in-memory, but the driver tracking
screen now requests location updates from your backend. The frontend expects an
endpoint at `/api/driver` that returns JSON with `lat` and `lng` values.

No build step is required as the app still pulls React and other libraries from
CDNs.
