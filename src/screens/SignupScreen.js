import React from 'https://esm.sh/react@18';
import BackButton from '../components/BackButton.js';

export default function SignupScreen({ onBack, onSignup }) {
  const [username, setUsername] = React.useState('');
  const [password, setPassword] = React.useState('');

  const handleSignup = async () => {
    try {
      const res = await fetch('/api/users/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
      });
      if (!res.ok) {
        throw new Error('Signup failed');
      }
      const data = await res.json();
      onSignup({ username: data.username, profile: data.profile });
    } catch (e) {
      console.error(e);
      alert('Failed to sign up');
    }
  };

  return React.createElement('div', null,
    BackButton({ onBack }),
    React.createElement('h2', null, 'Sign Up'),
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
    React.createElement('button', { onClick: handleSignup }, 'Sign Up')
  );
}
