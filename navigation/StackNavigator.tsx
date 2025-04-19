import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from '../screens/HomeScreen';
import KitchenScreen from '../screens/KitchenScreen';
import BedroomScreen from '../screens/BedroomScreen';
import LivingRoomScreen from '../screens/LivingRoomScreen';
import WashingRoomScreen from '../screens/WashingRoomScreen';
import LoginScreen from '../screens/Login';
import SignupScreen from '../screens/SignupScreen';
import ProfileScreen from '../screens/ProfileScreen';

const Stack = createStackNavigator();

export default function StackNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen 
          name="Login" 
          component={LoginScreen} 
        />
        <Stack.Screen 
          name="SignupScreen" 
          component={SignupScreen} 
        />
        <Stack.Screen
          name="HomeScreen"
          component={HomeScreen}
          options={{ headerShown: false }} // ✅ This line hides the iOS header
        />
        <Stack.Screen
          name="KitchenScreen"
          component={KitchenScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="BedroomScreen"
          component={BedroomScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen 
          name="ProfileScreen" 
          component={ProfileScreen} 
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="LivingRoomScreen"
          component={LivingRoomScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="WashingRoomScreen"
          component={WashingRoomScreen}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
