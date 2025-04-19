import React, { useState, useEffect, useRef } from 'react';
import { View, Image, Text, TouchableOpacity, StyleSheet, Animated } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const SummaryScreen = () => {
  const navigation = useNavigation();


  return (
    <View style = {styles.container}>  
        <Text style={styles.title}>Month's Summary</Text>
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
        marginTop: 90,
        marginLeft: 20,
    },

})

export default SummaryScreen;