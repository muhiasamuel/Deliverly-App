import React from 'react';
import { createStackNavigator } from '@react-navigation/stack'
import { LogBox,  StatusBar,  StyleSheet, Text, View } from 'react-native'
import { AuthenticatedUserProvider } from './AuthProvider/AuthProvider';
import RootNavigator from './appStack/RootNavigator';
import {  DarkTheme as PaperDarkTheme, DefaultTheme, Provider as PaperProvider,Colors } from 'react-native-paper';
const App = () => {
     const theme = {
          ...DefaultTheme,
          roundness: 2,
          mode:'adaptive',
          colors: {
            ...DefaultTheme.colors,
            primary: '#3498db',
            accent: '#f1c40f',
            text:Colors.teal600,
            background:Colors.amber100
          },
        };
     
 return ( 
     <PaperProvider theme={theme}>
      <AuthenticatedUserProvider>
           <StatusBar style = 'dark' />
           <RootNavigator/>
      </AuthenticatedUserProvider>
      </PaperProvider>
  )

}

export default App
