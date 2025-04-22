import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from '../screens/HomeScreen';
import KitchenScreen from '../screens/KitchenScreen';
import BedroomScreen from '../screens/BedroomScreen';
import LivingRoomScreen from '../screens/LivingRoomScreen';
import SummaryScreen from '../screens/SummaryScreen';
import DashboardScreen from '../screens/DashboardScreen';
import WashingRoomScreen from '../screens/WashingRoomScreen';
import LoginScreen from '../screens/Login';
import SignupScreen from '../screens/SignupScreen';
import ProfileScreen from '../screens/ProfileScreen';
import WeekSummaryScreen from '../screens/WeekSummaryScreen';
import AppliancePopup from '../components/AppliancePopup';

const Stack = createStackNavigator();

export default function StackNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="HomeScreen"
          component={HomeScreen}
          options={{ headerShown: false }} // ✅ This line hides the iOS header
        />
        <Stack.Screen 
          name="SignupScreen" 
          component={SignupScreen} 
          options={{ headerShown: false }}
        />
        <Stack.Screen 
          name="Login" 
          component={LoginScreen} 
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="KitchenScreen"
          component={KitchenScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="SummaryScreen"
          component={SummaryScreen}
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
        <Stack.Screen
          name="DashboardScreen"
          component={DashboardScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="WeekSummaryScreen"
          component={WeekSummaryScreen}
          options={{ headerShown: false }}
        />

        <Stack.Screen
          name="ApplianceModal"
          component={AppliancePopup}
          options={{
            presentation: 'modal', // 👈 makes it slide from bottom like a modal
            headerShown: false,    // hide the top bar
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
