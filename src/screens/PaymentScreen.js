import React from 'https://esm.sh/react@18';
import BackButton from '../components/BackButton.js';

export default function PaymentScreen({ onBack, items, onPay }) {
  const handlePay = async () => {
    try {
      const res = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ items })
      });
      if (!res.ok) {
        throw new Error('Failed to place order');
      }
      alert('Payment completed. Order placed!');
      onPay();
    } catch (e) {
      console.error(e);
      alert('Payment failed.');
    }
  };
  return React.createElement('div', null,
    BackButton({ onBack }),
    React.createElement('h2', null, 'Payment'),
    items.length
      ? React.createElement('ul', null,
          items.map((it, idx) =>
            React.createElement(
              'li',
              { key: idx },
              `${it.name} x ${it.qty}`,
              it.price ? ` - $${it.price}` : ''
            )
          )
        )
      : React.createElement('p', null, 'Cart is empty'),
    React.createElement('button', { onClick: handlePay, disabled: !items.length }, 'Pay Now')
  );
}
