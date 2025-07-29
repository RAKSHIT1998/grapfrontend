import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Button, TextInput, FlatList } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

function BackButton({ onBack }) {
  return <Button title="Back" onPress={onBack} />;
}

function Home({ navigation, user, onLogout }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Grab Style App</Text>
      {user && <Text>Welcome, {user.username}</Text>}
      <Button title="Restaurant Delivery" onPress={() => navigation.navigate('Food')} />
      <Button title="Taxi Service" onPress={() => navigation.navigate('Taxi')} />
      <Button title="Mart Delivery" onPress={() => navigation.navigate('Mart')} />
      <Button title="Porter Service" onPress={() => navigation.navigate('Porter')} />
      <Button title="Medicine Delivery" onPress={() => navigation.navigate('Medicine')} />
      <Button title="Bike Taxi" onPress={() => navigation.navigate('Bike')} />
      <Button title="Cart" onPress={() => navigation.navigate('Cart')} />
      {user && (
        <>
          <Button title="Payment" onPress={() => navigation.navigate('Payment')} />
          <Button title="Track Driver" onPress={() => navigation.navigate('Tracking')} />
        </>
      )}
      <Button title="Settings" onPress={() => navigation.navigate('Settings')} />
      {user ? (
        <Button title="Logout" onPress={onLogout} />
      ) : (
        <>
          <Button title="Login" onPress={() => navigation.navigate('Login')} />
          <Button title="Sign Up" onPress={() => navigation.navigate('Signup')} />
        </>
      )}
    </View>
  );
}

function Signup({ navigation, onSignup }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  return (
    <View style={styles.container}>
      <BackButton onBack={() => navigation.goBack()} />
      <Text style={styles.subtitle}>Sign Up</Text>
      <TextInput placeholder="Username" value={username} onChangeText={setUsername} style={styles.input} />
      <TextInput placeholder="Password" value={password} onChangeText={setPassword} secureTextEntry style={styles.input} />
      <Button title="Sign Up" onPress={() => { onSignup({ username }); navigation.goBack(); }} />
    </View>
  );
}

function Login({ navigation, onLogin }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  return (
    <View style={styles.container}>
      <BackButton onBack={() => navigation.goBack()} />
      <Text style={styles.subtitle}>Login</Text>
      <TextInput placeholder="Username" value={username} onChangeText={setUsername} style={styles.input} />
      <TextInput placeholder="Password" value={password} onChangeText={setPassword} secureTextEntry style={styles.input} />
      <Button title="Login" onPress={() => { onLogin({ username }); navigation.goBack(); }} />
    </View>
  );
}

function Settings({ navigation, settings, onUpdate }) {
  const [location, setLocation] = useState(settings.location || '');
  const [currency, setCurrency] = useState(settings.currency || 'USD');
  return (
    <View style={styles.container}>
      <BackButton onBack={() => navigation.goBack()} />
      <Text style={styles.subtitle}>Customer Settings</Text>
      <TextInput placeholder="Location" value={location} onChangeText={setLocation} style={styles.input} />
      <TextInput placeholder="Currency" value={currency} onChangeText={setCurrency} style={styles.input} />
      <Button title="Save" onPress={() => { onUpdate({ location, currency }); navigation.goBack(); }} />
    </View>
  );
}

function Payment({ navigation, items, onPay }) {
  return (
    <View style={styles.container}>
      <BackButton onBack={() => navigation.goBack()} />
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
      <Button title="Pay Now" disabled={!items.length} onPress={() => { alert('Payment completed (simulated).'); onPay(); navigation.goBack(); }} />
    </View>
  );
}

function Cart({ navigation, items, onCheckout, onRemove }) {
  return (
    <View style={styles.container}>
      <BackButton onBack={() => navigation.goBack()} />
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
      <Button title="Checkout" disabled={!items.length} onPress={() => onCheckout()} />
    </View>
  );
}

function OrderTracking({ navigation }) {
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
      <BackButton onBack={() => navigation.goBack()} />
      <Text style={styles.subtitle}>Driver Position</Text>
      <Text>Lat: {position.lat.toFixed(5)}</Text>
      <Text>Lng: {position.lng.toFixed(5)}</Text>
    </View>
  );
}

function FoodDelivery({ navigation, onAdd }) {
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
      <BackButton onBack={() => navigation.goBack()} />
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

function TaxiService({ navigation }) {
  const [pickup, setPickup] = useState('');
  const [dropoff, setDropoff] = useState('');
  return (
    <View style={styles.container}>
      <BackButton onBack={() => navigation.goBack()} />
      <Text style={styles.subtitle}>Taxi Service</Text>
      <TextInput placeholder="Pick-up location" value={pickup} onChangeText={setPickup} style={styles.input} />
      <TextInput placeholder="Drop-off location" value={dropoff} onChangeText={setDropoff} style={styles.input} />
      <Button title="Book Taxi" onPress={() => { alert(`Taxi booked from ${pickup} to ${dropoff}`); setPickup(''); setDropoff(''); }} />
    </View>
  );
}

function MartDelivery({ navigation, onAdd }) {
  const [item, setItem] = useState('');
  const [quantity, setQuantity] = useState('1');
  return (
    <View style={styles.container}>
      <BackButton onBack={() => navigation.goBack()} />
      <Text style={styles.subtitle}>Mart Delivery</Text>
      <TextInput placeholder="Item" value={item} onChangeText={setItem} style={styles.input} />
      <TextInput placeholder="Quantity" value={quantity} onChangeText={setQuantity} style={styles.input} keyboardType="numeric" />
      <Button title="Add to Cart" onPress={() => { if (item) { onAdd({ name: item, qty: quantity }); setItem(''); setQuantity('1'); } }} />
    </View>
  );
}

function PorterService({ navigation }) {
  const [pickup, setPickup] = useState('');
  const [dropoff, setDropoff] = useState('');
  const [description, setDescription] = useState('');
  return (
    <View style={styles.container}>
      <BackButton onBack={() => navigation.goBack()} />
      <Text style={styles.subtitle}>Porter Service</Text>
      <TextInput placeholder="Package description" value={description} onChangeText={setDescription} style={styles.input} />
      <TextInput placeholder="Pick-up address" value={pickup} onChangeText={setPickup} style={styles.input} />
      <TextInput placeholder="Drop-off address" value={dropoff} onChangeText={setDropoff} style={styles.input} />
      <Button title="Book Porter" onPress={() => { alert(`Porter booked: ${description} from ${pickup} to ${dropoff}`); setPickup(''); setDropoff(''); setDescription(''); }} />
    </View>
  );
}

function MedicineDelivery({ navigation, onAdd }) {
  const [medicine, setMedicine] = useState('');
  const [quantity, setQuantity] = useState('1');
  return (
    <View style={styles.container}>
      <BackButton onBack={() => navigation.goBack()} />
      <Text style={styles.subtitle}>Medicine Delivery</Text>
      <TextInput placeholder="Medicine name" value={medicine} onChangeText={setMedicine} style={styles.input} />
      <TextInput placeholder="Quantity" value={quantity} onChangeText={setQuantity} style={styles.input} keyboardType="numeric" />
      <Button title="Add to Cart" onPress={() => { if(medicine){ onAdd({ name: medicine, qty: quantity }); setMedicine(''); setQuantity('1'); } }} />
    </View>
  );
}

function BikeTaxiService({ navigation }) {
  const [pickup, setPickup] = useState('');
  const [dropoff, setDropoff] = useState('');
  return (
    <View style={styles.container}>
      <BackButton onBack={() => navigation.goBack()} />
      <Text style={styles.subtitle}>Bike Taxi Service</Text>
      <TextInput placeholder="Pick-up point" value={pickup} onChangeText={setPickup} style={styles.input} />
      <TextInput placeholder="Drop-off point" value={dropoff} onChangeText={setDropoff} style={styles.input} />
      <Button title="Book Ride" onPress={() => { alert(`Bike taxi booked from ${pickup} to ${dropoff}`); setPickup(''); setDropoff(''); }} />
    </View>
  );
}

const Stack = createNativeStackNavigator();

export default function App() {
  const [user, setUser] = useState(null);
  const [settings, setSettings] = useState({ location: '', currency: 'USD' });
  const [cart, setCart] = useState([]);

  const addToCart = item => setCart(c => [...c, item]);
  const removeFromCart = index => setCart(c => c.filter((_, i) => i !== index));
  const clearCart = () => setCart([]);

  const handleAuth = u => setUser(u);
  const handleSettings = s => setSettings(s);
  const handleLogout = () => setUser(null);

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home">
          {props => <Home {...props} user={user} onLogout={handleLogout} />}
        </Stack.Screen>
        <Stack.Screen name="Signup">
          {props => <Signup {...props} onSignup={handleAuth} />}
        </Stack.Screen>
        <Stack.Screen name="Login">
          {props => <Login {...props} onLogin={handleAuth} />}
        </Stack.Screen>
        <Stack.Screen name="Settings">
          {props => <Settings {...props} settings={settings} onUpdate={handleSettings} />}
        </Stack.Screen>
        <Stack.Screen name="Payment">
          {props => <Payment {...props} items={cart} onPay={clearCart} />}
        </Stack.Screen>
        <Stack.Screen name="Cart">
          {props => <Cart {...props} items={cart} onCheckout={() => props.navigation.navigate('Payment')} onRemove={removeFromCart} />}
        </Stack.Screen>
        <Stack.Screen name="Tracking" component={OrderTracking} />
        <Stack.Screen name="Food">
          {props => <FoodDelivery {...props} onAdd={addToCart} />}
        </Stack.Screen>
        <Stack.Screen name="Taxi" component={TaxiService} />
        <Stack.Screen name="Mart">
          {props => <MartDelivery {...props} onAdd={addToCart} />}
        </Stack.Screen>
        <Stack.Screen name="Porter" component={PorterService} />
        <Stack.Screen name="Medicine">
          {props => <MedicineDelivery {...props} onAdd={addToCart} />}
        </Stack.Screen>
        <Stack.Screen name="Bike" component={BikeTaxiService} />
      </Stack.Navigator>
    </NavigationContainer>
  );
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
