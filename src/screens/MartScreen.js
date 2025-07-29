import React from 'https://esm.sh/react@18';
import BackButton from '../components/BackButton.js';

export default function MartScreen({ onBack, onOrder }) {
  const [item, setItem] = React.useState('');
  const [quantity, setQuantity] = React.useState('1');
  const add = () => {
    if (!item) return;
    onOrder({ name: item, qty: quantity, price: 5 });
    setItem('');
    setQuantity('1');
  };
  return React.createElement('div', null,
    BackButton({ onBack }),
    React.createElement('h2', null, 'Mart Delivery'),
    React.createElement('div', null,
      React.createElement('input', {
        placeholder: 'Item',
        value: item,
        onChange: e => setItem(e.target.value)
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
