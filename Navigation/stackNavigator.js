// ./navigation/StackNavigator.js

import React from "react";
import { createStackNavigator } from '@react-navigation/stack'
import { AssignedOrder, Home, MyAccount, Orders } from "../screens";
import { COLORS } from "../constants/Index";

const Stack = createStackNavigator();

const screenOptionStyle = {
        headerShown:true,
  headerStyle: {
    backgroundColor: COLORS.darkblue,
  },
  headerTintColor: "white",
  headerBackTitle: "Back",
};

const MainStackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={screenOptionStyle}>
      <Stack.Screen options={{title: 'Home'}} name="adminHome" component={Home} />
      <Stack.Screen options={{title: 'Current Assigned Order'}} name="viewOrder" component={AssignedOrder} />
    </Stack.Navigator>
  );
}

const OrdersStackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={screenOptionStyle}>
       <Stack.Screen name="Orders" component={Orders} options={{
        title: "Orders",
      }}/>       
    </Stack.Navigator>
  );  
}

const AccountStackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={screenOptionStyle}>
       <Stack.Screen name="myaccount" component={MyAccount} options={{
        title: "My Account",
      }}/>       
    </Stack.Navigator>
  );  
}
export { MainStackNavigator, OrdersStackNavigator, AccountStackNavigator};