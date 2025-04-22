import React, { useState, useEffect, useRef } from 'react';
import { View, Image, Text, TouchableOpacity, StyleSheet, Animated } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const KitchenScreen = () => {
  const navigation = useNavigation();
  const [selectedImage, setSelectedImage] = useState<any | null>(null);

  const handleApplianceClick = (applianceName: string) => {
    navigation.navigate('ApplianceModal', {
      userId: 'demoUser123',
      appliance: applianceName,
    });
  };

  const handleBack = () => {
    if (navigation.canGoBack()) {
      navigation.goBack();
    } else {
      navigation.navigate('HomeScreen');
    }
  };

  // Bounce animations
  const bounce1 = useRef(new Animated.Value(1)).current;
  const bounce2 = useRef(new Animated.Value(1)).current;
  const bounce3 = useRef(new Animated.Value(1)).current;
  const bounce4 = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    const animate = (val: Animated.Value) => {
      Animated.loop(
        Animated.sequence([
          Animated.timing(val, { toValue: 1.2, duration: 600, useNativeDriver: true }),
          Animated.timing(val, { toValue: 1, duration: 600, useNativeDriver: true }),
        ])
      ).start();
    };
    animate(bounce1);
    animate(bounce2);
    animate(bounce3);
    animate(bounce4);
  }, []);

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.backButton} onPress={handleBack}>
        <Text style={styles.backText}>← Back</Text>
      </TouchableOpacity>

      <Text style={styles.title}>Kitchen</Text>

      <View style={styles.kitchenWrapper}>
        <Image
          source={require('../assets/kitchen.png')}
          style={styles.kitchenImage}
        />

        <TouchableOpacity onPress={() => handleApplianceClick("Fridge")} style={styles.fridgeTouchableArea}>
          <View style={styles.transparentOverlay} />
          <Animated.View style={[styles.circle, { transform: [{ scale: bounce1 }] }]} />
        </TouchableOpacity>

        <TouchableOpacity onPress={() => handleApplianceClick("Oven")} style={styles.ovenTouchableArea}>
          <View style={styles.transparentOverlay} />
          <Animated.View style={[styles.circle, { transform: [{ scale: bounce2 }] }]} />
        </TouchableOpacity>

        <TouchableOpacity onPress={() => handleApplianceClick("Blender")} style={styles.blenderTouchableArea}>
          <View style={styles.transparentOverlay} />
          <Animated.View style={[styles.circle, { transform: [{ scale: bounce3 }] }]} />
        </TouchableOpacity>

        <TouchableOpacity onPress={() => handleApplianceClick("Toaster")} style={styles.toasterTouchableArea}>
          <View style={styles.transparentOverlay} />
          <Animated.View style={[styles.circle, { transform: [{ scale: bounce4 }] }]} />
        </TouchableOpacity>
      </View>

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#bad2ff',
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
  kitchenWrapper: {
    alignSelf: 'center',
    width: 360,
    height: 500,
    position: 'relative',
    top: 120,
  },
  kitchenImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
  fridgeTouchableArea: {
    position: 'absolute',
    top: 150,
    left: 30,
    width: 95,
    height: 190,
  },
  ovenTouchableArea: {
    position: 'absolute',
    top: 220,
    left: 230,
    width: 100,
    height: 110,
  },
  blenderTouchableArea: {
    position: 'absolute',
    top: 170,
    left: 185,
    width: 25,
    height: 50,
  },
  toasterTouchableArea: {
    position: 'absolute',
    top: 190,
    left: 215,
    width: 37,
    height: 20,
  },
  transparentOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'transparent',
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

export default KitchenScreen;
