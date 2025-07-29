import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, Text, View, Button, TextInput, FlatList } from 'react-native';

function BackButton({ onBack }) {
  return <Button title="Back" onPress={onBack} />;
}

function Home({ onNavigate, user, onLogout }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Grab Style App</Text>
      {user && <Text>Welcome, {user.username}</Text>}
      <Button title="Restaurant Delivery" onPress={() => onNavigate('food')} />
      <Button title="Taxi Service" onPress={() => onNavigate('taxi')} />
      <Button title="Mart Delivery" onPress={() => onNavigate('mart')} />
      <Button title="Porter Service" onPress={() => onNavigate('porter')} />
      <Button title="Medicine Delivery" onPress={() => onNavigate('medicine')} />
      <Button title="Bike Taxi" onPress={() => onNavigate('bike')} />
      <Button title="Cart" onPress={() => onNavigate('cart')} />
      {user && (
        <>
          <Button title="Payment" onPress={() => onNavigate('payment')} />
          <Button title="Track Driver" onPress={() => onNavigate('tracking')} />
        </>
      )}
      <Button title="Settings" onPress={() => onNavigate('settings')} />
      {user ? (
        <Button title="Logout" onPress={onLogout} />
      ) : (
        <>
          <Button title="Login" onPress={() => onNavigate('login')} />
          <Button title="Sign Up" onPress={() => onNavigate('signup')} />
        </>
      )}
    </View>
  );
}

function Signup({ onBack, onSignup }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  return (
    <View style={styles.container}>
      <BackButton onBack={onBack} />
      <Text style={styles.subtitle}>Sign Up</Text>
      <TextInput placeholder="Username" value={username} onChangeText={setUsername} style={styles.input} />
      <TextInput placeholder="Password" value={password} onChangeText={setPassword} secureTextEntry style={styles.input} />
      <Button title="Sign Up" onPress={() => onSignup({ username })} />
    </View>
  );
}

function Login({ onBack, onLogin }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  return (
    <View style={styles.container}>
      <BackButton onBack={onBack} />
      <Text style={styles.subtitle}>Login</Text>
      <TextInput placeholder="Username" value={username} onChangeText={setUsername} style={styles.input} />
      <TextInput placeholder="Password" value={password} onChangeText={setPassword} secureTextEntry style={styles.input} />
      <Button title="Login" onPress={() => onLogin({ username })} />
    </View>
  );
}

function Settings({ onBack, settings, onUpdate }) {
  const [location, setLocation] = useState(settings.location || '');
  const [currency, setCurrency] = useState(settings.currency || 'USD');
  return (
    <View style={styles.container}>
      <BackButton onBack={onBack} />
      <Text style={styles.subtitle}>Customer Settings</Text>
      <TextInput placeholder="Location" value={location} onChangeText={setLocation} style={styles.input} />
      <TextInput placeholder="Currency" value={currency} onChangeText={setCurrency} style={styles.input} />
      <Button title="Save" onPress={() => onUpdate({ location, currency })} />
    </View>
  );
}

function Payment({ onBack, items, onPay }) {
  return (
    <View style={styles.container}>
      <BackButton onBack={onBack} />
      <Text style={styles.subtitle}>Payment</Text>
      {items.length ? (
        <FlatList
          data={items}
          keyExtractor={(_, i) => String(i)}
          renderItem={({ item }) => (
            <Text>{item.name} x {item.qty}</Text>
          )}
        />
      ) : (
        <Text>Cart is empty</Text>
      )}
      <Button title="Pay Now" disabled={!items.length} onPress={() => { alert('Payment completed (simulated).'); onPay(); }} />
    </View>
  );
}

function Cart({ onBack, items, onCheckout, onRemove }) {
  return (
    <View style={styles.container}>
      <BackButton onBack={onBack} />
      <Text style={styles.subtitle}>Cart</Text>
      {items.length ? (
        <FlatList
          data={items}
          keyExtractor={(_, i) => String(i)}
          renderItem={({ item, index }) => (
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Text style={{ marginRight: 8 }}>{item.name} x {item.qty}</Text>
              <Button title="Remove" onPress={() => onRemove(index)} />
            </View>
          )}
        />
      ) : (
        <Text>Cart is empty</Text>
      )}
      <Button title="Checkout" disabled={!items.length} onPress={onCheckout} />
    </View>
  );
}

function OrderTracking({ onBack }) {
  const [position, setPosition] = useState({ lat: 1.29, lng: 103.85 });
  useEffect(() => {
    const id = setInterval(async () => {
      try {
        const res = await fetch('http://localhost:3000/api/driver');
        if (res.ok) {
          setPosition(await res.json());
        }
      } catch (e) {
        console.log(e);
      }
    }, 2000);
    return () => clearInterval(id);
  }, []);
  return (
    <View style={styles.container}>
      <BackButton onBack={onBack} />
      <Text style={styles.subtitle}>Driver Position</Text>
      <Text>Lat: {position.lat.toFixed(5)}</Text>
      <Text>Lng: {position.lng.toFixed(5)}</Text>
    </View>
  );
}

function FoodDelivery({ onBack, onAdd }) {
  const [restaurants, setRestaurants] = useState([]);
  useEffect(() => {
    const load = async () => {
      try {
        const res = await fetch('http://localhost:3000/api/restaurants');
        if (res.ok) {
          setRestaurants(await res.json());
        }
      } catch (e) {
        console.log(e);
      }
    };
    load();
  }, []);
  return (
    <View style={styles.container}>
      <BackButton onBack={onBack} />
      <Text style={styles.subtitle}>Restaurant Delivery</Text>
      <FlatList
        data={restaurants}
        keyExtractor={item => String(item.id)}
        renderItem={({ item }) => (
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Text style={{ marginRight: 8 }}>{item.name}</Text>
            <Button title="Add" onPress={() => onAdd({ name: item.name, qty: 1 })} />
          </View>
        )}
      />
    </View>
  );
}

function TaxiService({ onBack }) {
  const [pickup, setPickup] = useState('');
  const [dropoff, setDropoff] = useState('');
  return (
    <View style={styles.container}>
      <BackButton onBack={onBack} />
      <Text style={styles.subtitle}>Taxi Service</Text>
      <TextInput placeholder="Pick-up location" value={pickup} onChangeText={setPickup} style={styles.input} />
      <TextInput placeholder="Drop-off location" value={dropoff} onChangeText={setDropoff} style={styles.input} />
      <Button title="Book Taxi" onPress={() => { alert(`Taxi booked from ${pickup} to ${dropoff}`); setPickup(''); setDropoff(''); }} />
    </View>
  );
}

function MartDelivery({ onBack, onAdd }) {
  const [item, setItem] = useState('');
  const [quantity, setQuantity] = useState('1');
  return (
    <View style={styles.container}>
      <BackButton onBack={onBack} />
      <Text style={styles.subtitle}>Mart Delivery</Text>
      <TextInput placeholder="Item" value={item} onChangeText={setItem} style={styles.input} />
      <TextInput placeholder="Quantity" value={quantity} onChangeText={setQuantity} style={styles.input} keyboardType="numeric" />
      <Button title="Add to Cart" onPress={() => { if (item) { onAdd({ name: item, qty: quantity }); setItem(''); setQuantity('1'); } }} />
    </View>
  );
}

function PorterService({ onBack }) {
  const [pickup, setPickup] = useState('');
  const [dropoff, setDropoff] = useState('');
  const [description, setDescription] = useState('');
  return (
    <View style={styles.container}>
      <BackButton onBack={onBack} />
      <Text style={styles.subtitle}>Porter Service</Text>
      <TextInput placeholder="Package description" value={description} onChangeText={setDescription} style={styles.input} />
      <TextInput placeholder="Pick-up address" value={pickup} onChangeText={setPickup} style={styles.input} />
      <TextInput placeholder="Drop-off address" value={dropoff} onChangeText={setDropoff} style={styles.input} />
      <Button title="Book Porter" onPress={() => { alert(`Porter booked: ${description} from ${pickup} to ${dropoff}`); setPickup(''); setDropoff(''); setDescription(''); }} />
    </View>
  );
}

function MedicineDelivery({ onBack, onAdd }) {
  const [medicine, setMedicine] = useState('');
  const [quantity, setQuantity] = useState('1');
  return (
    <View style={styles.container}>
      <BackButton onBack={onBack} />
      <Text style={styles.subtitle}>Medicine Delivery</Text>
      <TextInput placeholder="Medicine name" value={medicine} onChangeText={setMedicine} style={styles.input} />
      <TextInput placeholder="Quantity" value={quantity} onChangeText={setQuantity} style={styles.input} keyboardType="numeric" />
      <Button title="Add to Cart" onPress={() => { if(medicine){ onAdd({ name: medicine, qty: quantity }); setMedicine(''); setQuantity('1'); } }} />
    </View>
  );
}

function BikeTaxiService({ onBack }) {
  const [pickup, setPickup] = useState('');
  const [dropoff, setDropoff] = useState('');
  return (
    <View style={styles.container}>
      <BackButton onBack={onBack} />
      <Text style={styles.subtitle}>Bike Taxi Service</Text>
      <TextInput placeholder="Pick-up point" value={pickup} onChangeText={setPickup} style={styles.input} />
      <TextInput placeholder="Drop-off point" value={dropoff} onChangeText={setDropoff} style={styles.input} />
      <Button title="Book Ride" onPress={() => { alert(`Bike taxi booked from ${pickup} to ${dropoff}`); setPickup(''); setDropoff(''); }} />
    </View>
  );
}

export default function App() {
  const [page, setPage] = useState('home');
  const [user, setUser] = useState(null);
  const [settings, setSettings] = useState({ location: '', currency: 'USD' });
  const [cart, setCart] = useState([]);

  const addToCart = item => setCart(c => [...c, item]);
  const removeFromCart = index => setCart(c => c.filter((_, i) => i !== index));
  const clearCart = () => setCart([]);

  const onBack = () => setPage('home');
  const handleAuth = u => { setUser(u); setPage('home'); };
  const handleSettings = s => { setSettings(s); setPage('home'); };
  const handleLogout = () => setUser(null);

  switch (page) {
    case 'signup':
      return <Signup onBack={onBack} onSignup={handleAuth} />;
    case 'login':
      return <Login onBack={onBack} onLogin={handleAuth} />;
    case 'settings':
      return <Settings onBack={onBack} settings={settings} onUpdate={handleSettings} />;
    case 'payment':
      return <Payment onBack={onBack} items={cart} onPay={() => { clearCart(); setPage('home'); }} />;
    case 'cart':
      return <Cart onBack={onBack} items={cart} onCheckout={() => setPage('payment')} onRemove={removeFromCart} />;
    case 'tracking':
      return <OrderTracking onBack={onBack} />;
    case 'food':
      return <FoodDelivery onBack={onBack} onAdd={addToCart} />;
    case 'taxi':
      return <TaxiService onBack={onBack} />;
    case 'mart':
      return <MartDelivery onBack={onBack} onAdd={addToCart} />;
    case 'porter':
      return <PorterService onBack={onBack} />;
    case 'medicine':
      return <MedicineDelivery onBack={onBack} onAdd={addToCart} />;
    case 'bike':
      return <BikeTaxiService onBack={onBack} />;
    default:
      return <Home onNavigate={setPage} user={user} onLogout={handleLogout} />;
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    backgroundColor: '#fff'
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#00b14f'
  },
  subtitle: {
    fontSize: 20,
    marginVertical: 12,
    color: '#00b14f'
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 8,
    width: '80%',
    marginVertical: 4
  }
});
