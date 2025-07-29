import React from 'https://esm.sh/react@18';
import BackButton from '../components/BackButton.js';

export default function BikeTaxiScreen({ onBack }) {
  const [pickup, setPickup] = React.useState('');
  const [dropoff, setDropoff] = React.useState('');
  const book = () => {
    alert(`Bike taxi booked from ${pickup} to ${dropoff}`);
    setPickup('');
    setDropoff('');
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
      React.createElement('button', { onClick: book }, 'Book Ride')
    )
  );
}
