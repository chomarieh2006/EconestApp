import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, FlatList, Modal } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { Ionicons } from '@expo/vector-icons';

const generateWeeks = (startDate, numberOfWeeks) => {
    const weeks = [];
    const start = new Date(startDate);
    for (let i = 0; i < numberOfWeeks; i++) {
      const end = new Date(start);
      end.setDate(start.getDate() + 6);
      const range = `${start.getMonth() + 1}/${start.getDate()}/${start.getFullYear()} - ${end.getMonth() + 1}/${end.getDate()}/${end.getFullYear()}`;
      weeks.push(range);
      start.setDate(start.getDate() - 7); // go back a week
    }
    return weeks;
  };

const SummaryScreen = () => {
    const weeks = generateWeeks('2025-04-20', 7);
  const [selectedWeek, setSelectedWeek] = useState(weeks[0]);
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.dropdown}
        onPress={() => setModalVisible(true)}
      >
        <Text style={styles.dropdownText}>{selectedWeek}</Text>
        <Ionicons name="chevron-down" size={18} color="#fff" />
      </TouchableOpacity>

      <Modal transparent animationType="fade" visible={modalVisible}>
        <TouchableOpacity
          style={styles.modalOverlay}
          onPress={() => setModalVisible(false)}
        >
          <View style={styles.modal}>
            <ScrollView style={{ maxHeight: 170 }}>
                {weeks.map((week, index) => (
                <TouchableOpacity
                    key={index}
                    style={styles.modalItem}
                    onPress={() => {
                    setSelectedWeek(week);
                    setModalVisible(false);
                    }}
                >
                    <Text style={styles.modalItemText}>{week}</Text>
                </TouchableOpacity>
                ))}
            </ScrollView>
            </View>
        </TouchableOpacity>
      </Modal>

      {/* Recent Activity Card */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Recent Activity</Text>
        <View style={styles.activityBox} />
        <View style={styles.activityBox} />
        <View style={styles.activityBox} />
      </View>

      {/* Bar Graph Placeholder */}
      <View style={styles.graphCard}>
        {/* Replace below with your actual graph later */}
        <Text style={styles.graphText}>[ Bar Graph Placeholder ]</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#bad2ff',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  dropdown: {
    flexDirection: 'row',
    backgroundColor: '#0046b5ff',
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 20,
    alignItems: 'center',
    marginBottom: 20,
  },
  dropdownText: {
    color: 'white',
    fontWeight: '600',
    marginRight: 6,
  },
  card: {
    width: '85%',
    backgroundColor: '#2972ea',
    borderRadius: 25,
    padding: 20,
    marginBottom: 30,
  },
  cardTitle: {
    fontWeight: '600',
    fontSize: 16,
    marginBottom: 12,
    color: 'white',
  },
  activityBox: {
    backgroundColor: 'white',
    borderRadius: 20,
    height: 50,
    marginBottom: 12,
  },
  graphCard: {
    width: '85%',
    height: 250,
    borderRadius: 25,
    backgroundColor: '#2972ea',
    justifyContent: 'center',
    alignItems: 'center',
  },
  graphText: {
    color: 'white',
    fontWeight: '500',
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.3)',
  },
  modal: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 10,
    width: 280,
  },
  modalItem: {
    paddingVertical: 12,
    borderBottomColor: '#ccc',
    borderBottomWidth: 1,
  },
  modalItemText: {
    fontSize: 14,
    color: '#333',
  },
});

export default SummaryScreen;
