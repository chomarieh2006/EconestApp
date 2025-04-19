import React, { useState, useEffect, useRef } from 'react';
import { View, Image, Text, TouchableOpacity, StyleSheet, Animated, Modal } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AppliancePopup from '../components/ApplianceModal';
import { TouchableWithoutFeedback, Keyboard } from 'react-native';

const BedroomScreen = () => {
  const navigation = useNavigation();
  const [selectedAppliance, setSelectedAppliance] = useState<any | null>(null);

  const imageMap: Record<string, any> = {
    'Air Conditioner': require('../assets/fridgepopup.png'),
    TV: require('../assets/fridgepopup.png'),
    Lamp: require('../assets/fridgepopup.png'),
  };

  const handleApplianceClick = (applianceName: string) => {
    setSelectedAppliance(applianceName)
  };

  const handleCloseImage = () => {
    setSelectedAppliance(null);
  };

  const handleBack = () => {
    if (navigation.canGoBack()) {
      navigation.goBack();
    } else {
      navigation.navigate('HomeScreen');
    }
  };

  const bounce1 = useRef(new Animated.Value(1)).current;
  const bounce2 = useRef(new Animated.Value(1)).current;
  const bounce3 = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    const createBounce = (animation: Animated.Value) => {
      return Animated.loop(
        Animated.sequence([
          Animated.timing(animation, {
            toValue: 1.2,
            duration: 600,
            useNativeDriver: true,
          }),
          Animated.timing(animation, {
            toValue: 1,
            duration: 600,
            useNativeDriver: true,
          }),
        ])
      ).start();
    };

    createBounce(bounce1);
    createBounce(bounce2);
    createBounce(bounce3);
  }, []);

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.backButton} onPress={handleBack}>
        <Text style={styles.backText}>← Back</Text>
      </TouchableOpacity>

      <Text style={styles.title}>Bedroom</Text>

      <View style={styles.bedroomWrapper}>
        <Image
          source={require('../assets/bedroom.png')}
          style={styles.bedroomImage}
        />

        <TouchableOpacity onPress={() => handleApplianceClick("Air Conditioner")} style={styles.airconditionerTouchableArea}>
          <View style={styles.transparentOverlay} />
          <Animated.View style={[styles.circle, { transform: [{ scale: bounce1 }] }]} />
        </TouchableOpacity>

        <TouchableOpacity onPress={() => handleApplianceClick("TV")} style={styles.tvTouchableArea}>
          <View style={styles.transparentOverlay} />
          <Animated.View style={[styles.circle, { transform: [{ scale: bounce2 }] }]} />
        </TouchableOpacity>

        <TouchableOpacity onPress={() => handleApplianceClick("Lamp")} style={styles.lampTouchableArea}>
          <View style={styles.transparentOverlay} />
          <Animated.View style={[styles.circle, { transform: [{ scale: bounce3 }] }]} />
        </TouchableOpacity>
      </View>
      
      {selectedAppliance && (
        <Modal
          transparent
          animationType="fade"
          onRequestClose={handleCloseImage}
        >
          <AppliancePopup
            userId="demoUser123" //TO-DO
            //DO this later
            appliance={selectedAppliance}
            onClose={handleCloseImage}
          />
          </Modal>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FDF8EC',
  },
  backButton: {
    position: 'absolute',
    top: 45,
    left: 10,
    zIndex: 10,
    padding: 10,
  },
  backText: {
    fontSize: 18,
    color: '#3E2C1D',
    fontWeight: '500',
  },
  title: {
    fontSize: 28,
    fontWeight: '600',
    color: '#3E2C1D',
    position: 'absolute',
    top: 90,
    left: 20,
  },
  bedroomWrapper: {
    alignSelf: 'center',
    width: 360,
    height: 500,
    position: 'relative',
    top: 120,
  },
  bedroomImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
  airconditionerTouchableArea: {
    position: 'absolute',
    top: 125,
    left: 50,
    width: 90,
    height: 50,
  },
  tvTouchableArea: {
    position: 'absolute',
    top: 190,
    left: 40,
    width: 100,
    height: 60,
  },
  lampTouchableArea: {
    position: 'absolute',
    top: 170,
    left: 145,
    width: 30,
    height: 60,
  },
  transparentOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'transparent',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.14)',
    justifyContent: 'center',
    alignItems: 'center',
  },  
  circle: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#ffffff',
    alignSelf: 'center',
    marginTop: 5,
  },
  popupContainer: {
    position: 'absolute',
    top: 140,
    left: 50,
    zIndex: 20,
    alignItems: 'flex-end',
  },
  popupImage: {
    width: 200,
    height: 200,
    resizeMode: 'contain',
  },
  closeButton: {
    position: 'absolute',
    top: -10,
    right: -10,
    backgroundColor: '#fff',
    borderRadius: 12,
    width: 24,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 2,
  },
  closeText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#3E2C1D',
  },
});

export default BedroomScreen;
