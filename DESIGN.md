# Super App Frontend Design

This demo frontend bundles several on-demand services into a single page
application. Each service has its own simple React component that captures basic
information and calls `alert()` to simulate placing an order. The intention is
to mimic the flow of popular services like ride hailing, food and grocery
delivery within one lightweight app.

## Components
- **Home** – central menu that links to the other views
- **Signup/Login** – minimal user authentication forms
- **Settings** – stores user location and currency preferences in memory
- **Payment** – simulated payment flow
- **Order Tracking** – displays driver location updates using Leaflet
- **Food Delivery** – fetches a list of restaurants from `/api/restaurants`
- **Taxi Service** – book a car by specifying pickup and dropoff
- **Bike Taxi Service** – quick motorcycle rides with the same flow
- **Mart Delivery** – order an item and quantity
- **Porter Service** – arrange package transport with pickup/dropoff addresses
- **Medicine Delivery** – order medicine by name and quantity

The app does not persist data or connect to real services. Instead it provides a
clear structure for how multiple on-demand offerings could be organised in a
single web app.
