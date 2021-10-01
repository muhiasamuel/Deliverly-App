import * as React from 'react';
import { StyleSheet, _View,View, TouchableOpacity, ScrollView  } from 'react-native';
import { ActivityIndicator, Avatar, Banner, Button, Card, Chip, Colors, Divider, Switch, Text, Title, } from 'react-native-paper';
import { AuthenticatedUserContext } from '../AuthProvider/AuthProvider';
import { COLORS, FONTS, SIZES } from '../constants/Index';
import 'firebase/firestore';
import Firebase from '../firebaseConfig';

const Home = ({navigation}) => {
    const { user, AuthUserRole} = React.useContext(AuthenticatedUserContext);

  const [isSwitchOn, setIsSwitchOn] = React.useState(false);
  const [submittin, setissubmittin] = React.useState(false);

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
    <View style={styles.card}>
      <Avatar.Image
          size={74}
          source={{
            uri: AuthUserRole?.userimage,
          }}
        
        />
        <View style={{width:SIZES.width*0.75,paddingHorizontal:15}}>
          <Title style={styles.Text}>welcome! {AuthUserRole?.username}</Title>
          
                <Title>Status:{AuthUserRole?.Status}</Title>
                <View style={styles.card1} >

                {AuthUserRole?.Status == `Active` ?
                 <>
                 <Text style={{...FONTS.body3,color:Colors.grey300,width:SIZES.width*0.4}}>Switch ToStart Accepting Orders</Text>
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
                <Text style={{...FONTS.body3,color:Colors.grey300,width:SIZES.width*0.4}}>Complete Current Order To Accept New Ones</Text>
                </View>
                }             
               

                
            </View>
        </View>       
      </View> 
      {AuthUserRole.Status ==`Deliverly Pending`?
      <>
            <TouchableOpacity style={[styles.card,{backgroundColor:Colors.blue500}]}
              onPress={() =>handleOrderView()}
            >
   
            <View style={{width:SIZES.width*0.9,paddingHorizontal:10}}>
              <Title style={styles.Text}>Check this new Assigned Order</Title>
              
                    <Title>Status:{AuthUserRole?.Status}</Title>
                    <View style={styles.card1} >
                    <Text style={{...FONTS.body3,color:Colors.grey400}}>Click Here</Text>
                   
                </View>
            </View>       
          </TouchableOpacity> 
          <Divider/>
          </>
          :
          <View></View>
      }          

      <Divider/>
      <TouchableOpacity style={[styles.card,{backgroundColor:Colors.orange800}]}>
   
        <View style={{width:SIZES.width*0.9,paddingHorizontal:10}}>
          <Title style={styles.Text}>Check available Orders in Your Store</Title>
          
                <Title>Status:{AuthUserRole?.Status}</Title>
                <View style={styles.card1} >
                <Text style={{...FONTS.body3,color:Colors.grey400}}>Switch ToStart Accepting Orders</Text>
               
            </View>
        </View>       
      </TouchableOpacity> 
      <Divider/>
      <TouchableOpacity style={[styles.card,{backgroundColor:Colors.orange700}]}>
   
        <View style={{width:SIZES.width*0.9,paddingHorizontal:10}}>
          <Title style={styles.Text}>Check My Deliverly History </Title>
          
                <Title>Status:{AuthUserRole?.Status}</Title>
                <View style={styles.card1} >
                <Text style={{...FONTS.body3,color:Colors.grey400}}>Switch ToStart Accepting Orders</Text>
                
            </View>
        </View>       
      </TouchableOpacity>        
      <Divider/>
      <TouchableOpacity style={[styles.card,{backgroundColor:Colors.orange500}]}>
   
        <View style={{width:SIZES.width*0.9,paddingHorizontal:10}}>
          <Title style={styles.Text}>My Account </Title>
          
                <Title>Status:{AuthUserRole?.Status}</Title>
                <View style={styles.card1} >
                <Text style={{...FONTS.body3,color:Colors.grey400}}>Switch ToStart Accepting Orders</Text>
                
            </View>
        </View>       
      </TouchableOpacity> 
      <Divider/>
      <TouchableOpacity style={[styles.card,{backgroundColor:Colors.orange400}]}>
   
   <View style={{width:SIZES.width*0.9,paddingHorizontal:10}}>
     <Title style={styles.Text}>My Account </Title>
     
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
    backgroundColor:Colors.deepOrange800
  },
  card1:{
    flexDirection:'row',
    paddingVertical:5,
    justifyContent:'space-around',
    alignItems:'center'
  },
  Text:{
    color:Colors.white,
    ...FONTS.body2
  }
});

export default Home;