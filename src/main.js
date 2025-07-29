import React from 'https://esm.sh/react@18';
import ReactDOM from 'https://esm.sh/react-dom@18';

function Home({ onNavigate, user, onLogout }) {
  return (
    React.createElement('div', null,
      React.createElement('h1', null, 'Grab Style App'),
      user ? React.createElement('p', null, `Welcome, ${user.username}`) : null,
      React.createElement('ul', null,
        React.createElement('li', null,
          React.createElement('button', { onClick: () => onNavigate('food') }, 'Restaurant Delivery')
        ),
        React.createElement('li', null,
          React.createElement('button', { onClick: () => onNavigate('taxi') }, 'Taxi Service')
        ),
        React.createElement('li', null,
          React.createElement('button', { onClick: () => onNavigate('mart') }, 'Mart Delivery')
        ),
        React.createElement('li', null,
          React.createElement('button', { onClick: () => onNavigate('porter') }, 'Porter Service')
        ),
        React.createElement('li', null,
          React.createElement('button', { onClick: () => onNavigate('medicine') }, 'Medicine Delivery')
        ),
        React.createElement('li', null,
          React.createElement('button', { onClick: () => onNavigate('bike') }, 'Bike Taxi')
        ),
        user ? React.createElement('li', null,
          React.createElement('button', { onClick: () => onNavigate('payment') }, 'Payment')
        ) : null,
        user ? React.createElement('li', null,
          React.createElement('button', { onClick: () => onNavigate('tracking') }, 'Track Driver')
        ) : null,
        React.createElement('li', null,
          React.createElement('button', { onClick: () => onNavigate('settings') }, 'Settings')
        ),
        user ? React.createElement('li', null,
          React.createElement('button', { onClick: onLogout }, 'Logout')
        ) : React.createElement(React.Fragment, null,
          React.createElement('li', null,
            React.createElement('button', { onClick: () => onNavigate('login') }, 'Login')
          ),
          React.createElement('li', null,
            React.createElement('button', { onClick: () => onNavigate('signup') }, 'Sign Up')
          )
        )
      )
    )
  );
}

function BackButton({ onBack }) {
  return React.createElement('button', { onClick: onBack }, 'Back');
}

function Signup({ onBack, onSignup }) {
  const [username, setUsername] = React.useState('');
  const [password, setPassword] = React.useState('');
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
    React.createElement('button', { onClick: () => onSignup({ username }) }, 'Sign Up')
  );
}

function Login({ onBack, onLogin }) {
  const [username, setUsername] = React.useState('');
  const [password, setPassword] = React.useState('');
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
    React.createElement('button', { onClick: () => onLogin({ username }) }, 'Login')
  );
}

function Settings({ onBack, settings, onUpdate }) {
  const [location, setLocation] = React.useState(settings.location || '');
  const [currency, setCurrency] = React.useState(settings.currency || 'USD');
  return React.createElement('div', null,
    BackButton({ onBack }),
    React.createElement('h2', null, 'Customer Settings'),
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
    React.createElement('button', {
      onClick: () => onUpdate({ location, currency })
    }, 'Save')
  );
}

function Payment({ onBack }) {
  const handlePay = () => alert('Payment completed (simulated).');
  return React.createElement('div', null,
    BackButton({ onBack }),
    React.createElement('h2', null, 'Payment'),
    React.createElement('button', { onClick: handlePay }, 'Pay Now')
  );
}

function OrderTracking({ onBack }) {
  const mapRef = React.useRef(null);
  const markerRef = React.useRef(null);

  React.useEffect(() => {
    if (!mapRef.current && window.L) {
      const start = [1.29, 103.85];
      const map = L.map('map').setView(start, 15);
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; OpenStreetMap contributors'
      }).addTo(map);
      markerRef.current = L.marker(start).addTo(map);
      mapRef.current = map;
    }

    const id = setInterval(async () => {
      try {
        const res = await fetch('/api/driver');
        if (res.ok) {
          const { lat, lng } = await res.json();
          if (markerRef.current) {
            markerRef.current.setLatLng([lat, lng]);
            mapRef.current.setView([lat, lng]);
          }
        }
      } catch (e) {
        console.error('Failed to fetch driver location', e);
      }
    }, 2000);

    return () => clearInterval(id);
  }, []);

  return React.createElement('div', null,
    BackButton({ onBack }),
    React.createElement('h2', null, 'Driver Tracking'),
    React.createElement('div', {
      id: 'map',
      style: { width: '100%', height: '300px' }
    })
  );
}

function FoodDelivery({ onBack }) {
  const [restaurants, setRestaurants] = React.useState([]);

  React.useEffect(() => {
    const load = async () => {
      try {
        const res = await fetch('/api/restaurants');
        if (res.ok) {
          const data = await res.json();
          setRestaurants(data);
        }
      } catch (e) {
        console.error('Failed to load restaurants', e);
      }
    };
    load();
  }, []);

  return React.createElement('div', null,
    BackButton({ onBack }),
    React.createElement('h2', null, 'Restaurant Delivery'),
    restaurants.length
      ? React.createElement('ul', null,
          restaurants.map(r =>
            React.createElement('li', { key: r.id }, r.name)
          )
        )
      : React.createElement('p', null, 'Loading...')
  );
}

function TaxiService({ onBack }) {
  return React.createElement('div', null,
    BackButton({ onBack }),
    React.createElement('h2', null, 'Taxi Service'),
    React.createElement('p', null, 'Book a taxi to your destination.')
  );
}

function MartDelivery({ onBack }) {
  return React.createElement('div', null,
    BackButton({ onBack }),
    React.createElement('h2', null, 'Mart Delivery'),
    React.createElement('p', null, 'Get groceries and daily needs delivered.')
  );
}

function PorterService({ onBack }) {
  return React.createElement('div', null,
    BackButton({ onBack }),
    React.createElement('h2', null, 'Porter Service'),
    React.createElement('p', null, 'Send packages and documents across town.')
  );
}

function MedicineDelivery({ onBack }) {
  return React.createElement('div', null,
    BackButton({ onBack }),
    React.createElement('h2', null, 'Medicine Delivery'),
    React.createElement('p', null, 'Order medicines and health products.')
  );
}

function BikeTaxiService({ onBack }) {
  return React.createElement('div', null,
    BackButton({ onBack }),
    React.createElement('h2', null, 'Bike Taxi Service'),
    React.createElement('p', null, 'Quick two-wheeler rides around the city.')
  );
}

function App() {
  const [page, setPage] = React.useState('home');
  const [user, setUser] = React.useState(null);
  const [settings, setSettings] = React.useState({ location: '', currency: 'USD' });

  const onBack = () => setPage('home');
  const handleAuth = u => { setUser(u); setPage('home'); };
  const handleSettings = s => { setSettings(s); setPage('home'); };
  const handleLogout = () => setUser(null);

  switch(page) {
    case 'signup':
      return Signup({ onBack, onSignup: handleAuth });
    case 'login':
      return Login({ onBack, onLogin: handleAuth });
    case 'settings':
      return Settings({ onBack, settings, onUpdate: handleSettings });
    case 'payment':
      return Payment({ onBack });
    case 'tracking':
      return OrderTracking({ onBack });
    case 'food':
      return FoodDelivery({ onBack });
    case 'taxi':
      return TaxiService({ onBack });
    case 'mart':
      return MartDelivery({ onBack });
    case 'porter':
      return PorterService({ onBack });
    case 'medicine':
      return MedicineDelivery({ onBack });
    case 'bike':
      return BikeTaxiService({ onBack });
    default:
      return Home({ onNavigate: setPage, user, onLogout: handleLogout });
  }
}

ReactDOM.createRoot(document.getElementById('root')).render(
  React.createElement(App)
);
