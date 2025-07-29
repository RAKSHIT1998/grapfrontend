# Grap Frontend

This is a simple single page application that mimics a Grab style user flow. It
provides placeholder screens for:

- Restaurant delivery with backend data
- Taxi service with simple booking form
- Mart delivery with item order form
- Porter service with package booking form
- Medicine delivery with quick medicine order
- Bike taxi service with ride booking form
- User signup and login
- Payment flow (simulated)
- Interactive driver location tracking map
- Customer settings for location and currency

The food delivery page fetches restaurant data from `/api/restaurants`. The
driver tracking view polls `/api/driver` for current location updates.

Each service page now includes a minimal form so you can simulate placing
orders or booking rides directly in the browser. These actions simply trigger
alerts but demonstrate the expected user flow for a combined super-app.

Open `index.html` in your browser to explore the different services. Each
section is a minimal mock screen that demonstrates basic navigation between the
home page and the individual services.

Authentication and payment remain simulated in-memory, but the driver tracking
screen now requests location updates from your backend. The frontend expects an
endpoint at `/api/driver` that returns JSON with `lat` and `lng` values.

No build step is required as the app still pulls React and other libraries from
CDNs.
