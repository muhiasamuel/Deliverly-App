//import liraries
import React, { Component,useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Image } from 'react-native';
import "firebase/storage";
import 'firebase/firestore';
import * as Linking from 'expo-linking';
import Firebase from '../firebaseConfig';
import { COLORS, FONTS, SIZES } from '../constants/Index';
import { AuthenticatedUserContext } from '../AuthProvider/AuthProvider';
import { Entypo, Ionicons, AntDesign } from '@expo/vector-icons';
import { Badge, Colors, Divider , ActivityIndicator} from 'react-native-paper';

// create a component
const myDeliverlyHistory = ({navigation}) => {
    const { AuthUserRole} = React.useContext(AuthenticatedUserContext);
    const [Orders, setOrders] = React.useState('');
    const[submitting, setisSubmitting] = useState(false);
    const[isloading, setisloading] = useState(false);
    const[deliver, setDeliver] = useState(false);

    React.useEffect(() =>{
      handleOrderView();
    },[])
    const handledeliver = async(item) => {
      try{
        setisSubmitting(true)
        const DB = await Firebase.firestore().collection("Deliverly Persons").doc(AuthUserRole?.key);
        const Assignedorder = await DB.collection("my Deliveries").doc(item?.key)
        DB.update({
            Status:`delivering ${item?.customerName} order`
        }).then(() =>{             
            setisSubmitting(false)
            setDeliver(!deliver);
            alert('updated')
        })
    }catch(e){
        console.log(e);
    }
  }

        const handleConpletedelivery= async(item)=>{
          setisSubmitting(true)
          try{
            const orderDb = await Firebase.firestore().collection("CustomerOrder").doc(item?.orderkey);
          const DB = await Firebase.firestore().collection("Deliverly Persons").doc(AuthUserRole?.key);
          const Assignedorder = await DB.collection("my Deliveries").doc(item.docId)
          Assignedorder.update({
            status:`Complete`
          }).then(()=>{
            DB.update({
              Status:"Active"
            });
            orderDb.update({
              status:`Complete`
            })           
            setisSubmitting(false)
              alert(`Order Completed`)
              navigation.navigate('adminHome')
          })
          }catch(e){
            console.log(e);
          }
      }
          
 const handleOrderView = async() =>{
    try{
      setisloading(true);
      const dataArr = []; 
      const response =   Firebase.firestore().collection('Deliverly Persons').doc(AuthUserRole?.key);
      const data = await response.collection("my Deliveries")
      .where( 'status',"==", `Dispatched to ${AuthUserRole.username}`).get();
      data.docs.forEach(doc=>{
        const {orders,status,orderkey, geohash,docId} = doc.data();
        dataArr.push({
          key: doc.id,
          geohash,
          customerId:orders.id,
          docId,
          orderkey,
          status,
          customerName:orders.customerName,
          total:orders.total,
          customerPhoneNo:orders.customerPhoneNo,
          orderItems:orders.orderItems,
          basketCount:orders.BasketCount,
          lat:orders.lat,
          lng:orders.lng,
        })
         setOrders(dataArr)
         setisloading(false)
      })
    }catch(e){
      console.log(e);
    }
  }
  console.log(Orders);
  function renderCats() {    
    const renderOrders = ({ item }) => (

      <View >
      <View style={styles.bodycontainer}>
          <View style={{flexDirection:'row', justifyContent:'space-between'}}>                
              <View style={styles.ItemsView}>
                  <Text style={[styles.btntext,{...FONTS.body1}]}>Customer Details</Text>
                  <Text style={styles.btntext}>Customer name: {item?.customerName}</Text>
                  <Text style={styles.btntext}>Phone No: {item?.customerPhoneNo}</Text>
                  <Text style={styles.btntext}>Email: {item?.customerEmail}</Text>
              </View>
              <TouchableOpacity
                  onPress={() => Linking.openURL(`google.navigation:q=${item.lat}, ${item.lng}`)}
                  style={{alignItems:'center',marginTop:5,width:SIZES.width*0.35}}
              >
                  <Text style={[styles.btntext,{...FONTS.h3}]}>View Customer Location</Text>
                  <Ionicons name="ios-location-outline" size={39} color="blue" />

              </TouchableOpacity>
              
          </View>
          
          <View style={{backgroundColor:COLORS.darkgrey2,paddingVertical:SIZES.padding2*2,paddingHorizontal:5}}>
              <Text style={[styles.btntext,{...FONTS.body1}]}>Ordered Items Details</Text>
              <View style={[styles.centered,{ paddingVertical:10,paddingHorizontal:5}]}>
                  <Text style={[styles.btntext,{...FONTS.h4,width:SIZES.width*0.20}]}>Image</Text>
                  <Text style={[styles.btntext,{...FONTS.h4,width:SIZES.width*0.20}]}>Prod Name</Text>
                  <Text style={[styles.btntext,{...FONTS.h4,width:SIZES.width*0.20}]}>Unit</Text>
                  <Text style={[styles.btntext,{...FONTS.h4,width:SIZES.width*0.21}]}>Total Price</Text>
              </View>
              {
                 item?.orderItems.map((data, index)=>(
                      <View
                      style={[styles.centered,{paddingVertical:10,paddingHorizontal:5}]}
                      key={index}>
                          <View style={{width:SIZES.width*0.20}}>
                          <Image
                              source={{uri: data.image}}
                              resizeMode='cover'
                              style={styles.bodyphoto}/>
                              <Text style={styles.qty}>{data?.qty}</Text>
                          </View>    
                              <Text style={[styles.btntext,{...FONTS.h4,width:SIZES.width*0.22}]}>{data.name}</Text>
                              <Text style={[styles.btntext,{...FONTS.h4,width:SIZES.width*0.28}]}>{data.unit} * {data?.qty}</Text>
                              <Text style={[styles.btntext,{...FONTS.h4,width:SIZES.width*0.20}]}>Ksh {data.total}.00</Text>
                      </View>   
                  ))
              }
          </View>
          <View style={[styles.centered,{paddingVertical:SIZES.padding2}]}>
              <Text style={[styles.btntext,{...FONTS.h3,width:SIZES.width*0.30}]}>All Items: {item?.basketCount}</Text>
              <Text style={[styles.btntext,{...FONTS.h3,width:SIZES.width*0.65}]}>Total Payable: Ksh {item?.total}.00</Text>
          </View>
          <Divider/>
            <View style={[styles.centered,{paddingVertical:SIZES.padding2,justifyContent:'space-between'}]}>
                <Text style={[styles.btntext,{...FONTS.h5,width:SIZES.width*0.45}]}>Shipment Charges Ksh 150.00</Text>
                <Text style={[styles.btntext,{...FONTS.h4,width:SIZES.width*0.50,backgroundColor:Colors.yellow500, padding:SIZES.padding2}]}>Total + Shipment: Ksh {(item?.total + 150)}.00</Text>
            </View>
          <Text style={[styles.btntext,{...FONTS.body1}]}>Order Status:</Text>
          <View style={[styles.centered,{paddingHorizontal:SIZES.padding2}]}> 
              <View style={styles.orderStatus}>
                  <Text style={[styles.btntext,{...FONTS.h4}]}>New</Text> 
                  {
                    item?.status ==`New` ? 
                    <AntDesign name="checkcircleo" size={29} color='rgb(15,105,245)'/>
                    :
                    <Entypo name="circle" size={29} color={COLORS.green}/>

                  }
              </View>
              <View style={styles.orderStatus}>
                  <Text style={[styles.btntext,{...FONTS.h4}]}>Dispatched</Text>
                  {
                    item?.status ==`Dispatched` || item?.status ==`Dispatched to ${AuthUserRole.username}` ? 
                    <AntDesign name="checkcircleo" size={29} color='rgb(15,105,245)'/>
                    :
                    <Entypo name="circle" size={29} color='rgb(15,105,245)'/>

                  }
              </View>
              <View style={styles.orderStatus}>
                  <Text style={[styles.btntext,{...FONTS.h4}]}>Complete</Text>
                  {
                    item?.status ==`Complete` ? 
                    <AntDesign name="checkcircleo" size={29} color={Colors.cyan900}/>
                    :
                    <Entypo name="circle" size={29} color={Colors.cyan900}/>

                  }
              </View>  
               
          </View>
          {deliver == false? 
          <>
          <Text style={[styles.btntext,{...FONTS.body1}]}>Actions:</Text>
          <Text style={[styles.btntext,{...FONTS.body5}]}>Click this button only if you have picked all items above from the store. ENSURE YOU TRIPPLE CHECK (CORRECT ITEMS AND QUANTITY). IMPORTANT!!:</Text>

          <View style={[styles.centered,{paddingHorizontal:SIZES.padding2,alignSelf:'center'}]}> 
          
          <TouchableOpacity
          onPress={() => handledeliver(item)}
           style={styles.btnContinue}
           
          >
            {
              submitting ? 
              <ActivityIndicator size='large' color={Colors.purple100} />
                  :
                <Text style={[styles.btntext,{...FONTS.h4,color:COLORS.white}]}>Deliver</Text>
            }
           
        
            
          </TouchableOpacity>
          
          </View>
          </>
          :
          <Text></Text>
              }
     
      <Divider/>
      {
               deliver == true?  
                <>
                <Text style={[styles.btntext,{...FONTS.body1}]}>Actions:</Text>
                <Text style={[styles.btntext,{...FONTS.body5}]}>Click this button only if you DELIVERED THIS ORDER. CONFIRM CUSTOMER PAYMENT <Text style={{...FONTS.body2}}>( Ksh {item?.total + 150}.00)</Text> FIRST AND THEN PRESS THIS BUTTON IMPORTANT!!:</Text>

                <View style={[styles.centered,{paddingHorizontal:SIZES.padding2,alignSelf:'center'}]}> 
                
                <TouchableOpacity
                onPress={() => handleConpletedelivery(item)}
                 style={[styles.btnContinue,{backgroundColor:Colors.lightBlue600}]}
                 
                >
                     {
                        submitting ? 
                        <ActivityIndicator size='small' color={Colors.purple100} />:
                          <Text style={[styles.btntext,{...FONTS.h4,color:COLORS.white}]}>Complete Delivery</Text>
                        }
                 
                 
                  
                </TouchableOpacity>
                
                </View>
                </>
                :
                <Text></Text>
                  }
                   </View>
  </View>
     
    )
    return(
      <FlatList
        vertical
        showsVerticalScrollIndicator={false}
        data={Orders}
        renderItem={renderOrders}
        keyExtractor={item => `${item.key}`}
        contentContainerStyle={{
          paddingBottom:220,
        }}
      />
    )}
    return (
        <View style={styles.container}>
               
        {isloading ?
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', top:40 }}>
          <ActivityIndicator size='large' color={Colors.purple100} />
        </View>:
        <View></View>
        }
            {renderCats()}
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
    marginTop:10,
    backgroundColor:COLORS.darkgrey4,
    padding:SIZES.padding*0.8,
    justifyContent:'space-between'

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
    borderRadius:100,
    paddingHorizontal:10,
    color:COLORS.white,
    ...FONTS.body3,
    paddingVertical:5,
    position:'absolute',
    top:-10,
    left:50
},
orderStatus:{
    flexDirection:'column',
    alignItems:'center'
}
});

//make this component available to the app
export default myDeliverlyHistory;
