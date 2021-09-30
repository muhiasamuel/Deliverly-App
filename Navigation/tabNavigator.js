import React from 'react'
import {  TouchableOpacity, View } from 'react-native'
import { createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import { AntDesign, FontAwesome, FontAwesome5, Fontisto, MaterialCommunityIcons } from '@expo/vector-icons'
import Svg, {Path, Circle, Rect } from 'react-native-svg';
import { AccountStackNavigator, MainStackNavigator, OrdersStackNavigator } from './stackNavigator';
import { COLORS } from '../constants/Index';


const Tab = createBottomTabNavigator();

const TabBarCustomButton = ({ accessibilityState, children,onPress}) =>{
    var isSelected = accessibilityState.selected
    if (isSelected) {
        return(
         <View style={{flex: 1, alignItems:'center'}}>
             <View style={{flexDirection:'row', position: 'absolute', top:0}}>
                 <View style={{flex:1, backgroundColor:COLORS.backgroundColor1}}></View>
                <Svg height={80} width={80} viewBox="0 0 75 50">
                    <Path 
                        d="M75.2 0v61H0V0c4.1 0 7.4 3.1 7.9 7.1C10 21.7 22.5 33 37.7 33c15.2 0 27.7-11.3 29.7-25.9.5-4 3.9-7.1 7.9-7.1h-.1z"
                        fill={COLORS.backgroundColor1}
                    />
                </Svg>
                <View style= {{flex:1, backgroundColor: COLORS.backgroundColor1}}></View>
             </View>
                 <TouchableOpacity
                    style={{
                        top:-22.5,
                        justifyContent:'center',
                        alignItems:'center',
                        width:50,
                        height:50,
                        borderRadius:25,
                        backgroundColor:COLORS.white
                    }} 
                    onPress={onPress}>
                     {children}   
                  </TouchableOpacity>  
      
         </View>  
       )
        
    } else{
        return(
            <TouchableOpacity
            style={{
                flex:1,
                height:60,
                backgroundColor:COLORS.backgroundColor1
            }}
            activeOpacity={1} 
            onPress={onPress}>
             {children}   
          </TouchableOpacity>  
        )
    }
}
const tabs = () => { 
    return (
       <Tab.Navigator
        screenOptions={{
            showLabel: false,
            style: {
                borderTopWidth: 0,
                backgroundColor:COLORS.transparent,
                elevation:0
            }
        }}
       >
           <Tab.Screen
           name="Home"
           component={MainStackNavigator}
           options={{
            headerShown:false,
               tabBarIcon: ({focused}) =>(
                 <MaterialCommunityIcons name ="home-circle" size={28} color ={focused ?COLORS.primary: COLORS.darkgrey4 }/>
               ),
               tabBarButton: (props) => (
                   <TabBarCustomButton
                     {...props}
                   />
               )
           }}/>
     
               <Tab.Screen
           name="Favorites"
           component={OrdersStackNavigator}
           options={{
            headerShown:false,
               tabBarIcon: ({focused}) =>(
                 <FontAwesome name = "heart" size={25} color ={focused ?COLORS.primary: COLORS.darkgrey4 }/>
               ),
               tabBarButton: (props) => (
                <TabBarCustomButton
                  {...props}
                />
            )
           }}/>
               <Tab.Screen
           name="user"
           component={AccountStackNavigator}
           options={{
               headerShown:false,
               tabBarIcon: ({focused}) =>(
                 <AntDesign name = "user" size={25} color ={focused ?COLORS.primary: COLORS.darkgrey4 }/>
               ),
               tabBarButton: (props) => (
                <TabBarCustomButton
                  {...props}
                />
            )
           }}/>
       </Tab.Navigator> 
    )
}

export default tabs
