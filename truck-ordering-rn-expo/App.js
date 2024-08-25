import * as React from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import LoginScreen from './screens/LoginScreen';
import SignUpScreen from './screens/SignUpScreen';
import AdminDashboard from './screens/AdminDashboardScreen';
import UserDashboard from './screens/UserDashboardScreen';
import OrderCreate from './screens/OrderScreen';

const Stack = createStackNavigator();

function App() {


  return (

    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">

        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="SignUp" component={SignUpScreen} />
        <Stack.Screen name="AdminDashboard" component={AdminDashboard} />
        <Stack.Screen name="UserDashboard" component={UserDashboard} />
        <Stack.Screen name="OrderCreate" component={OrderCreate} />

      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
