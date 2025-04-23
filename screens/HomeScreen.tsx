import React, { useEffect, useState } from 'react';
import { Text, View, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { auth } from '../firebase';
import { onAuthStateChanged } from 'firebase/auth';
import TaskBar from '../components/taskbar';
import { Feather, FontAwesome, Entypo } from '@expo/vector-icons';
// Removed redundant local declaration of auth

const HomeScreen = () => {
  const navigation = useNavigation();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return unsubscribe;
  }, []);

  const handleRoomClick = (room: string) => {
    navigation.navigate(room);
  };

  const handleProfileClick = () => {
    if (user) {
      navigation.navigate('ProfileScreen');
    } else {
      navigation.navigate('Login');
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.profileButton} onPress={handleProfileClick}>
        <Feather name="user" size={24} color="white" />
      </TouchableOpacity>

      <Text style={styles.title}>Welcome to your Home</Text>
      <Text style={styles.subtitle}>Tap to manage rooms & appliances</Text>

      <Image
        source={require('../assets/home.png')}
        style={styles.homeImage}
      />

      <View style={styles.taskbarWrapper}>
          <TaskBar />
      </View>

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

      <TouchableOpacity onPress={() => handleRoomClick("DashboardScreen")} style={styles.dashboardTouchableArea}>
        <View style={styles.transparentOverlay} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#bad2ff',
  },
  profileButton: {
    position: 'absolute',
    top: 50,
    right: 20,
    zIndex: 10,
    backgroundColor: '#0046b5ff',
    borderRadius: 20,
    padding: 10,
  },
  profileText: {
    fontSize: 18,
  },
  title: {
    fontSize: 28,
    fontWeight: '600',
    color: '#3E2C1D',
    marginTop: 90,
    marginLeft: 20,
  },
  subtitle: {
    fontSize: 16,
    color: '#3E2C1D',
    marginTop: 15,
    marginLeft: 20,
  },
  homeImage: {
    top: 100,
    width: '100%',
    height: 350,
    right: 0,
    resizeMode: 'contain',
  },
  taskBar: {
    position: 'absolute',
    bottom: 0,
    left: '5%',
    width: '90%',
    height: 120, // Increased height
    paddingBottom: 20, // Slightly more padding
    resizeMode: 'contain',
  },
  kitchenTouchableArea: {
    position: 'absolute',
    top: 440,
    left: 35,
    width: 130,
    height: 100,
  },
  bedroomTouchableArea: {
    position: 'absolute',
    top: 370,
    left: 170,
    width: 150,
    height: 80,
  },
  livingroomTouchableArea: {
    position: 'absolute',
    top: 480,
    left: 200,
    width: 110,
    height: 70,
  },
  washingroomTouchableArea: {
    position: 'absolute',
    top: 460,
    left: 320,
    width: 50,
    height: 70,
  },
  taskbarWrapper: {
    position: 'absolute',
    bottom: 20,
    left: '5%',
    width: '90%',
  },
  dashboardTouchableArea: {
    position: 'absolute',
    bottom: 20,
    left: '45%',
    width: '10%',
    height: 80, // Increased height
    paddingBottom: 20, // Slightly more padding
    resizeMode: 'contain',
  },
  summaryTouchableArea: {
    position: 'absolute',
    bottom: 20,
    left: '70%',
    width: '10%',
    height: 80, // Increased height
    paddingBottom: 20, // Slightly more padding
    resizeMode: 'contain',
  },
  transparentOverlay: {
    flex: 1,
    backgroundColor: 'transparent',
  },
});

export default HomeScreen;
