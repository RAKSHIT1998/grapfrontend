import React from 'https://esm.sh/react@18';

export default function HomeScreen({ onNavigate, user, onLogout }) {
  const trending = ['Food Fest', 'Street Art Fair', 'Jazz Night'];
  const movie = 'Avengers Reassembled';
  const news = 'City marathon this weekend';
  return (
    React.createElement('div', { style: { paddingBottom: '120px' } },
      React.createElement('h1', null, 'Grab Style App'),
      user ? React.createElement('p', null, `Welcome, ${user.username}`) : null,
      React.createElement('section', null,
        React.createElement('h3', null, 'Trending in Town'),
        React.createElement('ul', null,
          trending.map((t, i) => React.createElement('li', { key: i }, t))
        )
      ),
      React.createElement('section', null,
        React.createElement('h3', null, 'Now Showing'),
        React.createElement('p', null, movie)
      ),
      React.createElement('section', null,
        React.createElement('h3', null, 'Latest News'),
        React.createElement('p', null, news)
      ),
      React.createElement('div', {
        style: {
          position: 'fixed',
          bottom: 0,
          left: 0,
          right: 0,
          background: '#eee',
          padding: '10px',
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'space-around'
        }
      },
        React.createElement('button', { onClick: () => onNavigate('food') }, 'Food'),
        React.createElement('button', { onClick: () => onNavigate('taxi') }, 'Taxi'),
        React.createElement('button', { onClick: () => onNavigate('mart') }, 'Mart'),
        React.createElement('button', { onClick: () => onNavigate('porter') }, 'Porter'),
        React.createElement('button', { onClick: () => onNavigate('bike') }, 'Bike'),
        React.createElement('button', { onClick: () => onNavigate('cart') }, 'Cart'),
        user ? React.createElement(React.Fragment, null,
          React.createElement('button', { onClick: () => onNavigate('payment') }, 'Payment'),
          React.createElement('button', { onClick: () => onNavigate('tracking') }, 'Track'),
          React.createElement('button', { onClick: () => onNavigate('orders') }, 'Orders'),
          React.createElement('button', { onClick: onLogout }, 'Logout')
        ) : React.createElement(React.Fragment, null,
          React.createElement('button', { onClick: () => onNavigate('login') }, 'Login'),
          React.createElement('button', { onClick: () => onNavigate('signup') }, 'Sign Up')
        ),
        React.createElement('button', { onClick: () => onNavigate('settings') }, 'Settings')
      )
    )
  );
}
