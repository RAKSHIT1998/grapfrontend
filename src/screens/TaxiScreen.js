import React from 'https://esm.sh/react@18';
import BackButton from '../components/BackButton.js';

export default function TaxiScreen({ onBack, onOrder }) {
  const [pickup, setPickup] = React.useState('');
  const [dropoff, setDropoff] = React.useState('');
  const [showOptions, setShowOptions] = React.useState(false);
  const vehicles = [
    { id: 1, type: 'Sedan', price: 10 },
    { id: 2, type: 'SUV', price: 15 },
    { id: 3, type: 'Minivan', price: 20 }
  ];

  const search = () => {
    if (!pickup || !dropoff) return;
    setShowOptions(true);
  };

  const choose = v => {
    alert(`${v.type} driver notified!`);
    onOrder({ name: `${v.type} ride`, qty: 1, price: v.price });
    setPickup('');
    setDropoff('');
    setShowOptions(false);
  };

  return React.createElement('div', null,
    BackButton({ onBack }),
    React.createElement('h2', null, 'Taxi Service'),
    React.createElement('div', null,
      React.createElement('input', {
        placeholder: 'Pick-up location',
        value: pickup,
        onChange: e => setPickup(e.target.value)
      }),
      React.createElement('input', {
        placeholder: 'Drop-off location',
        value: dropoff,
        onChange: e => setDropoff(e.target.value)
      }),
      React.createElement('button', { onClick: search }, 'Find Ride')
    ),
    showOptions && React.createElement('div', { style: { marginTop: '1em' } },
      React.createElement('p', null, 'Distance 5km, ETA 15min (simulated)'),
      React.createElement('ul', null,
        vehicles.map(v =>
          React.createElement('li', { key: v.id },
            `${v.type} - $${v.price} `,
            React.createElement('button', { onClick: () => choose(v) }, 'Select')
          )
        )
      )
    )
  );
}
