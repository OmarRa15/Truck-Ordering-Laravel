import React, { useState } from 'react'
import { Alert, Image, Pressable, SafeAreaView, StyleSheet, Text, TextInput, View } from 'react-native'
import axios from 'axios';


const logo = require("../assets/logo.png")

// Credit for: mustapha.aitigunaoun@gmail.com 

const SignUpScreen = ({ navigation }) => {
    const [name,setName]=  useState("");
    const [email,setEmail]=  useState("");
    const [phone,setPhone]=  useState("");
    const [password,setPassword]=  useState("");
    const [confirmPassword,setConfirmPassword]=  useState("");
    const [errorMessage,setErrorMessage]=  useState("");
    
    const handleSignUp = async () => {
      // Simple form validation
      if (!email || !password || !confirmPassword || !name || !phone) {
        setErrorMessage('All fields are required.');
        return;
      }
  
      if (password !== confirmPassword) {
        setErrorMessage('Passwords do not match.');
        return;
      }
  
      try {
        const response = await axios.post('http://192.168.117.162:8000/api/register', {
          email: email.trim(),
          password: password.trim(),
          password_confirmation: confirmPassword.trim(),
          name: name.trim(),
          phone_number: phone.trim()
        });  
      
        navigation.navigate('Login');
      
      } catch (error) {
        // Handle errors from the server
        if (error.response) {
          setErrorMessage(error.response.data.message);
        } else {
          setErrorMessage('An unexpected error occurred: ' + error.message);
        }
      }
    };
  
  return (
    <SafeAreaView style={styles.container}>
        
        <Image source={logo} style={styles.image} resizeMode='contain' />
        <Text style={styles.title}>Sign Up</Text>
        <View style={styles.inputView}>
            <TextInput style={styles.input} placeholder='NAME' value={name} onChangeText={setName} autoCorrect={false}
        autoCapitalize='words' />
            <TextInput style={styles.input} placeholder='EMAIL' value={email} onChangeText={setEmail} autoCorrect={false}
        autoCapitalize='none' />
            <TextInput style={styles.input} placeholder='PHONE NUMBER' value={phone} onChangeText={setPhone} autoCorrect={false}/>
            <TextInput style={styles.input} placeholder='PASSWORD' secureTextEntry value={password} onChangeText={setPassword} autoCorrect={false}
        autoCapitalize='none' />
            <TextInput style={styles.input} placeholder='CONFIRM PASSWORD' secureTextEntry value={confirmPassword} onChangeText={setConfirmPassword} autoCorrect={false}
        autoCapitalize='none' />

        </View>
        {errorMessage ? <Text style={styles.error}>{errorMessage}</Text> : null}        
        <View style={styles.buttonView}>
            <Pressable style={styles.button} onPress={handleSignUp}>
                <Text style={styles.buttonText}>SIGN UP</Text>
            </Pressable>
        </View>

        <Text style={styles.footerText}>Already Have Account? <Text style={styles.signup} onPress={() => navigation.navigate('Login')}>Log in</Text></Text>

        
    </SafeAreaView>
  )
}


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
})

export default SignUpScreen;
