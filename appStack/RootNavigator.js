import React, { useContext, useEffect, useState } from 'react';
import { View, ActivityIndicator, Alert } from 'react-native';
import "firebase/auth";
import { AuthenticatedUserContext } from '../AuthProvider/AuthProvider';
import Firebase from '../firebaseConfig';
import AuthContainer from '../screens/authNavigation';
import AppScreens from '../Navigation/Appscreens';
export default function RootNavigator() {
    const auth = Firebase.auth();
    const { user, setUser} = useContext(AuthenticatedUserContext);
    const [isLoading, setIsLoading] = useState(true);
  
    useEffect(() => {
      
      // onAuthStateChanged returns an unsubscriber
      const unsubscribeAuth = auth.onAuthStateChanged(async authenticatedUser => {
        try {
          await (authenticatedUser ? setUser(authenticatedUser) : setUser(null));
          setIsLoading(false);
          
        } catch (error) {
          console.log(error);
        }
      });
      
  
      // unsubscribe auth listener on unmount
      return unsubscribeAuth;
    }, []);
    
 
  
    if (isLoading) {
      return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <ActivityIndicator size='large' />
        </View>
      );
    }
  
    return (
      <>
        {user ? <AppScreens/> : <AuthContainer />}
      </>
    );
  }