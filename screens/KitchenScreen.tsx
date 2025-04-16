import React, { useState } from 'react';
import { View, Image, Text, TouchableOpacity, StyleSheet} from 'react-native';
import ApplianceModal from '../components/ApplianceModal'; // Import the appliance modal


const KitchenScreen = () => {

//     const [modalVisible, setModalVisible] = useState(false); // so modalvisible is the variable itself, set____ is how you change it. What we set it equal to is the default value.
//     const [appliance, setAppliance] = useState('');
//     const [applianceInfoOne, setApplianceInfoOne] = useState('Nothing set yet...');


// //     //a function to handle clicking an appliance
//     const handleApplianceClick = (applianceName: string) => {
//         // setAppliance(applianceName);
//         // setModalVisible(true); // so when we click on an appliance, open the modal.

//         // we want an image to appear here instead

//     }
const [selectedImage, setSelectedImage] = useState<any | null>(null);   

    const imageMap: Record<string, any> = {
        Fridge: require('../assets/fridgepopup.png'),
        // Oven: require('../assets/oven.png'),
        // Microwave: require('../assets/microwave.png'),
    };

    const handleApplianceClick = (applianceName: string) => {
        const imageUrl = imageMap[applianceName];
        if (imageUrl) {
            setSelectedImage(imageUrl);
        }
    };
    

    return (
        <View style={{flex: 1, flexDirection: 'column', position: 'relative'}}>
            {/* <Text>I am the kitchen screen!</Text> */}
            <Image 
                source={require('../assets/kitchen.png')}
                style={{top: 200, width: '100%', height: 300, resizeMode: 'contain'}}
            />
            <TouchableOpacity onPress={() => handleApplianceClick("Fridge")} style={styles.fridgeTouchableArea}>
                <View style={styles.transparentOverlay} />
            </TouchableOpacity>

            <TouchableOpacity onPress={() => handleApplianceClick("Oven")} style={styles.ovenTouchableArea}>
                <View style={styles.transparentOverlay} />
            </TouchableOpacity>

            <TouchableOpacity onPress={() => handleApplianceClick("Blender")} style={styles.blenderTouchableArea}>
                <View style={styles.transparentOverlay} />
            </TouchableOpacity>

            <TouchableOpacity onPress={() => handleApplianceClick("Toaster")} style={styles.toasterTouchableArea}>
                <View style={styles.transparentOverlay} />
            </TouchableOpacity>

            <Image
                source={selectedImage}
                style={{
                    position: 'absolute',
                    top: 100,
                    left: 50,
                    width: 200,
                    height: 200,
                    resizeMode: 'contain',
                }}
            />
            {/* <ApplianceModal 
                visible={modalVisible}
                appliance={appliance}
                onClose={() => setModalVisible(false)}
                input={applianceInfoOne}
                setInput={setApplianceInfoOne}
                
            />
            <Text>{`${applianceInfoOne}`}</Text> */}
        </View>
    );

};

const styles = StyleSheet.create({
    fridgeTouchableArea: {
        position: 'absolute', //means im going to be positioning this always based on its parent. if there's no parent to judge based off of, its based on the entire screen.
        top: 280,    // adjust this to place it over the right part
        left: 70,  // adjust this as well
        width: 70, // size of the clickable area
        height: 140,
        color: 'red'
      },
      ovenTouchableArea: {
        position: 'absolute', //means im going to be positioning this always based on its parent. if there's no parent to judge based off of, its based on the entire screen.
        top: 330,    // adjust this to place it over the right part
        left: 230,  // adjust this as well
        width: 100, // size of the clickable area
        height: 100,
        color: 'red'
      },
      blenderTouchableArea: {
        position: 'absolute', //means im going to be positioning this always based on its parent. if there's no parent to judge based off of, its based on the entire screen.
        top: 280,    // adjust this to place it over the right part
        left: 200,  // adjust this as well
        width: 20, // size of the clickable area
        height: 50,
        color: 'red'
      },
      toasterTouchableArea: {
        position: 'absolute', //means im going to be positioning this always based on its parent. if there's no parent to judge based off of, its based on the entire screen.
        top: 305,    // adjust this to place it over the right part
        left: 172,  // adjust this as well
        width: 20, // size of the clickable area
        height: 20,
        color: 'red'
      },
      transparentOverlay: {
        flex: 1, 
        backgroundColor: 'red'
      },
})


export default KitchenScreen