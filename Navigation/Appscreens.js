import React from 'react';
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import Tabs from './tabNavigator';
import "firebase/auth";
import "firebase/firestore";
import { AuthenticatedUserContext } from '../AuthProvider/AuthProvider';
import Firebase from '../firebaseConfig';
import { Modal, Text, View,StyleSheet,TouchableOpacity } from 'react-native';
import { COLORS, SIZES } from '../constants/Index';
import { ActivityIndicator, Colors } from 'react-native-paper';

const Stack = createStackNavigator();

const AppScreens = ({navigation}) => {
  const [visible, setvisible] = React.useState(false)
  const { user, AuthUserRole, setAuthUserRole } = React.useContext
  (AuthenticatedUserContext);
  const [submitting, setissubmitting] = React.useState(false);
  const [isLoading, setisloading] = React.useState(false);

  React.useEffect(() =>{

    checkRole();
       },[])

  const checkRole =async()=>{
    setisloading(true)
    try{
      const response =   Firebase.firestore().collection('Deliverly Persons').where('uid', '==', user.uid)
      await response.onSnapshot((querySnapshot) =>{
        querySnapshot.forEach((doc)=>{
          if (doc.exists) {
            setAuthUserRole(doc.data())
            setisloading(false)
          } else {
            setisloading(false)
          }
         
        })
      })
    }
    catch(e){
      console.log(e);
    }       
  } 
 
  
  const acceptOrder = async(key) => {  
    setissubmitting(true)
    
    try{
      await Firebase.firestore()
     
      .collection('Deliverly Persons')
      .doc(key)
      .update({
       Status:'Deliverly Pending'
      }).then(() =>{
        setissubmitting(false)
        alert('updated')
        navigation.navigate('Orders')
    })
        }
        catch(e){
          console.log(e);
        }

  };
    const auth = Firebase.auth();
    const LogOutUser = async function() {
        try {
            await auth.signOut().then(()=>{
            })
          } catch (error) {
            console.log(error);
          }
    }
  function RenderModal(){
    return (
      <View style={styles.container}>
        <Modal animationType="slide" transparent={true} visible={true}>
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Text style={styles.modalText}>Hello {AuthUserRole?.username}! </Text>

              <Text style={styles.textStyle}>You Have Been Assigned A new Order </Text>
              <View style={[styles.centeredView,{flexDirection:'row',justifyContent:'space-between'}]}>
              <TouchableOpacity
                    style={[styles.button, styles.buttonClose]}
                    onPress={() => acceptOrder(AuthUserRole?.key)}
                  >
                      {submitting ?
                      <ActivityIndicator animating={true} color={Colors.blue500} /> 
                   :
                    <Text style={[styles.textStyle,{color:COLORS.blackSecondary}]}> Accept Order</Text>
                      }
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={[styles.button, styles.buttonClose]}
                    onPress={() => setvisible(!visible)}
                  >
                    <Text style={[styles.textStyle,{color:COLORS.blackSecondary}]}> View Order </Text>
                  </TouchableOpacity>
                  </View>

            </View>
          </View>
        </Modal>
      </View>
    );
  } 
  return ( 
    <> 
    {AuthUserRole?.Status == `Assigned`?
    <> 
    {RenderModal()}
    </>
     : 
     <View></View>
     } 
     {AuthUserRole?.role == `Deliverly Person`?  
    
     <NavigationContainer>
        <Tabs/>
   </NavigationContainer>
 
   :
 
   <View style={[styles.centeredView,{backgroundColor:COLORS.backgroundColor,padding:SIZES.padding2}]}>
     <Text style={{color:COLORS.white,alignSelf:'center'}}>Hello {user?.email}. Sorry you are not Authorised to use this application!</Text>
     <TouchableOpacity
     style={styles.btn}
     onPress={()=> LogOutUser()}
     >
       <Text>Log Out</Text>
     </TouchableOpacity>
   </View>
      }
   </>
  )

}
const styles = StyleSheet.create({
 
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalView: {
    width: '90%',
    height: 100,
    backgroundColor: 'white',
    borderRadius: 5,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  textStyle: {
    color: 'black',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
  btn: {
    backgroundColor:Colors.amber800,
    padding:SIZES.padding2,
    borderColor:Colors.grey300,
    borderWidth:2,
    borderRadius:10,
    alignSelf:'center'
  }
});

export default AppScreens
