import React, { useState } from 'react'
import { Alert, ScrollView, Image, Pressable, StyleSheet, Switch, Text, TextInput, View } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage';
import api from '../api';

const logo = require("../assets/logo.png")

// Credit for: mustapha.aitigunaoun@gmail.com 

const LoginScreen = ({ navigation }) => {
    const [click,setClick] = useState(false);
    const [email,setEmail]=  useState("");
    const [password,setPassword]=  useState("");
    const [errorMessage, setErrorMessage] = useState('');

    const handleLogin = async () => {
      const response = await loginUser(email, password);
      
      if (response.success) {
        // navigate to the appropriate dashboard based on the user's role
        response.user.isAdmin ? navigation.navigate('AdminDashboard') : navigation.navigate('UserDashboard');
      } else {
        setErrorMessage(response.message);
      }
    };
  
  return (
    <ScrollView contentContainerStyle={styles.container}>
        
        <Image source={logo} style={styles.image} resizeMode='contain' />
        <Text style={styles.title}>Login</Text>
        <View style={styles.inputView}>
            <TextInput style={styles.input} placeholder='EMAIL' value={email} onChangeText={setEmail} autoCorrect={false}
        autoCapitalize='none' />
            <TextInput style={styles.input} placeholder='PASSWORD' secureTextEntry value={password} onChangeText={setPassword} autoCorrect={false}
        autoCapitalize='none'/>
        </View>
        <View style={styles.rememberView}>
            <View style={styles.switch}>
                <Switch  value={click} onValueChange={setClick} trackColor={{true : "green" , false : "gray"}} />
                <Text style={styles.rememberText}>Remember Me </Text>
            </View>

            <View>
                <Pressable onPress={() => Alert.alert("Forget Password!")}>
                    <Text style={styles.forgetText}>Forgot Password?</Text>
                </Pressable>
            </View>
        </View>
        {errorMessage ? <Text style={styles.error}>{errorMessage}</Text> : null}        
        <View style={styles.buttonView}>
            <Pressable style={styles.button} onPress={handleLogin}>
                <Text style={styles.buttonText}>LOGIN</Text>
            </Pressable>
        </View>

        <Text style={styles.footerText}>Don't Have Account?<Text style={styles.signup} onPress={() => navigation.navigate('SignUp')}>  Sign Up</Text></Text>

        
    </ScrollView>
  )
}


const styles = StyleSheet.create({
  container : {
    alignItems : "center",
    paddingTop: 70,
  },
  image : {
    height : 160,
    width : 170
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
    marginBottom  :5
  },
  input : {
    height : 50,
    paddingHorizontal : 20,
    borderColor : "red",
    borderWidth : 1,
    borderRadius: 7
  },
  rememberView : {
    width : "100%",
    paddingHorizontal : 50,
    justifyContent: "space-between",
    alignItems : "center",
    flexDirection : "column",
    marginBottom : 8
  },
  switch :{
    flexDirection : "row",
    gap : 1,
    justifyContent : "center",
    alignItems : "center"
    
  },
  rememberText : {
    fontSize: 13
  },
  forgetText : {
    fontSize : 11,
    color : "red"
  },
  button : {
    backgroundColor : "red",
    height : 45,
    borderColor : "gray",
    borderWidth  : 1,
    borderRadius : 5,
    alignItems : "center",
    justifyContent : "center"
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
  optionsText : {
    textAlign : "center",
    paddingVertical : 10,
    color : "gray",
    fontSize : 13,
    marginBottom : 6
  },
  mediaIcons : {
    flexDirection : "row",
    gap : 15,
    alignItems: "center",
    justifyContent : "center",
    marginBottom : 23
  },
  icons : {
    width : 40,
    height: 40,
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
})

const loginUser = async (email, password) => {
  try {
    // Alert.alert('email: ' + email + ' password: ' + password);
    const response = await api.post('/login', {
      email: email,
      password: password,
    });
    
    // Assuming the response contains the token and user data
    const { token, user } = response.data;
    
    // Store the token securely (e.g., in AsyncStorage)
    await AsyncStorage.setItem('userToken', token);
    await AsyncStorage.setItem('userData', JSON.stringify(user));
    
    return { success: true, user };
  } catch (error) {
// Check if error.response exists
if (error.response) {
  // The request was made, and the server responded with a status code outside the range of 2xx
  return { success: false, message: error.response.data.message };
} else if (error.request) {
  // The request was made, but no response was received
  return { success: false, message: 'No response received from the server. Please try again.' };
} else {
  // Something else happened while setting up the request
  return { success: false, message: `Request error: ${error.message}` };
}  }
};


export default LoginScreen;
