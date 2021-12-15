// ./navigation/StackNavigator.js

import React from "react";
import { createStackNavigator } from '@react-navigation/stack'
import { AssignedOrder, CompleteDeliverly, Home, MyAccount, MyDeliverlyHistory, Neworders, Orders, OrderView, SelfAssigned } from "../screens";
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
      <Stack.Screen options={{title: 'Finish Current Deliverly'}} name="ordercomplete" component={CompleteDeliverly} />
      <Stack.Screen options={{title: 'Deliverly History'}} name="deliverlyhistory" component={MyDeliverlyHistory} />
      <Stack.Screen options={{title: 'NewOrders'}} name="neworders" component={Neworders} />
      <Stack.Screen options={{title: 'OrderView'}} name="orderview" component={OrderView} />
      <Stack.Screen options={{title: 'Self Assigned Orders'}} name="selfassigned" component={SelfAssigned} />
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