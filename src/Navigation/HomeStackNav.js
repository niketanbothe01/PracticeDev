import * as React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import LoginView from '../screen/login/loginScreen';

const Stack = createStackNavigator();
function HomeStackNav() {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="LoginView" component={LoginView} />
    </Stack.Navigator>
  );
}

export default HomeStackNav;
