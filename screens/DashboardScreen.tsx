import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import BottomNavBar from '../components/taskbar';
import { AntDesign, FontAwesome5, Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { useState } from 'react';




const DashboardScreen = () => {
  const navigation = useNavigation();

  const handleCardClick = (room: string) => {
    navigation.navigate(room);
  };

  const [goals, setGoals] = useState([
    { text: 'Compost 4 times', completed: false },
    { text: 'Use washer only twice', completed: false },
  ]);

  const toggleGoal = (index) => {
    const updatedGoals = [...goals];
    updatedGoals[index].completed = !updatedGoals[index].completed;
    setGoals(updatedGoals);
  };


  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Text style={styles.title}>Dashboard</Text>

        <View style={styles.cardRow}>
          <TouchableOpacity onPress={() => handleCardClick("UsageUpdateScreen")} style={styles.card}>
            <Text style={styles.plus}>＋</Text>
            <Text style={styles.cardLabel}>Usage Update</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => handleCardClick("MonthSummaryScreen")} style={styles.card}>
            <AntDesign name="barschart" size={36} color="white" />
            <Text style={styles.cardLabel}>Monthly Summary</Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.sectionTitle}>Appliances</Text>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.applianceRow}
        >
          <Image source={require('../assets/fridge.png')} style={styles.applianceImage} />
          <Image source={require('../assets/blender.png')} style={styles.applianceImage} />
          <Image source={require('../assets/toaster.png')} style={styles.applianceImage} />
          <Image source={require('../assets/oven.png')} style={styles.applianceImage} />
          <Image source={require('../assets/lamp.png')} style={styles.applianceImage} />
          <Image source={require('../assets/tv.png')} style={styles.applianceImage} />
          <Image source={require('../assets/ac.png')} style={styles.applianceImage} />
          <Image source={require('../assets/washer.png')} style={styles.applianceImage} />
          <Image source={require('../assets/dryer.png')} style={styles.applianceImage} />
          <Image source={require('../assets/ceilinglamp.png')} style={styles.applianceImage} />

        </ScrollView>

        <Text style={styles.sectionTitle}>Goals for the Week</Text>
        <View style={styles.goalSection}>
          {goals.map((goal, index) => (
            <TouchableOpacity
              key={index}
              style={[
                styles.goalBox,
                goal.completed && styles.goalBoxCompleted,
              ]}
              onPress={() => toggleGoal(index)}
            >
              <Text
                style={[
                  styles.goalText,
                  goal.completed && styles.goalTextCompleted,
                ]}
              >
                {goal.text}
              </Text>
            </TouchableOpacity>
          ))}
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
    backgroundColor: '#bad2ff',
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
    backgroundColor: '#2972ea',
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  plus: {
    fontSize: 36,
    color: 'white',
  },
  cardLabel: {
    marginTop: 8,
    fontSize: 14,
    color: 'white',
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
    backgroundColor: '#2972ea',
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
    color: 'white',
  },
  taskbarWrapper: {
    position: 'absolute',
    bottom: 20,
    left: '5%',
    width: '90%',
  },
  goalBoxCompleted: {
    backgroundColor: '#A9A9A9', // greyed out
  },
  goalTextCompleted: {
    textDecorationLine: 'line-through',
    color: '#e0e0e0',
  },
});

export default DashboardScreen;
