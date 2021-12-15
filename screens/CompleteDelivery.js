//import liraries
import React, { Component,useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import "firebase/storage";
import 'firebase/firestore';

// create a component
const DeliverlyComplete = () => {
    const [pickedImagePath, setPickedImagePath] = useState('');
    return (
        <View style={styles.container}>
            <Text>MyAccount</Text>
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
export default DeliverlyComplete;
