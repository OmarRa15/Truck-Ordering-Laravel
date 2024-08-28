import * as React from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import LoginScreen from './screens/LoginScreen';
import SignUpScreen from './screens/SignUpScreen';
import AdminOrdersList from './screens/AdminDashboardScreen';
import UserDashboard from './screens/UserDashboardScreen';
import OrderCreate from './screens/OrderScreen';
import OrdersListScreen from './screens/OrdersListScreen';
import OrderDetailsAdmin from './screens/OrderDetailAdmin';
import OrderDetailsUser from './screens/OrderDetailUser';
import NotificationsScreen from './screens/NotificationsScreen';

const Stack = createStackNavigator();

function App() {


  return (

    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">

        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="SignUp" component={SignUpScreen} />
        <Stack.Screen name="AdminDashboard" component={AdminOrdersList} options={{ headerShown: false}} />
        <Stack.Screen name="UserDashboard" component={UserDashboard} options={{ headerShown: false}} />
        <Stack.Screen name="OrderCreate" component={OrderCreate} />
        <Stack.Screen name="OrdersListUser" component={OrdersListScreen} />
        <Stack.Screen name="OrderDetailsAdmin" component={OrderDetailsAdmin} />
        <Stack.Screen name="OrderDetailsUser" component={OrderDetailsUser} />
        <Stack.Screen name="Notifications" component={NotificationsScreen} />


      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
