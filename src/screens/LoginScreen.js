import React from 'https://esm.sh/react@18';
import BackButton from '../components/BackButton.js';

export default function LoginScreen({ onBack, onLogin }) {
  const [username, setUsername] = React.useState('');
  const [password, setPassword] = React.useState('');

  const handleLogin = async () => {
    try {
      const res = await fetch('/api/users/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
      });
      if (!res.ok) {
        throw new Error('Login failed');
      }
      const data = await res.json();
      onLogin({ username: data.username, profile: data.profile });
    } catch (e) {
      console.error(e);
      alert('Failed to login');
    }
  };

  return React.createElement('div', null,
    BackButton({ onBack }),
    React.createElement('h2', null, 'Login'),
    React.createElement('input', {
      placeholder: 'Username',
      value: username,
      onChange: e => setUsername(e.target.value)
    }),
    React.createElement('input', {
      placeholder: 'Password',
      type: 'password',
      value: password,
      onChange: e => setPassword(e.target.value)
    }),
    React.createElement('button', { onClick: handleLogin }, 'Login')
  );
}
