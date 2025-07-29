import React from 'https://esm.sh/react@18';
import BackButton from '../components/BackButton.js';

export default function PorterScreen({ onBack, onOrder }) {
  const [pickup, setPickup] = React.useState('');
  const [dropoff, setDropoff] = React.useState('');
  const [description, setDescription] = React.useState('');
  const book = () => {
    if (!pickup || !dropoff || !description) return;
    alert('Porter notified!');
    onOrder({ name: `Porter: ${description}`, qty: 1, price: 12 });
    setPickup('');
    setDropoff('');
    setDescription('');
  };
  return React.createElement('div', null,
    BackButton({ onBack }),
    React.createElement('h2', null, 'Porter Service'),
    React.createElement('div', null,
      React.createElement('input', {
        placeholder: 'Package description',
        value: description,
        onChange: e => setDescription(e.target.value)
      }),
      React.createElement('input', {
        placeholder: 'Pick-up address',
        value: pickup,
        onChange: e => setPickup(e.target.value)
      }),
      React.createElement('input', {
        placeholder: 'Drop-off address',
        value: dropoff,
        onChange: e => setDropoff(e.target.value)
      }),
      React.createElement('button', { onClick: book }, 'Book Porter')
    )
  );
}
