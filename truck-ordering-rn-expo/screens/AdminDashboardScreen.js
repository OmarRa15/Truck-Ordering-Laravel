import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, FlatList, StyleSheet, ActivityIndicator, Alert, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';

import api from '../api';

const AdminOrdersList = ({navigation}) => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isFetchingMore, setIsFetchingMore] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [lastPage, setLastPage] = useState(1);
  const [errorMessage, setErrorMessage] = useState(null);

  useEffect(() => {
    fetchOrders(); // Fetch the first page of orders on component mount
  }, []);

  const fetchOrders = async (page = 1) => {
    // Handle loading state separately for initial load and pagination
    if (page === 1) setLoading(true);
    else setIsFetchingMore(true);

    try {
      const userToken = await AsyncStorage.getItem('userToken');

      const response = await api.get(`/orders?page=${page}`, {
        headers: {
          'Authorization': `Bearer ${userToken}`,
        },
      });
      const data = response.data;

      if (page === 1) {
        setOrders(data.data); // Set orders for the first page
      } else {
        setOrders(prevOrders => [...prevOrders, ...data.data]); // Append orders for pagination
      }
      
      setCurrentPage(data.current_page);
      setLastPage(data.last_page);
    } catch (error) {
      if (error.response) {
        setErrorMessage(error.response.data.message);
      } else {
        setErrorMessage('An unexpected error occurred: ' + error.message);
      }
    } finally {
      // Clear the loading state after the request completes
      if (page === 1) setLoading(false);
      setIsFetchingMore(false);
    }
  };

  useFocusEffect(
    useCallback(() => {
      fetchOrders(); // Re-fetch orders whenever the screen is focused
    }, [])
  );


  const loadMoreOrders = () => {
    if (currentPage < lastPage && !isFetchingMore) {
      fetchOrders(currentPage + 1);
    }
  };

  const renderOrder = useCallback(({ item: order }) => (
    <TouchableOpacity
      style={styles.itemContainer}
      onPress={() => navigation.navigate('OrderDetailsAdmin', { orderId: order.id })} // Pass orderId as route param
    >
      <Text style={styles.itemName}>
        {order.user.name}, {order.pickup_location} {'==>'} {order.destination_location}
      </Text>
      <Text style={[styles.itemStatus, order.status !== 'pending' ? styles.active : styles.inactive]}>
        {order.status}
      </Text>
    </TouchableOpacity>
  ), [navigation]); 

  if (loading && currentPage === 1) {
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
        keyExtractor={(order) => order.id.toString()}
        renderItem={renderOrder}
        onEndReached={loadMoreOrders}
        onEndReachedThreshold={0.5}
        ListFooterComponent={isFetchingMore ? <ActivityIndicator size="large" color="#0000ff" /> : null}
        initialNumToRender={10}
        removeClippedSubviews={true}
      />
      {errorMessage && Alert.alert('Error', errorMessage)}
    </View>
  );
};

export default AdminOrdersList;

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
    fontSize: 13,
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
