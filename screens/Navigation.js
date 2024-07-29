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
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen
          name="Home"
          component={Home}
          options={{
            headerTitleAlign: 'center',
          }}
        />
        <Stack.Screen
          name="AboutScreen"
          options={{
            headerTitleAlign: 'center',
          }}
          component={AboutScreen}
        />
        <Stack.Screen
          name="Moves"
          options={{
            headerTitleAlign: 'center',
          }}
          component={Moves}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;
