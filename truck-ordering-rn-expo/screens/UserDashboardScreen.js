import React from 'react';
import { StyleSheet, Text, View, Pressable } from 'react-native';

const UserDashboard = ({navigation}) => {
  
    return (
    <View style={styles.container}>
      
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
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
});

export default UserDashboard;
