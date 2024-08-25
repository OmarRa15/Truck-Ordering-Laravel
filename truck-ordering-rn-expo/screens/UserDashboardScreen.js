import React from 'react';
import { StyleSheet, Text, View, Pressable } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const UserDashboard = ({navigation}) => {
    const logoutUser = async () => {
        await AsyncStorage.removeItem('userToken');
        // Redirect to Login
        navigation.navigate('Login');
    
    };

    return (
    <View style={styles.container}>

    <Pressable style={styles.button} onPress={logoutUser}> 
        <Text style={styles.buttonText}>LOGOUT</Text>
    </Pressable>


      <Text style={styles.text}>Hello User!</Text>
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
});

export default UserDashboard;
