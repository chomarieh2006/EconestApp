import React, { useState } from 'react';
import { View, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';

const TaskBar = () => {
  const navigation = useNavigation();
  const [activeTab, setActiveTab] = useState('Rooms');

  const tabs = [
    {
      name: 'Rooms',
      screen: 'HomeScreen',
      activeIcon: require('../assets/kitchen.png'),
      inactiveIcon: require('../assets/kitchen.png'),
    },
    {
      name: 'Home',
      screen: 'DashboardScreen',
      activeIcon: require('../assets/kitchen.png'),
      inactiveIcon: require('../assets/kitchen.png'),
    },
    {
      name: 'Stats',
      screen: 'SummaryScreen',
      activeIcon: require('../assets/kitchen.png'),
      inactiveIcon: require('../assets/kitchen.png'),
    },
  ];

  return (
    <View style={styles.taskbarContainer}>
      {tabs.map((tab) => (
        <TouchableOpacity
          key={tab.name}
          onPress={() => {
            setActiveTab(tab.name);
            navigation.navigate(tab.screen as never);
          }}
        >
          <Image
            source={activeTab === tab.name ? tab.activeIcon : tab.inactiveIcon}
            style={styles.icon}
            resizeMode="contain"
          />
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  taskbarContainer: {
    flexDirection: 'row',
    backgroundColor: '#c8d7a2',
    borderRadius: 50,
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingVertical: 15,
    paddingHorizontal: 20,
  },
  icon: {
    width: 40,
    height: 40,
  },
});

export default TaskBar;
