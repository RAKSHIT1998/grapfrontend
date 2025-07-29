import React from 'https://esm.sh/react@18';
import BackButton from '../components/BackButton.js';

export default function PorterScreen({ onBack }) {
  const [pickup, setPickup] = React.useState('');
  const [dropoff, setDropoff] = React.useState('');
  const [description, setDescription] = React.useState('');
  const book = () => {
    alert(`Porter booked: ${description} from ${pickup} to ${dropoff}`);
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
