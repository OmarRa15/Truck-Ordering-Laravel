import React from 'react';
import { useState } from 'react'
import { StyleSheet, Text, View, Pressable, TextInput,ScrollView} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { RadioButton } from 'react-native-paper';
import axios from 'axios';

const OrderCreate = ({navigation}) => {

    const logoutUser = async () => {
        await AsyncStorage.removeItem('userToken');
        // Redirect to Login
        navigation.navigate('Login');
    };


    const [size,setSize]=  useState("");
    const [weight,setWeight]=  useState("");
    const [pickup_location,setPickup_location]=  useState("");
    const [destination_location,setDestination_location]=  useState("");
    const [delivery_type,setDelivery_type]=  useState("");
    const [pickup_date,setPickup_date]=  useState("");
    const [errorMessage,setErrorMessage]=  useState("");

    const handleOrderCreate = async () => {
        // Simple form validation
        if (!size || !weight || !pickup_location || !pickup_date || !destination_location || !delivery_type ) {
            setErrorMessage('All fields are required.');
            return;
        }

        try {
          // get the user token from the async storage
          const userToken = await AsyncStorage.getItem('userToken');

            const response = await axios.post('http://192.168.8.18:8000/api/orders', {
                size: size.trim(),
                weight: weight.trim(),
                pickup_location: pickup_location.trim(),
                pickup_date: pickup_date.trim(),
                destination_location: destination_location.trim(),
                delivery_type: delivery_type.trim(),
            },
            {
              headers: {
                'Authorization': `Bearer ${userToken}`,
                'content-type': 'application/json',
              }
            }
            );
            // if the response code is 201, then the order was created successfully
            if (response.status === 201) {
                navigation.navigate('AdminDashboard');
            } else {
                setErrorMessage('An unexpected error occurred here.'+ response.data.message);
            }
        
        } catch (error) {
            // Handle errors from the server
            if (error.response) {
                setErrorMessage(error.response.data.message);
            } else {
                setErrorMessage('An unexpected error occurred: ' + error.message);
            }
        }
    }



    return (
        <ScrollView contentContainerStyle={styles.container}>
        
        <Text style={styles.title}>Create an Order</Text>
        <View style={styles.inputView}>

            <TextInput style={styles.input} placeholder='Size'  value={size} onChangeText={setSize} autoCorrect={false}
        autoCapitalize='none' />
            <TextInput style={styles.input} placeholder='Wieght (Kg)' keyboardType="numeric" value={weight} onChangeText={setWeight} autoCorrect={false}
        autoCapitalize='none' />
            <TextInput style={styles.input} placeholder='Pickup Location' value={pickup_location} onChangeText={setPickup_location} autoCorrect={false}/>
            <TextInput style={styles.input} placeholder='Pickup Date' value={pickup_date} onChangeText={setPickup_date} autoCorrect={false}
        autoCapitalize='none' />
            <TextInput style={styles.input} placeholder='Destination Location' value={destination_location} onChangeText={setDestination_location} autoCorrect={false}
        autoCapitalize='none' />
            

            <Text style={styles.title}>Choose a Delivery type:</Text>
            <RadioButton.Group onValueChange={newValue => setDelivery_type(newValue)} value={delivery_type}>
                <View style={styles.radioOption}>
                <RadioButton value="fast" />
                <Text style={styles.radioLabel}>Fast</Text>
                </View>
                <View style={styles.radioOption}>
                <RadioButton value="normal" />
                <Text style={styles.radioLabel}>Normal</Text>
                </View>
            </RadioButton.Group>

        </View>
        {errorMessage ? <Text style={styles.error}>{errorMessage}</Text> : null}        
        <View style={styles.buttonView}>
            <Pressable style={styles.button} onPress={handleOrderCreate}>
                <Text style={styles.buttonText}>Place Order</Text>
            </Pressable>
        </View>

    </ScrollView>

    );
};

const styles = StyleSheet.create({
    container : {
        alignItems : "center",
        paddingTop: 70,
      },
      image : {
        height : 80,
        width : 85
      },
      title : {
        fontSize : 30,
        fontWeight : "bold",
        textTransform : "uppercase",
        textAlign: "center",
        paddingVertical : 40,
        color : "red"
      },
      inputView : {
        gap : 15,
        width : "100%",
        paddingHorizontal : 40,
        marginBottom  :15
      },
      input : {
        height : 50,
        paddingHorizontal : 20,
        borderColor : "red",
        borderWidth : 1,
        borderRadius: 7
      },
      button : {
        backgroundColor : "red",
        height : 45,
        borderColor : "gray",
        borderWidth  : 1,
        borderRadius : 5,
        alignItems : "center",
        justifyContent : "center",
        marginBottom : 10
      },
      buttonText : {
        color : "white"  ,
        fontSize: 18,
        fontWeight : "bold"
      }, 
      buttonView :{
        width :"100%",
        paddingHorizontal : 50
      },
      footerText : {
        textAlign: "center",
        color : "gray",
      },
      signup : {
        color : "red",
        fontSize : 13
      },
      error: {
        color: 'red',
        marginTop: 10,
      },
      radioOption: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
      },
      radioLabel: {
        fontSize: 16,
      },

    });

export default OrderCreate;
