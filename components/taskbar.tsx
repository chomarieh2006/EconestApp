import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { AntDesign, FontAwesome5, Ionicons } from '@expo/vector-icons';

const BottomNavBar = () => {
  const navigation = useNavigation();
  const route = useRoute();

  const tabs = [
    {
      name: 'Home',
      screen: 'HomeScreen',
      icon: (focused: boolean) => (
        <AntDesign name="home" size={28} color={focused ? '#ffffff' : '#bad2ff'} />
      ),
    },
    {
      name: 'Dashboard',
      screen: 'DashboardScreen',
      icon: (focused: boolean) => (
        <Ionicons name="grid-outline" size={28} color={focused ? '#ffffff' : '#bad2ff'} />
      ),
    },
    {
      name: 'Stats',
      screen: 'SummaryScreen',
      icon: (focused: boolean) => (
        <FontAwesome5 name="chart-bar" size={24} color={focused ? '#ffffff' : '#bad2ff'} />
      ),
    },
  ];

  return (
    <View style={styles.navbar}>
      {tabs.map((tab) => {
        const isActive = route.name === tab.screen;
        return (
          <TouchableOpacity
            key={tab.name}
            style={styles.tabItem}
            onPress={() => navigation.navigate(tab.screen as never)}
          >
            {tab.icon(isActive)}
            <Text style={[styles.tabText, { color: isActive ? '#ffffff' : '#bad2ff' }]}>
              {tab.name}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  navbar: {
    flexDirection: 'row',
    backgroundColor: '#0046b5ff',
    borderRadius: 30,
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 25,
    position: 'absolute',
    bottom: 20,
    left: '5%',
    width: '90%',
    elevation: 8,
  },
  tabItem: {
    alignItems: 'center',
  },
  tabText: {
    fontSize: 12,
    marginTop: 4,
    fontWeight: '500',
  },
});

export default BottomNavBar;
