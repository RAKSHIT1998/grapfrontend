# grap Frontend

This is a simple single page application that mimics a grap style user flow. It
provides placeholder screens for:

- Restaurant delivery with backend data
- Taxi service with simple booking form
- Mart delivery with item order form
- Porter service with package booking form
- Medicine delivery with quick medicine order
- Bike taxi service with ride booking form
- User signup and login
- Customer profile management
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
orders or booking rides directly in the browser. After selecting a service the
app immediately redirects to the payment screen with the chosen item so the
flow mirrors a real checkout. Drivers are "notified" via on-screen alerts when
a ride or delivery is booked.

Open `index.html` in your browser to explore the different services. Each
section is a minimal mock screen that demonstrates basic navigation between the
home page and the individual services.

Authentication and order management are handled via the included Node backend.
Sign up and login send requests to `/api/users/signup` and `/api/users/login`.
After checking out, the cart items are posted to `/api/orders` which stores the
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

The Expo app relies on the same API server for authentication, restaurant data,
order storage and driver tracking so keep the Node backend running.
