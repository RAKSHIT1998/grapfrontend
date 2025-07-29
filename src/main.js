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
import SignupScreen from "./screens/SignupScreen.js";
import LoginScreen from "./screens/LoginScreen.js";
import ProfileScreen from "./screens/ProfileScreen.js";
import BackButton from "./components/BackButton.js";

function Settings({ onBack, settings, onUpdate }) {
  const [location, setLocation] = React.useState(settings.location || '');
  const [currency, setCurrency] = React.useState(settings.currency || 'USD');
  const [theme, setTheme] = React.useState(settings.theme || 'future');
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
    React.createElement('div', null,
      React.createElement('label', null, 'Theme:'),
      React.createElement('select', {
        value: theme,
        onChange: e => setTheme(e.target.value)
      },
        React.createElement('option', { value: 'light' }, 'Light'),
        React.createElement('option', { value: 'dark' }, 'Dark'),
        React.createElement('option', { value: 'future' }, 'Future 2025')
      )
    ),
    React.createElement('button', {
      onClick: () => onUpdate({ location, currency, theme })
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
  const [settings, setSettings] = React.useState({ location: '', currency: 'USD', theme: 'future' });
  const [cart, setCart] = React.useState([]);

  React.useEffect(() => {
    document.body.dataset.theme = settings.theme || 'future';
  }, [settings.theme]);

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
      return SignupScreen({ onBack, onSignup: handleAuth });
    case 'login':
      return LoginScreen({ onBack, onLogin: handleAuth });
    case 'profile':
      return ProfileScreen({ onBack, user, onUpdate: u => { setUser(u); setPage('home'); } });
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
