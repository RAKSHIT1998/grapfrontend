import React from 'https://esm.sh/react@18';

export default function HomeScreen({ onNavigate, user, onLogout }) {
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
