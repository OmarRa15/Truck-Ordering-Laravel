import * as React from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LogoutButton from './screens/LogoutButton';

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
      <Stack.Navigator initialRouteName="Login" screenOptions={{headerTitleStyle:{fontSize:15}}}>

        <Stack.Screen name="Login" component={LoginScreen} options={{title:"Login"}}/>
        <Stack.Screen name="SignUp" component={SignUpScreen} />
        <Stack.Screen name="AdminDashboard" component={AdminOrdersList} options={{ headerRight: () => (
              <LogoutButton />
              ), title:"Admin Dashboard"}} />
        <Stack.Screen name="UserDashboard" component={UserDashboard} options={{ headerRight: () => (
              <LogoutButton />
              ), title:"Dashboard"}} />
        <Stack.Screen name="OrderCreate" component={OrderCreate} options={{ headerRight: () => (
              <LogoutButton />
              ), title:"Create an Order"}}/>
        <Stack.Screen name="OrdersListUser" component={OrdersListScreen} options={{ headerRight: () => (
              <LogoutButton />
              ),title:"Your Orders"}} />
        <Stack.Screen name="OrderDetailsAdmin" component={OrderDetailsAdmin} options={{ headerRight: () => (
              <LogoutButton />
              ),title:"Order Detail"}} />
        <Stack.Screen name="OrderDetailsUser" component={OrderDetailsUser} options={{ headerRight: () => (
              <LogoutButton />
              ),title:"Order Detail"}} />
        <Stack.Screen name="Notifications" component={NotificationsScreen} options={{ headerRight: () => (
              <LogoutButton />
              ),}} />


      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
