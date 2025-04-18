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
      <Image
        source={require('../assets/taskbar.png')}
        style={styles.taskBar}
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
    top: 100, // +30
    width: '110%',
    height: 350,
    right: 30,
    resizeMode: 'contain',
  },
  taskBar: {
    position: 'absolute',
    top: 725, 
    width: '90%',
    left: 20,
    height: 200,
    //width: 400,
    resizeMode: 'contain',
    
  },
  kitchenTouchableArea: {
    position: 'absolute',
    top: 440, // +30
    left: 35,
    width: 130,
    height: 100,
  },
  bedroomTouchableArea: {
    position: 'absolute',
    top: 370, // +30
    left: 170,
    width: 150,
    height: 80,
  },
  livingroomTouchableArea: {
    position: 'absolute',
    top: 480, // +30
    left: 200,
    width: 110,
    height: 70,
  },
  washingroomTouchableArea: {
    position: 'absolute',
    top: 490, // +30
    left: 350,
    width: 40,
    height: 60,
  },
  transparentOverlay: {
    flex: 1,
    backgroundColor: 'transparent',
  },
});

export default HomeScreen;
