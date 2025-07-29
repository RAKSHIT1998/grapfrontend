import React from 'https://esm.sh/react@18';
import BackButton from '../components/BackButton.js';

export default function OrdersScreen({ onBack }) {
  const [orders, setOrders] = React.useState([]);

  React.useEffect(() => {
    const load = async () => {
      try {
        const res = await fetch('/api/orders');
        if (res.ok) {
          const data = await res.json();
          setOrders(data);
        }
      } catch (e) {
        console.error('Failed to load orders', e);
      }
    };
    load();
  }, []);

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
