import React from 'https://esm.sh/react@18';
import ReactDOM from 'https://esm.sh/react-dom@18';

function Home({ onNavigate }) {
  return (
    React.createElement('div', null,
      React.createElement('h1', null, 'Grab Style App'),
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
        )
      )
    )
  );
}

function BackButton({ onBack }) {
  return React.createElement('button', { onClick: onBack }, 'Back');
}

function FoodDelivery({ onBack }) {
  return React.createElement('div', null,
    BackButton({ onBack }),
    React.createElement('h2', null, 'Restaurant Delivery'),
    React.createElement('p', null, 'Browse restaurants and order food.')
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

  const onBack = () => setPage('home');

  switch(page) {
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
      return Home({ onNavigate: setPage });
  }
}

ReactDOM.createRoot(document.getElementById('root')).render(
  React.createElement(App)
);
