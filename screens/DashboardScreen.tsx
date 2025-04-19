import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import BottomNavBar from '../components/taskbar';

const DashboardScreen = () => {
  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
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
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.applianceRow}
        >
          <Image source={require('../assets/livingroom.png')} style={styles.applianceImage} />
          <Image source={require('../assets/kitchen.png')} style={styles.applianceImage} />
          <Image source={require('../assets/laundryroom.png')} style={styles.applianceImage} />
        </ScrollView>

        <Text style={styles.sectionTitle}>Goals for the Week</Text>
        <View style={styles.goalSection}>
          <View style={styles.goalBox}>
            <Text style={styles.goalText}>Compost 4 times</Text>
          </View>
          <View style={styles.goalBox}>
            <Text style={styles.goalText}>Use washer only twice</Text>
          </View>
        </View>
      </ScrollView>

      <View style={styles.taskbarWrapper}>
        <BottomNavBar />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FDF8EC',
    paddingTop: 55,
  },
  scrollContent: {
    paddingBottom: 140,
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
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#3E2C1D',
    marginTop: 30,
    marginLeft: 20,
  },
  applianceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    marginTop: 15,
  },
  applianceImage: {
    width: 80,
    height: 80,
    borderRadius: 10,
    marginHorizontal: 10,
  },
  goalSection: {
    alignItems: 'center',
    marginTop: 10,
  },
  goalBox: {
    backgroundColor: '#C9DAA7',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: 300,
    marginTop: 15,
    padding: 15,
    borderRadius: 15,
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
