import React from 'react';
import { StyleSheet, Text, View, Pressable,Button } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const UserDashboard = ({navigation}) => {
    const logoutUser = async () => {
        await AsyncStorage.removeItem('userToken');
        // Redirect to Login
        navigation.navigate('Login');
    
    };

    return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Orders</Text>
        <Button title="Logout" onPress={logoutUser} />
      </View>
      
    <View style={styles.buttonGroup}>
    <View style={styles.buttonView}>
        <Pressable style={styles.button} onPress={() => {navigation.navigate('OrdersListUser')}}>
            <Text style={styles.buttonText}>List Your Orders</Text>
        </Pressable>
    </View>

    <View style={styles.buttonView}>
        <Pressable style={styles.button} onPress={() => {navigation.navigate('OrderCreate')}}>
            <Text style={styles.buttonText}>Create an Orders</Text>
        </Pressable>
    </View>
    </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5fcff',
  },
  buttonGroup : {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,

  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  button : {
    backgroundColor : "red",
    height : 45,
    borderColor : "gray",
    borderWidth  : 1,
    borderRadius : 5,
    alignItems : "center",
    justifyContent : "center",
    marginBottom : 10,
    padding: 10
  },
  buttonText : {
    color : "white"  ,
    fontSize: 18,
    fontWeight : "bold"
  },
  header: {
    marginTop: 30,
    height: 60,
    backgroundColor: '#f8f9fa',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    elevation: 2, // Adds shadow for Android
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
});

export default UserDashboard;
