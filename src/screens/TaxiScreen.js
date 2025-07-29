import React from 'https://esm.sh/react@18';
import BackButton from '../components/BackButton.js';

export default function TaxiScreen({ onBack }) {
  const [pickup, setPickup] = React.useState('');
  const [dropoff, setDropoff] = React.useState('');
  const book = () => {
    alert(`Taxi booked from ${pickup} to ${dropoff}`);
    setPickup('');
    setDropoff('');
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
      React.createElement('button', { onClick: book }, 'Book Taxi')
    )
  );
}
