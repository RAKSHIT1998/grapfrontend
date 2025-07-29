import React from 'https://esm.sh/react@18';
import ReactDOM from 'https://esm.sh/react-dom@18';

function App() {
  const [users, setUsers] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  React.useEffect(() => {
    fetch('/api/users')
      .then(res => res.json())
      .then(data => {
        setUsers(data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Failed to fetch users', err);
        setLoading(false);
      });
  }, []);

  if (loading) return React.createElement('p', null, 'Loading...');
  return React.createElement('ul', null, users.map(user =>
    React.createElement('li', { key: user.id }, `${user.name} (${user.email})`)
  ));
}

ReactDOM.createRoot(document.getElementById('root')).render(
  React.createElement(App)
);
