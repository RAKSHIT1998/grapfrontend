import React from 'https://esm.sh/react@18';
import BackButton from '../components/BackButton.js';

export default function FoodDeliveryScreen({ onBack, onAdd }) {
  const [restaurants, setRestaurants] = React.useState([]);

  React.useEffect(() => {
    const load = async () => {
      try {
        const res = await fetch('/api/restaurants');
        if (res.ok) {
          const data = await res.json();
          setRestaurants(data);
        }
      } catch (e) {
        console.error('Failed to load restaurants', e);
      }
    };
    load();
  }, []);

  return React.createElement('div', null,
    BackButton({ onBack }),
    React.createElement('h2', null, 'Restaurant Delivery'),
    restaurants.length
      ? React.createElement('ul', null,
          restaurants.map(r =>
            React.createElement('li', { key: r.id },
              r.name,
              ' ',
              React.createElement('button', { onClick: () => onAdd({ name: r.name, qty: 1 }) }, 'Add')
            )
          )
        )
      : React.createElement('p', null, 'Loading...')
  );
}
