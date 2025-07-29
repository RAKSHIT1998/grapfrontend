import React from 'https://esm.sh/react@18';
import BackButton from '../components/BackButton.js';

export default function PaymentScreen({ onBack, items, onPay }) {
  const handlePay = () => {
    alert('Payment completed (simulated).');
    onPay();
  };
  return React.createElement('div', null,
    BackButton({ onBack }),
    React.createElement('h2', null, 'Payment'),
    items.length
      ? React.createElement('ul', null,
          items.map((it, idx) =>
            React.createElement('li', { key: idx }, `${it.name} x ${it.qty}`)
          )
        )
      : React.createElement('p', null, 'Cart is empty'),
    React.createElement('button', { onClick: handlePay, disabled: !items.length }, 'Pay Now')
  );
}
