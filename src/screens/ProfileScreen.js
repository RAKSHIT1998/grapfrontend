import React from 'https://esm.sh/react@18';
import BackButton from '../components/BackButton.js';

export default function ProfileScreen({ onBack, user, onUpdate }) {
  const [location, setLocation] = React.useState(user.profile?.location || '');
  const [currency, setCurrency] = React.useState(user.profile?.currency || 'USD');

  const save = async () => {
    try {
      const res = await fetch(`/api/users/${user.username}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ profile: { location, currency } })
      });
      if (!res.ok) throw new Error('Save failed');
      const data = await res.json();
      onUpdate({ username: data.username, profile: data.profile });
    } catch (e) {
      console.error(e);
      alert('Failed to update profile');
    }
  };

  return React.createElement('div', null,
    BackButton({ onBack }),
    React.createElement('h2', null, 'Customer Profile'),
    React.createElement('div', null,
      React.createElement('label', null, 'Username: ' + user.username)
    ),
    React.createElement('div', null,
      React.createElement('label', null, 'Location:'),
      React.createElement('input', {
        value: location,
        onChange: e => setLocation(e.target.value)
      })
    ),
    React.createElement('div', null,
      React.createElement('label', null, 'Currency:'),
      React.createElement('select', {
        value: currency,
        onChange: e => setCurrency(e.target.value)
      },
        React.createElement('option', { value: 'USD' }, 'USD'),
        React.createElement('option', { value: 'EUR' }, 'EUR'),
        React.createElement('option', { value: 'SGD' }, 'SGD')
      )
    ),
    React.createElement('button', { onClick: save }, 'Save')
  );
}
