//import liraries
import { AntDesign, Entypo, Ionicons } from '@expo/vector-icons';
import React, { Component,useEffect,useState } from 'react';
import { View, Text, StyleSheet, Image, ScrollView,TouchableOpacity, ActivityIndicator } from 'react-native';
import { COLORS, FONTS, SIZES } from '../constants/Index';
import "firebase/storage";
import 'firebase/firestore';
import * as Linking from 'expo-linking';
import Firebase from '../firebaseConfig';
import { Badge, Colors, Divider } from 'react-native-paper';
import { AuthenticatedUserContext } from '../AuthProvider/AuthProvider';

// create a component
const OrderView = ({route, navigation}) => {
    const { AuthUserRole} = React.useContext(AuthenticatedUserContext);
    const[orderItem, setOrderItem] = useState('');
    const[products, setProducts] = useState([]);
    const[submitting, setisSubmitting] = useState(false);
    useEffect(() => {
        let {item} = route.params;
        setOrderItem(item)
        setProducts(item.orderItems);       
    }, [])

   const handledispatch = async(key) => {
    setisSubmitting(true)
    const orders = orderItem 
    const orderkey = key
    try{
      const orderDb = await Firebase.firestore().collection("CustomerOrder").doc(key);
     const DB = await Firebase.firestore().collection("Deliverly Persons").doc(AuthUserRole?.key);
     const docId = DB.collection("my Deliveries").doc().id
     await DB.collection("my Deliveries").doc(docId).set({
       orders,
       orderkey,
       docId,
       status:`Dispatched to ${AuthUserRole.username}`
     }).then(()=>{
       DB.update({
         Status:"SelfAssigned"
       });
       orderDb.update({
        status:`Dispatched`
       })           
       setisSubmitting(false)
        alert(`data sent`)
        navigation.navigate('selfassigned')
     })
    }catch(e){
      console.log(e);
    }
    }
    function renderOrdersView() {
         return(
             <View >
                <View style={styles.bodycontainer}>
                    <View style={{flexDirection:'row', justifyContent:'space-between'}}>                
                        <View style={styles.ItemsView}>
                            <Text style={[styles.btntext,{...FONTS.body1}]}>Customer Details</Text>
                            <Text style={styles.btntext}>Customer name: {orderItem?.customerName}</Text>
                            <Text style={styles.btntext}>Phone No: {orderItem?.customerPhoneNo}</Text>
                            <Text style={styles.btntext}>Email: {orderItem?.customerEmail}</Text>
                        </View>
                        <TouchableOpacity
                            onPress={() => Linking.openURL(`google.navigation:q=${orderItem.lat}, ${orderItem.lng}`)}
                            style={{alignItems:'center',marginTop:5,width:SIZES.width*0.35}}
                        >
                            <Text style={[styles.btntext,{...FONTS.h3}]}>View Customer Location</Text>
                            <Ionicons name="ios-location-outline" size={39} color="blue" />

                        </TouchableOpacity>
                        
                    </View>
                    
                    <View style={{backgroundColor:COLORS.darkgrey2,paddingVertical:SIZES.padding2*2}}>
                        <Text style={[styles.btntext,{...FONTS.body1}]}>Ordered Items Details</Text>
                        <View style={[styles.centered,{ paddingVertical:10,paddingHorizontal:5}]}>
                            <Text style={[styles.btntext,{...FONTS.h4,width:SIZES.width*0.20}]}>Image</Text>
                            <Text style={[styles.btntext,{...FONTS.h4,width:SIZES.width*0.20}]}>Prod Name</Text>
                            <Text style={[styles.btntext,{...FONTS.h4,width:SIZES.width*0.20}]}>Unit</Text>
                            <Text style={[styles.btntext,{...FONTS.h4,width:SIZES.width*0.21}]}>Total Price</Text>
                        </View>
                        {
                            products?.map((data, index)=>(
                                <View
                                style={[styles.centered,{paddingVertical:10,paddingHorizontal:5}]}
                                key={`orderItems-${index}`}>
                                    <View style={{width:SIZES.width*0.20}}>
                                    <Image
                                        source={{uri: data.image}}
                                        resizeMode='cover'
                                        style={styles.bodyphoto}/>
                                        <Badge style={styles.qty}>{data?.qty}</Badge>
                                    </View>    
                                        <Text style={[styles.btntext,{...FONTS.h4,width:SIZES.width*0.22}]}>{data.name}</Text>
                                        <Text style={[styles.btntext,{...FONTS.h4,width:SIZES.width*0.28}]}>{data.unit} * {data?.qty}</Text>
                                        <Text style={[styles.btntext,{...FONTS.h4,width:SIZES.width*0.20}]}>Ksh {data.total}.00</Text>
                                </View>   
                            ))
                        }
                    </View>
                    <View style={[styles.centered,{paddingVertical:SIZES.padding2}]}>
                        <Text style={[styles.btntext,{...FONTS.h3,width:SIZES.width*0.30}]}>All Items: {orderItem?.basketCount}</Text>
                        <Text style={[styles.btntext,{...FONTS.h3,width:SIZES.width*0.65}]}>Total Payable: Ksh {orderItem?.total}.00</Text>
                    </View>
                    <Divider/>
                    <View style={[styles.centered,{paddingVertical:SIZES.padding2,justifyContent:'space-between'}]}>
                        <Text style={[styles.btntext,{...FONTS.h5,width:SIZES.width*0.45}]}>Shipment Charges Ksh 150.00</Text>
                        <Text style={[styles.btntext,{...FONTS.h4,width:SIZES.width*0.50,backgroundColor:Colors.yellow500, padding:SIZES.padding2}]}>Total + Shipment: Ksh {(orderItem?.total + 150)}.00</Text>
                    </View>
                   
                    {
                       ( orderItem?.status == `New`) ? 
                        <>
                        <Text style={[styles.btntext,{...FONTS.body1}]}>Actions:</Text>
                        <View style={[styles.centered,{paddingHorizontal:SIZES.padding2}]}> 
                        <TouchableOpacity
                        onPress={() => handledispatch(orderItem?.key)}
                         style={styles.btnContinue}
                         
                        >
                              {submitting ?
                           <ActivityIndicator color={COLORS.white} size='large'/>
                           :
                          <Text style={[styles.btntext,{...FONTS.h4,color:COLORS.white}]}>Accept This Order</Text>
                              }
                        </TouchableOpacity>
                      
                        </View>
                        </>
                        :
                        <View></View>
                    }

                </View>
            </View>
        )
    }
    return (
        <View style={styles.container}>
            <ScrollView>
              {renderOrdersView()}
            </ScrollView>
        </View>
    );
};

// define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#2c3e50',
    },
    bodycontainer: {
        width:SIZES.width,
        marginTop:3,
        backgroundColor:COLORS.darkgrey4,
        padding:SIZES.padding*0.2,
        justifyContent:'space-between',

    },
    ItemsView:{
        width:SIZES.width*0.6
    },
    btnContinue:{
        backgroundColor:COLORS.primary,
        borderWidth:2,
        borderColor:'#fff',
        paddingVertical:SIZES.padding2*0.5,
        paddingHorizontal:SIZES.padding2,
        alignItems:'center', 
        justifyContent:'center',
        borderRadius: 10 
    },
    btntext:{
        color:COLORS.darkblue,
        fontWeight:'bold',
        paddingVertical:4,
        ...FONTS.h4,

    },
    centered:{
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'space-between'
    },
    bodyphoto: {
        width:SIZES.width*0.16,
        height:45,
        borderRadius:15

    }, 
    qty: {
        backgroundColor:"rgb(200,35,150)",
        paddingHorizontal:10,
        color:COLORS.white,
        ...FONTS.body3,
        position:'absolute',
        top:-5,
        left:40
    },
    orderStatus:{
        flexDirection:'column',
        alignItems:'center'
    }
});

//make this component available to the app
export default OrderView;
