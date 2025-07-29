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
- Simple cart with checkout
- Order history screen
- Interactive driver location tracking map
- Customer settings for location and currency

Items selected from the service screens can be added to a small in-memory cart.
The cart page allows reviewing items and leads to the simulated payment flow.

The food delivery page fetches restaurant data from `/api/restaurants`. The
driver tracking view polls `/api/driver` for current location updates.

Each service page now includes a minimal form so you can simulate placing
orders or booking rides directly in the browser. These actions simply trigger
alerts but demonstrate the expected user flow for a combined super-app.

Open `index.html` in your browser to explore the different services. Each
section is a minimal mock screen that demonstrates basic navigation between the
home page and the individual services.

Authentication remains simulated, but orders are now persisted on the backend.
After checking out, the cart items are sent to `/api/orders` which stores the
order in memory. The driver tracking screen requests location updates from your
backend at `/api/driver`.

No build step is required as the app still pulls React and other libraries from
CDNs.

## Running on Expo

A React Native version of the app lives in the `expo` folder. Install its dependencies and start the Expo dev server:

```bash
cd expo
npm install
npx expo start
```

The API endpoints from the Node server should remain accessible for restaurant data, order storage and driver tracking.
