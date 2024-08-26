import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, ActivityIndicator, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import api from '../api';


const OrdersListScreen = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {

      const userToken = await AsyncStorage.getItem('userToken');

      const response = await api.get('/orders', {
        headers: {
          'Authorization': `Bearer ${userToken}`,
        },
      });

      setOrders(response.data);
    } catch (error) {
        if (error.response) {
            setErrorMessage(error.response.data.message);
        } else {
            setErrorMessage('An unexpected error occurred: ' + error.message);
        }
        
    } finally {
      setLoading(false);
    }
  };

  const renderOrder = ({ item: order }) => (
    <View style={styles.itemContainer}>
      <Text style={styles.itemName}>{order.destination_location}</Text>
      <Text style={[styles.itemStatus, order.status !== 'pending' ? styles.active : styles.inactive]}>
        {order.status}
      </Text>
    </View>
  );

  if (loading) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <View style={styles.container}>

        <FlatList
        data={orders} 
        keyExtractor={(order)=> order.id.toString()} // Fallback for missing `id`
        renderItem={renderOrder}
        />
        
    </View>
  );
};

export default OrdersListScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9f9f9',
    padding: 16,
  },
  itemContainer: {
    backgroundColor: '#fff',
    padding: 16,
    marginVertical: 8,
    borderRadius: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  itemName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  itemStatus: {
    fontSize: 14,
    fontWeight: '600',
    padding: 4,
    borderRadius: 4,
  },
  active: {
    backgroundColor: '#d4edda',
    color: '#155724',
  },
  inactive: {
    backgroundColor: '#f8d7da',
    color: '#721c24',
  },
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
