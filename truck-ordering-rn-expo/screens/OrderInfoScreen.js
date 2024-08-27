import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ActivityIndicator, Linking } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import api from '../api';
import { Picker } from '@react-native-picker/picker'

const OrderDetailsScreen = ({ route, navigation }) => {
  const [order, setOrder] = useState(null);
  const [status, setStatus] = useState('');
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
      setStatus(response.data.status);
      setLoading(false);
    } catch (error) {
       setErrorMessage('An unexpected error occurred: ' + error.message);
      setLoading(false);
    }
  };

  const updateStatus = async () => {
    try {
      const userToken = await AsyncStorage.getItem('userToken');
      await api.post(`/orders/${orderId}`,
         { 'status': status }, 
         {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${userToken}`,
            }
         });
        navigation.navigate('AdminDashboard');
    } catch (error) {
        setErrorMessage('An unexpected error occurred: ' + error.message);
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

      <View style={styles.statusContainer}>
        <Text style={styles.label}>Update Status:</Text>
        <Picker
          selectedValue={status}
          onValueChange={(itemValue) => setStatus(itemValue)}
          style={styles.picker}
        >
          <Picker.Item label="Pending" value="pending" />
          <Picker.Item label="In Progress" value="in progress" />
          <Picker.Item label="Delivered" value="delivered" />
        </Picker>
      </View>

      <TouchableOpacity style={styles.button} onPress={updateStatus}>
        <Text style={styles.buttonText}>Update Status</Text>
      </TouchableOpacity>
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

export default OrderDetailsScreen;
