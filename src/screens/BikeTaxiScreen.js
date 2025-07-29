import React from 'https://esm.sh/react@18';
import BackButton from '../components/BackButton.js';

export default function BikeTaxiScreen({ onBack, onOrder }) {
  const [pickup, setPickup] = React.useState('');
  const [dropoff, setDropoff] = React.useState('');
  const [showOptions, setShowOptions] = React.useState(false);
  const bikes = [
    { id: 1, type: 'Standard', price: 5 },
    { id: 2, type: 'Premium', price: 8 }
  ];

  const search = () => {
    if (!pickup || !dropoff) return;
    setShowOptions(true);
  };

  const choose = b => {
    alert(`${b.type} rider notified!`);
    onOrder({ name: `${b.type} bike ride`, qty: 1, price: b.price });
    setPickup('');
    setDropoff('');
    setShowOptions(false);
  };

  return React.createElement('div', null,
    BackButton({ onBack }),
    React.createElement('h2', null, 'Bike Taxi Service'),
    React.createElement('div', null,
      React.createElement('input', {
        placeholder: 'Pick-up point',
        value: pickup,
        onChange: e => setPickup(e.target.value)
      }),
      React.createElement('input', {
        placeholder: 'Drop-off point',
        value: dropoff,
        onChange: e => setDropoff(e.target.value)
      }),
      React.createElement('button', { onClick: search }, 'Find Ride')
    ),
    showOptions && React.createElement('div', { style: { marginTop: '1em' } },
      React.createElement('p', null, 'Distance 5km, ETA 15min (simulated)'),
      React.createElement('ul', null,
        bikes.map(b =>
          React.createElement('li', { key: b.id },
            `${b.type} - $${b.price} `,
            React.createElement('button', { onClick: () => choose(b) }, 'Select')
          )
        )
      )
    )
  );
}
