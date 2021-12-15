import * as React from 'react';
import { StyleSheet, _View,View, TouchableOpacity, ScrollView  } from 'react-native';
import { ActivityIndicator, Avatar, Badge, Banner, Button, Card, Chip, Colors, Divider, Switch, Text, Title, } from 'react-native-paper';
import { AuthenticatedUserContext } from '../AuthProvider/AuthProvider';
import { COLORS, FONTS, SIZES } from '../constants/Index';
import 'firebase/firestore';
import Firebase from '../firebaseConfig';
import { AntDesign, FontAwesome, FontAwesome5, Fontisto, Foundation, MaterialCommunityIcons, MaterialIcons, SimpleLineIcons } from '@expo/vector-icons';

const Home = ({navigation}) => {
    const { user, AuthUserRole} = React.useContext(AuthenticatedUserContext);

  const [isSwitchOn, setIsSwitchOn] = React.useState(false);
  const [submittin, setissubmittin] = React.useState(false);
  const [currentOrder, setcurrentOrder] = React.useState('');

  const onToggleSwitch = async(key) => {  
    setissubmittin(true)
    
    try{
      await Firebase.firestore()
     
      .collection('Deliverly Persons')
      .doc(key)
      .update({
       Status:'Accepting Orders'
      }).then(() =>{
        setissubmittin(false)
        alert('updated')
    })
        }
        catch(e){
          console.log(e);
        }

  };

  console.log(AuthUserRole?.key);

 const handleOrderView = async() =>{
    try{
      const response =   Firebase.firestore().collection('Deliverly Persons').doc(AuthUserRole?.key);
      const data = await response.collection('my Deliveries').where('status',"==", 'Dispatched').get();
      data.docs.forEach(item=>{
        setcurrentOrder(item.data())
        navigation.navigate('viewOrder',{
          item:item.data(),
          id:item.id
        })
      })
    }catch(e){
      console.log(e);
    }
  }
  return (

    <ScrollView style={styles.container}> 
    <View style={[styles.card,{alignSelf:'center',backgroundColor:Colors.grey800}]}>
      <View style={{width:SIZES.width*0.25}}>
      <Avatar.Image
          size={90}
          source={{
            uri: AuthUserRole?.userimage,
          }}
        
        />
      </View>

        <View style={{width:SIZES.width*0.7,paddingHorizontal:15}}>
          <Title style={styles.Text}>welcome! {AuthUserRole?.username}</Title>
          
                <Title style={{color:Colors.grey50}}>Status:{AuthUserRole?.Status}</Title>
                <View style={styles.card1} >

                {AuthUserRole?.Status == `Active` ?
                 <>
                 <Text style={{...FONTS.body3,color:Colors.grey300,width:SIZES.width*0.35}}>Switch ToStart Accepting Orders</Text>
                   {submittin ?
                      <ActivityIndicator animating={true} color={Colors.red800} /> 
                   :
                   <TouchableOpacity
                   style={{backgroundColor:Colors.lightBlue400,paddingHorizontal:15,paddingVertical:10}}
                    onPress={() =>onToggleSwitch(AuthUserRole?.key)}>
                      <Text style={{color:COLORS.white}}>Accept Orders</Text>                       
                   </TouchableOpacity>
                 }
                
                  </>
                :
                <View>
                <Text style={{...FONTS.body3,color:Colors.grey400,width:SIZES.width*0.4}}>Complete Current Order To Accept New Ones</Text>
                </View>
                }             
               

                
            </View>
        </View>       
      </View> 
      {
      (AuthUserRole?.Status !==`Active` && AuthUserRole?.Status !=="Accepting Orders")?
      <View style={{flexDirection:'row',justifyContent:'space-between',padding:SIZES.padding*0.5,width:SIZES.width}}>
            <TouchableOpacity style={[styles.card,{backgroundColor:Colors.lightBlue800,width:SIZES.width*0.48}]}
              onPress={() =>handleOrderView()}
            >
   
            <View style={{paddingHorizontal:10}}>
                <>
                  {
                  (AuthUserRole?.Status !==`Deliverly Pending` && AuthUserRole?.Status !==`Accepting Orders`) ?
                   
               
                  <View style={styles.card1}>
                    <Title style={[styles.Text,{color:Colors.teal50,...FONTS.body4,width:SIZES.width*0.37}]}>You You were Assigned to deliver this order</Title>
                    
                    <Badge style={{backgroundColor:Colors.red800}}>
                      
                      1</Badge>
                  </View>
                  :
                  <View style={styles.card1}>
                  <Title style={[styles.Text,{color:Colors.teal900,width:SIZES.width*0.37}]}>Check this newly Assigned Order Here</Title>
                  <Badge >1</Badge>
                  </View>
                  }
                  </>

                    <View style={[styles.card1,{justifyContent:'space-around'}]} >
                    <Text style={{...FONTS.body3,color:Colors.grey50,width:SIZES.width*0.30}}>Click Here To Check It Out</Text>
                    <AntDesign name="rightcircleo" size={24} color={Colors.grey400} />
                   
                </View>
            </View>       
          </TouchableOpacity> 
          <Divider/>
          <View style={[styles.card,{backgroundColor:Colors.cyan800,width:SIZES.width*0.48}]}
              
            >
   
            <View style={{paddingHorizontal:10}}>
                <>
                  {
                  AuthUserRole?.Status !==`Deliverly Pending` ?
                   
               <>
                  <View style={styles.card1}>
                    <Title style={[styles.Text,{color:Colors.grey50,...FONTS.body4,width:SIZES.width*0.37}]}>Finish Delivering My Current Order</Title>                   
                    <Foundation name="loop" size={28} color="black" />
                  </View>
                  <TouchableOpacity style={[styles.card1,{justifyContent:'space-around'}]} 
                    onPress = {() => navigation.navigate('ordercomplete')}
                    >
                    <Text style={{...FONTS.body3,color:Colors.grey300,width:SIZES.width*0.30}}>Click Here To complete DeliveringYour Order</Text>
                    <FontAwesome name="arrow-circle-o-right" size={28} color="black" />
                    
                    </TouchableOpacity>
                    </>
                  :
                  <View style={styles.card1}>
                    <Text style={{width:SIZES.width*0.30}}>Finish Delivering</Text>                    
                    <ActivityIndicator animating={true} color={Colors.brown700}/> 
                  </View>
                  }
                  </>


            </View>       
          </View>
          </View>
          :
          <View></View>
      }          

      <Divider/>
      <View style={{flexDirection:'row',justifyContent:'space-between',padding:SIZES.padding*0.5}}>
      <TouchableOpacity style={[styles.card,{backgroundColor:Colors.cyan800,width:SIZES.width*0.48}]}
        onPress = {() => navigation.navigate('neworders')}
      >
      
        <View style={{paddingHorizontal:10}}>
          <Title  style={[styles.Text,{color:Colors.grey100,...FONTS.body3}]}>Check New Delivery Requests</Title>
          <View style={styles.card1} >
          <Foundation name="burst-new" size={32} color={Colors.red600} />
          <MaterialIcons name="local-grocery-store" size={30} color={Colors.blue200} />
          </View>
          
                <View style={styles.card1} >
                <Text style={{...FONTS.body4,color:Colors.grey100}}>View More Here</Text>
                <AntDesign name="rightcircleo" size={24} color={Colors.grey400} />
               
            </View>
            
        </View>       
      </TouchableOpacity> 
      <Divider/>
      <TouchableOpacity style={[styles.card,{backgroundColor:Colors.blue600,width:SIZES.width*0.48}]}
        onPress = {() => navigation.navigate('deliverlyhistory')}
        >
   
        <View style={[styles.card1],{paddingHorizontal:5}}>
          <View style={[styles.card1]}>
            <Title style={[styles.Text,{color:Colors.grey200,...FONTS.body3}]}>My Deliverly History </Title>
            <Badge>34</Badge>
          </View>          
          <View style={styles.card1} >
          <MaterialCommunityIcons name="truck-delivery-outline" size={34} color={Colors.grey800} />

          <FontAwesome5 name="shopping-cart" size={24} color={Colors.lightGreen300} />
          </View>
                <View style={styles.card1} >
                <Text style={{...FONTS.body4,color:Colors.grey300}}>View More Here</Text>
                <AntDesign name="rightcircleo" size={24} color={Colors.grey300} />
                
            </View>
        </View>       
      </TouchableOpacity> 
      </View>       
      <Divider/>
      <View style={{flexDirection:'row',justifyContent:'space-between',padding:SIZES.padding*0.5}}>
      <TouchableOpacity style={[styles.card,{backgroundColor:Colors.blue600,width:SIZES.width*0.48}]}
        onPress = {() => navigation.navigate('selfassigned')}
      >
      
        <View style={{paddingHorizontal:10}}>
          <Title  style={[styles.Text,{color:Colors.grey100,...FONTS.body3}]}>Self Assigned Orders </Title>
          <View style={styles.card1} >
          <AntDesign name="eye" size={30} color={Colors.blue200} />
          </View>
          
                <View style={styles.card1} >
                <Text style={{...FONTS.body4,color:Colors.grey100}}>View More Here</Text>
                <AntDesign name="rightcircleo" size={24} color={Colors.grey400} />
               
            </View>
            
        </View>       
      </TouchableOpacity> 
      <Divider/>
      <TouchableOpacity style={[styles.card,{backgroundColor:Colors.cyan800,width:SIZES.width*0.47}]}
        onPress = {() => navigation.navigate('selfassigned')}
        >
   
        <View style={[styles.card1],{paddingHorizontal:5,}}>
          <Title style={styles.Text}>My Account Settings</Title>
          <View style={[styles.card1,{width:SIZES.width*0.46}]} >
            <FontAwesome name="user-circle-o" size={34} color={Colors.indigo700} />
            <View>
              <Text style={{color:Colors.grey300}}>Name:{AuthUserRole?.username}</Text>
              <Text style={{color:Colors.grey300}}>Email:{AuthUserRole?.Email}</Text>
             </View>
          </View>
               
        </View>       
      </TouchableOpacity> 
      </View>       
      
      <TouchableOpacity style={[styles.card,{backgroundColor:COLORS.backgroundColor}]}>
   
   <View style={{width:SIZES.width*0.9,paddingHorizontal:10}}>
   
   </View>       
 </TouchableOpacity>
    </ScrollView>
  )
};
const styles = StyleSheet.create({
  container: {
      flex: 1,
      backgroundColor: COLORS.backgroundColor,
  },
  card:{
    flexDirection:'row',
    paddingTop:SIZES.padding2*1.5,
    justifyContent:'space-around',
    alignItems:'center',
    padding:SIZES.padding2,
    backgroundColor:Colors.grey50,
    borderColor:Colors.cyan900,
    borderWidth:0.9,
    borderRadius:0
  },
  card1:{
    flexDirection:'row',
    paddingVertical:5,
    justifyContent:'space-between',
    alignItems:'center'
  },
  Text:{
    color:Colors.grey100,
    ...FONTS.body2
  }
});

export default Home;