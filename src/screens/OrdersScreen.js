import React from 'https://esm.sh/react@18';
import BackButton from '../components/BackButton.js';

export default function OrdersScreen({ onBack, orders }) {
  return React.createElement('div', null,
    BackButton({ onBack }),
    React.createElement('h2', null, 'Your Orders'),
    orders.length
      ? React.createElement('ul', null,
          orders.map(order =>
            React.createElement('li', { key: order.id },
              `Order #${order.id} - ${order.status}`
            )
          )
        )
      : React.createElement('p', null, 'No orders yet')
  );
}
