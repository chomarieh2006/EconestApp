import React from 'react';
import { Text } from 'react-native'
import { View, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';


const HomeScreen = () => {
    //variables
    // functions
    //return - 
    const navigation = useNavigation(); 

    const handleRoomClick = (room: string) => { // room: string means we are expecting a parameter called room of type string. 
        navigation.navigate(room); // so when we call this function in our code, we'll navigate to whatever screen that has a name that matches what we passed in
    };

    return (
        <View>
            {/* <Text>I am the homescreen!</Text> */}
            {/* <TouchableOpacity onPress={() => handleRoomClick('KitchenScreen')}>
                <Image source={require('../assets/search.png')} />
            </TouchableOpacity> */}
            <Text>Homescreen!</Text>

            <Image 
                source={require('../assets/home.png')}
                style={{top: 180, width: '100%', height: 300, right: 10, resizeMode: 'contain'}}
            />



            <TouchableOpacity onPress={() => handleRoomClick("KitchenScreen")} style={styles.kitchenTouchableArea}>
                <View style={styles.transparentOverlay} />
            </TouchableOpacity>

            <TouchableOpacity onPress={() => handleRoomClick("LivingRoomScreen")} style={styles.livingroomTouchableArea}>
                <View style={styles.transparentOverlay} />
            </TouchableOpacity>

            <TouchableOpacity onPress={() => handleRoomClick("WashingRoomScreen")} style={styles.washingroomTouchableArea}>
                <View style={styles.transparentOverlay} />
            </TouchableOpacity>

            <TouchableOpacity onPress={() => handleRoomClick("BedroomScreen")} style={styles.bedroomTouchableArea}>
                <View style={styles.transparentOverlay} />
            </TouchableOpacity>

            {/* nav bar, mkae the 3 images show up in a row */}

            <View style={styles.navBar}>
                <Image 
                    source={require('../assets/Component 18.png')}
                    style={{width: '100%', height: 50, right: 170, resizeMode: 'contain'}}
                />
                <Image 
                    source={require('../assets/Component 17.png')}
                    style={{width: '100%', height: 50, top: 10, right: 100, resizeMode: 'contain'}}
                />
                <Image 
                    source={require('../assets/Group.png')}
                    style={{top: 180, width: '100%', height: 10, right: 10, resizeMode: 'contain'}}
                />
            </View>

            
        </View>
        
    )



}
//     const navigation = useNavigation(); // This is what allows us to pass information between screens.

    

//     return ( //what's inside of the return is what the page will display; everything above handles the logic of the page.
//         <View>
//             <Text> I am the homescreen! </Text>
            


//         </View>
//     );
// };

const styles = StyleSheet.create({
    navBar: {
        position: 'absolute',
        height: 100,
        width: 600,
        backgroundColor: '#CAD2AE',
        left: '30%',
        transform: [{ translateX: -150 }],
        top: 50,
        // move to the bottom of the screen
        flexDirection: 'row',
    alignItems: 'center', // optional: vertically center items
    justifyContent: 'space-around', // optional: space items out evenly
    },
    kitchenTouchableArea: {
        position: 'absolute', //means im going to be positioning this always based on its parent. if there's no parent to judge based off of, its based on the entire screen.
        top: 350,    // adjust this to place it over the right part
        left: 35,  // adjust this as well
        width: 130, // size of the clickable area
        height: 100,
        color: 'red'
      },
      bedroomTouchableArea: {
        position: 'absolute', //means im going to be positioning this always based on its parent. if there's no parent to judge based off of, its based on the entire screen.
        top: 290,    // adjust this to place it over the right part
        left: 170,  // adjust this as well
        width: 150, // size of the clickable area
        height: 80,
        color: 'red'
      },
      livingroomTouchableArea: {
        position: 'absolute', //means im going to be positioning this always based on its parent. if there's no parent to judge based off of, its based on the entire screen.
        top: 380,    // adjust this to place it over the right part
        left: 180,  // adjust this as well
        width: 110, // size of the clickable area
        height: 70,
        color: 'red'
      },
      washingroomTouchableArea: {
        position: 'absolute', //means im going to be positioning this always based on its parent. if there's no parent to judge based off of, its based on the entire screen.
        top: 380,    // adjust this to place it over the right part
        left: 315,  // adjust this as well
        width: 40, // size of the clickable area
        height: 60,
        color: 'red'
      },
      
      transparentOverlay: {
        flex: 1, 
        backgroundColor: 'red'
      },
})


export default HomeScreen;