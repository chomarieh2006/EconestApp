import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import TaskBar from '../components/taskbar';

const DashboardScreen = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.header}>
          <Text style={styles.greeting}>Welcome, Angela!</Text>
        </View>

        <Text style={styles.title}>Dashboard</Text>

        <View style={styles.cardRow}>
          <TouchableOpacity style={styles.card}>
            <Text style={styles.plus}>＋</Text>
            <Text style={styles.cardLabel}>Usage Update</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.card}>
            <Text style={styles.cardLabel}>Week Summary</Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.sectionTitle}>Appliances</Text>
        <View style={styles.applianceRow}>
          <Image source={require('../assets/livingroom.png')} style={styles.applianceImage} />
          <Image source={require('../assets/kitchen.png')} style={styles.applianceImage} />
          <Image source={require('../assets/laundryroom.png')} style={styles.applianceImage} />
        </View>

        <Text style={styles.sectionTitle}>Goals for the Week</Text>
        <View style={styles.goalBox}>
          <Text style={styles.goalIcon}>🥕</Text>
          <Text style={styles.goalText}>Compost 4 times</Text>
        </View>
        <View style={styles.goalBox}>
          <Text style={styles.goalIcon}>💧</Text>
          <Text style={styles.goalText}>Use washer only twice</Text>
        </View>
      </ScrollView>

      <View style={styles.taskbarWrapper}>
        <TaskBar />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FDF8EC',
  },
  scrollContent: {
    paddingBottom: 140,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 60,
    paddingHorizontal: 20,
  },
  greeting: {
    fontSize: 18,
    color: '#3E2C1D',
  },
  profileImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: '600',
    color: '#3E2C1D',
    marginTop: 10,
    marginLeft: 20,
  },
  cardRow: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginTop: 25,
  },
  card: {
    width: 150,
    height: 130,
    backgroundColor: '#C9DAA7',
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  plus: {
    fontSize: 36,
    color: '#3E2C1D',
  },
  cardLabel: {
    marginTop: 8,
    fontSize: 14,
    color: '#3E2C1D',
  },
  graphImage: {
    width: 50,
    height: 50,
    marginBottom: 8,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#3E2C1D',
    marginTop: 30,
    marginLeft: 20,
  },
  applianceRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 15,
  },
  applianceImage: {
    width: 80,
    height: 80,
    borderRadius: 10,
  },
  goalBox: {
    backgroundColor: '#C9DAA7',
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 20,
    marginTop: 15,
    padding: 15,
    borderRadius: 15,
  },
  goalIcon: {
    fontSize: 20,
    marginRight: 10,
  },
  goalText: {
    fontSize: 16,
    color: '#3E2C1D',
  },
  taskbarWrapper: {
    position: 'absolute',
    bottom: 20,
    left: '5%',
    width: '90%',
  },
});

export default DashboardScreen;
