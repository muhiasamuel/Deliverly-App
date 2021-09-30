//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import "firebase/auth"
import 'firebase/firestore';
import Firebase from '../firebaseConfig';
// create a component
const MyAccount = () => {
    const auth = Firebase.auth();
    const LogOutUser = async function() {
        try {
            await auth.signOut().then(()=>{
            })
          } catch (error) {
            console.log(error);
          }
    }
    return (
        <View style={styles.container}>
            <TouchableOpacity 
                onPress={() =>LogOutUser()}
            >
                <Text>Out</Text>
            </TouchableOpacity>
        </View>
    );
};

// define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#2c3e50',
    },
});

//make this component available to the app
export default MyAccount;
