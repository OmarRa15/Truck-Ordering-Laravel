import React from 'react';
import { StyleSheet, Text, View, Pressable } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AdminDashboard = ({navigation}) => {
    const logoutUser = async () => {
        await AsyncStorage.removeItem('userToken');
        // Redirect to Login
        navigation.navigate('Login');
    };
    
    return (
    <View style={styles.container}>

    {/* <Pressable style={styles.button} onPress={logoutUser}> 
        <Text style={styles.buttonText}>LOGOUT</Text>
    </Pressable> */}

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
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5fcff',
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
});

export default AdminDashboard;
