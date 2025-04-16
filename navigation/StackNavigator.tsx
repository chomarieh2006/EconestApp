import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from '../screens/HomeScreen';
import KitchenScreen from '../screens/KitchenScreen';
import BedroomScreen from '../screens/BedroomScreen';
import LivingRoomScreen from '../screens/LivingRoomScreen';
import WashingRoomScreen from '../screens/WashingRoomScreen'; 


const Stack = createStackNavigator();

export default function StackNavigator() {
    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen name="HomeScreen" component={HomeScreen}/>
                <Stack.Screen name="KitchenScreen" component={KitchenScreen} />
                <Stack.Screen name="BedroomScreen" component={BedroomScreen} />
                <Stack.Screen name="LivingRoomScreen" component={LivingRoomScreen} />
                <Stack.Screen name="WashingRoomScreen" component={WashingRoomScreen} />
                
            </Stack.Navigator>
        </NavigationContainer>
    )
}