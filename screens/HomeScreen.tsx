import React from 'react';
import { Text, View, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const HomeScreen = () => {
  const navigation = useNavigation();

  const handleRoomClick = (room: string) => {
    navigation.navigate(room);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to your Home</Text>
      <Text style={styles.subtitle}>Tap to manage rooms & appliances</Text>

      <Image
        source={require('../assets/home.png')}
        style={styles.homeImage}
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
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FDF8EC',
  },
  title: {
    fontSize: 28,
    fontWeight: '600',
    color: '#3E2C1D',
    marginTop: 90, // +30
    marginLeft: 20,
  },
  subtitle: {
    fontSize: 16,
    color: '#3E2C1D',
    marginTop: 15, // +30
    marginLeft: 20,
  },
  homeImage: {
    top: 80, // +30
    width: '100%',
    height: 300,
    resizeMode: 'contain',
  },
  kitchenTouchableArea: {
    position: 'absolute',
    top: 380, // +30
    left: 35,
    width: 130,
    height: 100,
  },
  bedroomTouchableArea: {
    position: 'absolute',
    top: 320, // +30
    left: 170,
    width: 150,
    height: 80,
  },
  livingroomTouchableArea: {
    position: 'absolute',
    top: 410, // +30
    left: 180,
    width: 110,
    height: 70,
  },
  washingroomTouchableArea: {
    position: 'absolute',
    top: 410, // +30
    left: 315,
    width: 40,
    height: 60,
  },
  transparentOverlay: {
    flex: 1,
    backgroundColor: 'transparent',
  },
});

export default HomeScreen;
