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
          item:item.data()
        })
        console.log(item.data());
      })
    }catch(e){
      console.log(e);
    }
  }
  return (

    <ScrollView style={styles.container}> 
    <View style={[styles.card,{alignSelf:'center'}]}>
      <View style={{width:SIZES.width*0.25}}>
      <Avatar.Image
          size={90}
          source={{
            uri: AuthUserRole?.userimage,
          }}
        
        />
      </View>

        <View style={{width:SIZES.width*0.75,paddingHorizontal:15}}>
          <Title style={styles.Text}>welcome! {AuthUserRole?.username}</Title>
          
                <Title style={{color:Colors.teal700}}>Status:{AuthUserRole?.Status}</Title>
                <View style={styles.card1} >

                {AuthUserRole?.Status == `Active` ?
                 <>
                 <Text style={{...FONTS.body3,color:Colors.grey900,width:SIZES.width*0.4}}>Switch ToStart Accepting Orders</Text>
                   {submittin ?
                      <ActivityIndicator animating={true} color={Colors.red800} /> 
                   :
                   <Button icon="switch" mode="contained" onPress={() =>onToggleSwitch(AuthUserRole?.key)}>
                     Press me
                   </Button>
                 }
                
                  </>
                :
                <View>
                <Text style={{...FONTS.body3,color:Colors.grey700,width:SIZES.width*0.4}}>Complete Current Order To Accept New Ones</Text>
                </View>
                }             
               

                
            </View>
        </View>       
      </View> 
      {
      (AuthUserRole?.Status !==`Active` && AuthUserRole?.Status !=="Accepting Orders")?
      <View style={{flexDirection:'row',justifyContent:'space-between',padding:SIZES.padding*0.5,width:SIZES.width*0.99}}>
            <TouchableOpacity style={[styles.card,{backgroundColor:Colors.grey200,width:SIZES.width*0.47}]}
              onPress={() =>handleOrderView()}
            >
   
            <View style={{paddingHorizontal:10}}>
                <>
                  {
                  (AuthUserRole?.Status !==`Deliverly Pending` && AuthUserRole?.Status !==`Accepting Orders`) ?
                   
               
                  <View style={styles.card1}>
                    <Title style={[styles.Text,{color:Colors.teal900,...FONTS.body4,width:SIZES.width*0.37}]}>You are Now Commited To delivering this order</Title>
                    
                    <Badge style={{backgroundColor:Colors.cyan600}}>1</Badge>
                  </View>
                  :
                  <View style={styles.card1}>
                  <Title style={[styles.Text,{color:Colors.teal900,width:SIZES.width*0.37}]}>Check this newly Assigned Order Here</Title>
                  <Badge >1</Badge>
                  </View>
                  }
                  </>

                    <View style={[styles.card1,{justifyContent:'space-around'}]} >
                    <Text style={{...FONTS.body3,color:Colors.grey900,width:SIZES.width*0.30}}>Click Here To Check It Out</Text>
                    <AntDesign name="rightcircleo" size={34} color="black" />
                   
                </View>
            </View>       
          </TouchableOpacity> 
          <Divider/>
          <View style={[styles.card,{backgroundColor:Colors.grey200,width:SIZES.width*0.47}]}
              
            >
   
            <View style={{paddingHorizontal:10}}>
                <>
                  {
                  AuthUserRole?.Status !==`Deliverly Pending` ?
                   
               <>
                  <View style={styles.card1}>
                    <Title style={[styles.Text,{color:Colors.teal900,...FONTS.body4,width:SIZES.width*0.37}]}>Finish Delivering My Current Order</Title>                   
                    <Foundation name="loop" size={28} color="black" />
                  </View>
                  <TouchableOpacity style={[styles.card1,{justifyContent:'space-around'}]} 
                    onPress={() =>handleOrderView()}
                    >
                    <Text style={{...FONTS.body3,color:Colors.grey900,width:SIZES.width*0.30}}>Click Here To complete DeliveringYour Order</Text>
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
      <TouchableOpacity style={[styles.card,{backgroundColor:Colors.grey200,width:SIZES.width*0.47}]}>
      
        <View style={{paddingHorizontal:10}}>
          <Title  style={[styles.Text,{color:COLORS.darkblue,...FONTS.body3}]}> Available Orders in my Store</Title>
          <View style={styles.card1} >
          <Foundation name="burst-new" size={32} color={Colors.red900} />
          <MaterialIcons name="local-grocery-store" size={30} color={Colors.blue700} />
          </View>
          
                <View style={styles.card1} >
                <Text style={{...FONTS.body4,color:Colors.grey700}}>View More Here</Text>
                <AntDesign name="rightcircleo" size={24} color="black" />
               
            </View>
            
        </View>       
      </TouchableOpacity> 
      <Divider/>
      <TouchableOpacity style={[styles.card,{backgroundColor:Colors.grey200,width:SIZES.width*0.47}]}>
   
        <View style={[styles.card1],{paddingHorizontal:5}}>
          <View style={[styles.card1]}>
            <Title style={[styles.Text,{color:COLORS.darkblue,...FONTS.body3}]}>My Deliverly History </Title>
            <Badge>34</Badge>
          </View>          
          <View style={styles.card1} >
          <MaterialCommunityIcons name="truck-delivery-outline" size={34} color="black" />

          <FontAwesome5 name="shopping-cart" size={24} color="green" />
          </View>
                <View style={styles.card1} >
                <Text style={{...FONTS.body4,color:Colors.grey700}}>View More Here</Text>
                <AntDesign name="rightcircleo" size={24} color="black" />
                
            </View>
        </View>       
      </TouchableOpacity> 
      </View>       
      <Divider/>
      <TouchableOpacity style={[styles.card,{backgroundColor:Colors.grey50,alignSelf:'center'}]}>
   
        <View style={{width:SIZES.width*0.9,paddingHorizontal:10}}>
          <Title style={styles.Text}>My Account Settings</Title>
          <View style={styles.card1} >
            <FontAwesome name="user-circle-o" size={34} color="black" />
            <View>
              <Text>Name:{AuthUserRole?.username}</Text>
              <Text>Email:{AuthUserRole?.Email}</Text>
             </View>
            <Fontisto name="player-settings" size={34} color="black" />
          </View>
                <View style={styles.card1} >
                <Text style={{...FONTS.body3,color:Colors.grey600}}>continue here to view or update my account</Text>
                <AntDesign name="rightcircleo" size={24} color="black" />
            </View>
        </View>       
      </TouchableOpacity> 
      <Divider/>
      <TouchableOpacity style={[styles.card,{backgroundColor:Colors.grey200}]}>
   
   <View style={{width:SIZES.width*0.9,paddingHorizontal:10}}>
     <Title style={styles.Text}>Finish Current Order Deliverly</Title>
     
           <Title>Status:{AuthUserRole?.Status}</Title>
           <View style={styles.card1} >
           <Text style={{...FONTS.body3,color:Colors.grey400}}>Switch ToStart Accepting Orders</Text>
           
       </View>
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
    borderColor:Colors.cyan500,
    borderWidth:1,
    borderRadius:10
  },
  card1:{
    flexDirection:'row',
    paddingVertical:5,
    justifyContent:'space-between',
    alignItems:'center'
  },
  Text:{
    color:Colors.grey700,
    ...FONTS.body2
  }
});

export default Home;