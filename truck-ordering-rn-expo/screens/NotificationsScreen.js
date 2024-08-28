import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, ActivityIndicator, TouchableOpacity, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import BottomNavBar from './BottomNavBar';
import api from '../api';

const NotificationsScreen = ({navigation}) => {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch notifications from the API
    const fetchNotifications = async () => {
      try {
        setLoading(true);
        const userToken = await AsyncStorage.getItem('userToken');
        const response = await api.get('/notifications',
            { headers: { 'Authorization': `Bearer ${userToken}` } }
        ); 
        setNotifications(response.data); 

        const ReadResponse = await api.post('/notifications/mark-as-read',
          {},
            { headers: { 'Authorization': `Bearer ${userToken}` } } // 401 error
        ); 
      } catch (error) {
        console.error(error);
        setLoading(false);

      } finally {
        setLoading(false);
      }
    };
    // console.log(notifications);
    fetchNotifications();
  }, []);

  const renderItem = ({ item }) => (
    <TouchableOpacity style={[styles.notificationItem, { backgroundColor: item.read_at ? '#dde3ed' : '#95b7ed' }]}
    onPress={() => navigation.navigate('OrderDetailsAdmin', { orderId: item.data.order_id })}>
      <Text style={styles.notificationTitle}>{"A New Order"}</Text>
      <Text style={styles.notificationBody}>{item.data.message}</Text>
    </TouchableOpacity>
  );

  if (loading) {
    return (
      <View style={styles.loader}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* <Text style={styles.header}>Notifications</Text> */}
      <FlatList
        data={notifications}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.listContainer}
      />
      <BottomNavBar navigation={navigation} />

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f4f4f4',
    paddingHorizontal: 10,
    paddingTop: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 15,
    color: '#333',
  },
  listContainer: {
    paddingBottom: 20,
  },
  notificationItem: {
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 2,
  },
  notificationTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 5,
  },
  notificationBody: {
    fontSize: 14,
    color: '#666',
  },
  loader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default NotificationsScreen;
