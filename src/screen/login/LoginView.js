import { widthPercentageToDP as wp, heightPercentageToDP as hp }
  from 'react-native-responsive-screen';
import React, { useState, useEffect } from 'react';
import {
  StyleSheet, Text, StatusBar, View, Image, TextInput, TouchableOpacity, Alert} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { setName, setPassword } from '../../redux/actions';
import PushNotification from "react-native-push-notification";


import AsyncStorage from '@react-native-async-storage/async-storage'
const LoginView = ({navigation}) => {

  const {name, password}=useSelector(state=>state.userReducer);
  const dispatch = useDispatch();
  // const [name, setName] = useState('');

  useEffect(() => {
   getData();
   createChannels();

  }, []);



  const getData = () => {
    try{
      AsyncStorage.getItem('UserName')
      .then(value => {
        if (value != null) {
          navigation.navigate('home');
        }
      })
    }
    catch(error){
      console.log(error);
    }
  }


  const createChannels = () => {
    PushNotification.createChannel(
      {
        channelId: "test-channel",
        channelName: "Test Channel"
      }
    )
  }
  
 
  // const [password, setPassword] = useState('');
  const setData = async () =>{
    if (name.length == 0 || password.length == 0){
      Alert.alert('Please provide your name')
    }
    else{
      try{
        dispatch(setName(name));
        dispatch(setPassword(password));
        await AsyncStorage.setItem('UserName', name);
        navigation.navigate('home');
      }
      catch(error){
        console.log(error);

      }
    }
  }
  
  
  return (
    
    <View style={styles.sectionContainer}>
      <StatusBar style="auto" />
      <Image style={{ resizeMode: 'contain', height: '25%' }} source={require('../../../assets/image/leafff.png')} />
      <View style={{width:'100%'}}>
    
          <TextInput
            style={styles.input}
            placeholder='Username'
            onChangeText={(value) => dispatch(setName(value))}
            
          />

          <TextInput
            style={styles.input}
            placeholder="Password"
            onChangeText={(value) => dispatch(setPassword(value))}
            
          />
      </View>
      <View style={{ flexDirection: 'row', alignItems: 'flex-end', justifyContent: 'flex-end', width: '87%' }}>
        <Text style={styles.forgot_button} onPress={() => alert('Sending rest link')}>Forgot Password?</Text>
      </View>
      <TouchableOpacity
        style={styles.button} onPress={()=>{setData()}}>
        <Text style={{ fontSize: 18, color: '#fff', fontWeight: 'bold' }}>LOGIN</Text>
      </TouchableOpacity>

      <Text style={styles.buttonchange} >or</Text>
      <TouchableOpacity style={styles.button} onPress={() =>
        navigation.navigate('signUp')}>
        <Text style={{ fontSize: 18, fontWeight: 'bold', color: '#fff' }}>SIGN UP</Text>
      </TouchableOpacity>
    </View>


  );
};
const styles = StyleSheet.create({
  sectionContainer: {
    flex: 1,
    height: hp('100%'),
    width: wp('100%'),
    backgroundColor: '#fff',
    justifyContent:'center',
    alignItems: 'center',
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
  input: {
    
    //
    width: 350,
    height: 55,
    backgroundColor: '#Ebfbe0',
    margin: '5%',
    padding: 8,
    color: 'black',
    borderRadius: 14,
    fontSize: 18,
    fontWeight: '500',
    elevation:10
  },
  button: {
    height: '6%',
    width: '25%',
    backgroundColor: '#73aa4b',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 7,
    elevation: 5
  },
  buttonchange: {
    height: '5%',
    fontSize: 20,
  },
  forgot_button: {
    height: 30,
  },

});

export default LoginView;
