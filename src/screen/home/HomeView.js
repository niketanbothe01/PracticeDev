import React, { useEffect } from 'react';

import {  View, Text, Alert, Button, FlatList, TouchableOpacity} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useSelector, useDispatch } from 'react-redux';
import { setName, getCities } from '../../redux/actions';
import PushNotification from "react-native-push-notification";


const HomeView = ({ navigation, route }) => {
  // const [name, setName] = useState('');

  const { name, cities } = useSelector(state => state.userReducer);
  const dispatch = useDispatch();

  useEffect(() => {
    getData();
    dispatch(getCities());

  }, []);



  const getData = () => {
    try {
      AsyncStorage.getItem('UserName')
        .then(value => {
          if (value != null) {
            dispatch(setName(value));
          }
        })
    }
    catch (error) {
      console.log(error);
    }
  }

  const updateData = async () => {
    if (name.length == 0 || password.length == 0) {
      Alert.alert('Please provide your name')
    }
    else {
      try {
        await AsyncStorage.setItem('UserName', name);
        Alert.alert('Success!', 'Your Data has been updated');
      }
      catch (error) {
        console.log(error);

      }
    }
  }


  const handleNotification = (item, index) => {
    PushNotification.localNotification({
      channelId:'test-channel',
      title:"You clicked on " + item.country + "!",
      message: item.city,
      bigText: item.city + " is one of the largest and most beautiful city in the "+ item.country,
      color:'red',
      id: index
    });

    PushNotification.localNotificationSchedule({
      channelId:'test-channel',
      title:"Alarm",
      message: "You clicked on " + item.country + "20 seconds ago",
      date: new Date(Date.now() + 20 * 1000),
      allowWhileIdle: true,
    })

  }

  const removeData = async () => {

    try {
      await AsyncStorage.removeItem('UserName');
      navigation.navigate('login');
    }
    catch (error) {
      console.log(error);
    }
  }

  return (

    <>
      <View style={{ height: '100%', width: '100%', alignItems: 'center' }}>
        <Text style={{ color: 'red' }}>Hello {name}!</Text>
        {/* <TextInput
          style={{ borderColor: 'black', borderRadius: 10, borderWidth: 1, width: '60%', margin: 10 }}
          placeholder='Enter New Name'
          value={name}
          onChangeText={(value) => dispatch(setName(value))} /> */}
        <FlatList
          data={cities}
          renderItem={({ item, index }) => (
            <TouchableOpacity 
            onPress={() => {handleNotification(item, index)}}>
          <View style={{backgroundColor:'#ffff', borderWidth: 2, elevation:5, borderColor:'#cccccc', borderRadius:5, margin:7, width:350, justifyContent:'center', alignItems:'center', }}>
            <Text style={{fontSize:30, margin:10}}>{item.country}</Text>
            <Text style={{fontSize:20, margin:10, color:'#999999'}}>{item.city}</Text>
          </View>
          </TouchableOpacity>)}
          keyExtractor={(item, index) => index.toString()} 
        />
        <Button title='LogOut' onPress={() => { removeData() }}></Button>
      </View>
    </>

  )
}

export default HomeView;