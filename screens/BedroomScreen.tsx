import React, { useState } from 'react';
import { View, Image, Text, TouchableOpacity, StyleSheet} from 'react-native';
import ApplianceModal from '../components/ApplianceModal'; // Import the appliance modal

const BedroomScreen = () => {

    const [modalVisible, setModalVisible] = useState(false); // so modalvisible is the variable itself, set____ is how you change it. What we set it equal to is the default value.
    const [appliance, setAppliance] = useState('');
    const [applianceInfoOne, setApplianceInfoOne] = useState('Nothing set yet...');

//     //a function to handle clicking an appliance
    const handleApplianceClick = (applianceName: string) => {
        setAppliance(applianceName);
        setModalVisible(true); // so when we click on an appliance, open the modal.
        

    }

    return (
        <View style={{flex: 1, flexDirection: 'column', position: 'relative'}}>
            <Text>I am the bedroom screen!</Text>
            <Image 
                source={require('../assets/search.png')}
                style={{width: '100%', height: 300}}
            />
            <TouchableOpacity onPress={() => handleApplianceClick("Sink")} style={styles.touchableArea}>
                <View style={styles.transparentOverlay} />
            </TouchableOpacity>
            <ApplianceModal 
                visible={modalVisible}
                appliance={appliance}
                onClose={() => setModalVisible(false)}
                input={applianceInfoOne}
                setInput={setApplianceInfoOne}
                
            />
            <Text>{`${applianceInfoOne}`}</Text>
        </View>
    );

    //style={styles.touchableArea}
    
    //
//  return ( // Why do we need a view? show waht happens if you dont have it. look into other options for your project: divs, safeareaviews are common. flex is really cool, but needs some more css learning.
//         <View style={{flex: 1, flexDirection: 'column', position: 'relative'}}> 
//             <Text> I am the kitchen screen! </Text>
//             <View style={{position: 'relative'}}>
//                 <Image 
//                     source={require('../assets/splash-icon.png')}
//                     style={{width: '100%', height: 300}}
//                 />
//                 
//             </View>
//             
            
            
            
//         </View>
        

//     );
};

const styles = StyleSheet.create({
    touchableArea: {
        position: 'absolute', //means im going to be positioning this always based on its parent. if there's no parent to judge based off of, its based on the entire screen.
        top: 50,    // adjust this to place it over the right part
        left: 100,  // adjust this as well
        width: 100, // size of the clickable area
        height: 50,
        color: 'red'
      },
      transparentOverlay: {
        flex: 1, 
        backgroundColor: 'red'
      },
})


export default BedroomScreen