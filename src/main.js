import React from 'https://esm.sh/react@18';
import ReactDOM from 'https://esm.sh/react-dom@18';

import HomeScreen from "./screens/HomeScreen.js";
import PaymentScreen from "./screens/PaymentScreen.js";
import TrackingScreen from "./screens/TrackingScreen.js";
import FoodDeliveryScreen from "./screens/FoodDeliveryScreen.js";
import TaxiScreen from "./screens/TaxiScreen.js";
import MartScreen from "./screens/MartScreen.js";
import PorterScreen from "./screens/PorterScreen.js";
import MedicineScreen from "./screens/MedicineScreen.js";
import BikeTaxiScreen from "./screens/BikeTaxiScreen.js";
import OrdersScreen from "./screens/OrdersScreen.js";
import BackButton from "./components/BackButton.js";

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








function App() {
  const [page, setPage] = React.useState('home');
  const [user, setUser] = React.useState(null);
  const [settings, setSettings] = React.useState({ location: '', currency: 'USD' });
  const [cart, setCart] = React.useState([]);

  const addToCart = item => setCart(c => [...c, item]);
  const removeFromCart = idx => setCart(c => c.filter((_, i) => i !== idx));
  const clearCart = () => setCart([]);
  const checkoutItem = item => { setCart([item]); setPage('payment'); };

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
      return PaymentScreen({ onBack, items: cart, onPay: () => {
        clearCart();
        setPage('orders');
      } });
    case 'cart':
      return Cart({ onBack, items: cart, onCheckout: () => setPage('payment'), onRemove: removeFromCart });
    case 'tracking':
      return TrackingScreen({ onBack });
    case 'orders':
      return OrdersScreen({ onBack });
    case 'food':
      return FoodDeliveryScreen({ onBack, onOrder: checkoutItem });
    case 'taxi':
      return TaxiScreen({ onBack, onOrder: checkoutItem });
    case 'mart':
      return MartScreen({ onBack, onOrder: checkoutItem });
    case 'porter':
      return PorterScreen({ onBack, onOrder: checkoutItem });
    case 'medicine':
      return MedicineScreen({ onBack, onOrder: checkoutItem });
    case 'bike':
      return BikeTaxiScreen({ onBack, onOrder: checkoutItem });
    default:
      return HomeScreen({ onNavigate: setPage, user, onLogout: handleLogout });
  }
}

ReactDOM.createRoot(document.getElementById('root')).render(
  React.createElement(App)
);
