// navigation.js
import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';
import Home from './Home';
import AboutScreen from './AboutScreen';
import Moves from './Moves';

const Stack = createStackNavigator();

const Navigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={{headerShown: false}}>
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="AboutScreen" component={AboutScreen} />
        <Stack.Screen name="Moves" component={Moves} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;
