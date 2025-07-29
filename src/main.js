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
        React.createElement('li', null,
          React.createElement('button', { onClick: () => onNavigate('cart') }, 'Cart')
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

function Payment({ onBack, items, onPay }) {
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

function Cart({ onBack, items, onCheckout, onRemove }) {
  return React.createElement('div', null,
    BackButton({ onBack }),
    React.createElement('h2', null, 'Cart'),
    items.length
      ? React.createElement('ul', null,
          items.map((it, idx) => React.createElement('li', { key: idx },
            `${it.name} x ${it.qty} `,
            React.createElement('button', { onClick: () => onRemove(idx) }, 'Remove')
          ))
        )
      : React.createElement('p', null, 'Cart is empty'),
    React.createElement('button', { onClick: onCheckout, disabled: !items.length }, 'Checkout')
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

function FoodDelivery({ onBack, onAdd }) {
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
            React.createElement('li', { key: r.id },
              r.name,
              ' ',
              React.createElement('button', { onClick: () => onAdd({ name: r.name, qty: 1 }) }, 'Add')
            )
          )
        )
      : React.createElement('p', null, 'Loading...')
  );
}

function TaxiService({ onBack }) {
  const [pickup, setPickup] = React.useState('');
  const [dropoff, setDropoff] = React.useState('');
  const book = () => {
    alert(`Taxi booked from ${pickup} to ${dropoff}`);
    setPickup('');
    setDropoff('');
  };
  return React.createElement('div', null,
    BackButton({ onBack }),
    React.createElement('h2', null, 'Taxi Service'),
    React.createElement('div', null,
      React.createElement('input', {
        placeholder: 'Pick-up location',
        value: pickup,
        onChange: e => setPickup(e.target.value)
      }),
      React.createElement('input', {
        placeholder: 'Drop-off location',
        value: dropoff,
        onChange: e => setDropoff(e.target.value)
      }),
      React.createElement('button', { onClick: book }, 'Book Taxi')
    )
  );
}

function MartDelivery({ onBack, onAdd }) {
  const [item, setItem] = React.useState('');
  const [quantity, setQuantity] = React.useState('1');
  const add = () => {
    if (!item) return;
    onAdd({ name: item, qty: quantity });
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
      React.createElement('button', { onClick: add }, 'Add to Cart')
    )
  );
}

function PorterService({ onBack }) {
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

function MedicineDelivery({ onBack, onAdd }) {
  const [medicine, setMedicine] = React.useState('');
  const [quantity, setQuantity] = React.useState('1');
  const add = () => {
    if (!medicine) return;
    onAdd({ name: medicine, qty: quantity });
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
      React.createElement('button', { onClick: add }, 'Add to Cart')
    )
  );
}

function BikeTaxiService({ onBack }) {
  const [pickup, setPickup] = React.useState('');
  const [dropoff, setDropoff] = React.useState('');
  const book = () => {
    alert(`Bike taxi booked from ${pickup} to ${dropoff}`);
    setPickup('');
    setDropoff('');
  };
  return React.createElement('div', null,
    BackButton({ onBack }),
    React.createElement('h2', null, 'Bike Taxi Service'),
    React.createElement('div', null,
      React.createElement('input', {
        placeholder: 'Pick-up point',
        value: pickup,
        onChange: e => setPickup(e.target.value)
      }),
      React.createElement('input', {
        placeholder: 'Drop-off point',
        value: dropoff,
        onChange: e => setDropoff(e.target.value)
      }),
      React.createElement('button', { onClick: book }, 'Book Ride')
    )
  );
}

function App() {
  const [page, setPage] = React.useState('home');
  const [user, setUser] = React.useState(null);
  const [settings, setSettings] = React.useState({ location: '', currency: 'USD' });
  const [cart, setCart] = React.useState([]);

  const addToCart = item => setCart(c => [...c, item]);
  const removeFromCart = idx => setCart(c => c.filter((_, i) => i !== idx));
  const clearCart = () => setCart([]);

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
      return Payment({ onBack, items: cart, onPay: () => { clearCart(); setPage('home'); } });
    case 'cart':
      return Cart({ onBack, items: cart, onCheckout: () => setPage('payment'), onRemove: removeFromCart });
    case 'tracking':
      return OrderTracking({ onBack });
    case 'food':
      return FoodDelivery({ onBack, onAdd: addToCart });
    case 'taxi':
      return TaxiService({ onBack });
    case 'mart':
      return MartDelivery({ onBack, onAdd: addToCart });
    case 'porter':
      return PorterService({ onBack });
    case 'medicine':
      return MedicineDelivery({ onBack, onAdd: addToCart });
    case 'bike':
      return BikeTaxiService({ onBack });
    default:
      return Home({ onNavigate: setPage, user, onLogout: handleLogout });
  }
}

ReactDOM.createRoot(document.getElementById('root')).render(
  React.createElement(App)
);
