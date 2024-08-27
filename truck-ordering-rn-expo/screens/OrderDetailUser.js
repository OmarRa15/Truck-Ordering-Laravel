import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, Linking } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import api from '../api';

const OrderDetailsUser = ({ route, navigation }) => {
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');

  const orderId = route.params?.orderId; 

  // Fetch order data on component mount
  useEffect(() => {
    fetchOrderDetails();
  }, []);

  const fetchOrderDetails = async () => {
    try {
    const userToken = await AsyncStorage.getItem('userToken');
  
    const response = await api.get(`/orders/${orderId}`, {
        headers: {
          'Authorization': `Bearer ${userToken}`,
        },
      });
      setOrder(response.data);
      setLoading(false);
    } catch (error) {
       setErrorMessage('An unexpected error occurred: ' + error.message);
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Order Details</Text>

      <Text style={styles.label}>User Name: <Text style={styles.value}>{order.user.name}</Text></Text>
      <Text style={styles.label}>User Email: 
        <Text style={styles.valueLink} onPress={()=>Linking.openURL(`mailto:${order.user.email}`)}>
            {' '}{order.user.email}
        </Text>
      </Text>
      <Text style={styles.label}>User Phone: 
         <Text style={styles.valueLink} onPress={() => Linking.openURL(`tel:${order.user.phone_number}`) }>
            {' '}{order.user.phone_number}
         </Text>
      </Text>
      <Text style={styles.label}>Size: <Text style={styles.value}>{order.size}</Text></Text>
      <Text style={styles.label}>Weight: <Text style={styles.value}>{order.weight}</Text></Text>
      <Text style={styles.label}>Pickup Location: <Text style={styles.value}>{order.pickup_location}</Text></Text>
      <Text style={styles.label}>Pickup Date: <Text style={styles.value}>{order.pickup_date}</Text></Text>
      <Text style={styles.label}>Destination Location: <Text style={styles.value}>{order.destination_location}</Text></Text>
      <Text style={styles.label}>Delivery Type: <Text style={styles.value}>{order.delivery_type}</Text></Text>
      <Text style={styles.label}>Status: <Text style={styles.value}>{order.status}</Text></Text>

      {errorMessage ? <Text style={styles.error}>{errorMessage}</Text> : null}        

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f9f9f9',
  },
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 10,
  },
  value: {
    fontWeight: 'normal',
  },
  valueLink: {
    fontWeight: 'normal',
    color: 'blue',
    textDecorationLine: 'underline',

  },
  statusContainer: {
    marginTop: 20,
  },
  picker: {
    height: 50,
    width: '100%',
    backgroundColor: '#fff',
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 8,
  },
  button: {
    backgroundColor: '#007bff',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
    error: {
        color: 'red',
        marginTop: 20,
    },
});

export default OrderDetailsUser;
