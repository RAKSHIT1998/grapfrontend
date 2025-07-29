import React from 'https://esm.sh/react@18';
import BackButton from '../components/BackButton.js';

export default function MedicineScreen({ onBack, onOrder }) {
  const [medicine, setMedicine] = React.useState('');
  const [quantity, setQuantity] = React.useState('1');
  const add = () => {
    if (!medicine) return;
    onOrder({ name: medicine, qty: quantity, price: 8 });
    setMedicine('');
    setQuantity('1');
  };
  return React.createElement('div', null,
    BackButton({ onBack }),
    React.createElement('h2', null, 'Medicine Delivery'),
    React.createElement('div', null,
      React.createElement('input', {
        placeholder: 'Medicine name',
        value: medicine,
        onChange: e => setMedicine(e.target.value)
      }),
      React.createElement('input', {
        type: 'number',
        min: 1,
        value: quantity,
        onChange: e => setQuantity(e.target.value)
      }),
      React.createElement('button', { onClick: add }, 'Checkout')
    )
  );
}
