import React, { useState, useEffect } from 'react';
import { TouchableWithoutFeedback, Keyboard } from 'react-native'; // Add this import
import {
  View,
  Text,
  StyleSheet,
  Image,
  Dimensions,
  TouchableOpacity,
  Modal,
  TextInput,
  Button,
  ActivityIndicator,
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { db } from '../firebase'; // Firebase initialization
import { doc, getDoc, setDoc } from 'firebase/firestore';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

const recommendationsData = [
  {
    id: '1',
    name: 'Hisense – HRB17IN6A*E',
    price: 899,
    usage: 453,
    image: require('../assets/bedroom.png'),
  },
  {
    id: '2',
    name: 'Whirlpool – WRB533CZJ',
    price: 899,
    usage: 494,
    image: require('../assets/bedroom.png'),
  },
];

interface AppliancePopupProps {
  userId: string;
  userUsage?: number;
  averageUsage?: number;
  recommendations?: typeof recommendationsData;
  onClose: () => void;
  appliance: string;
}

export default function AppliancePopup({
  userId,
  userUsage = 600,
  averageUsage = 500,
  recommendations = recommendationsData,
  onClose,
}: AppliancePopupProps) {
  const [current, setCurrent] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const [form, setForm] = useState({ name: '', usage: '', image: null });

  // Fetch current appliance on mount
  useEffect(() => {
    (async () => {
      try {
        const userDoc = await getDoc(doc(db, 'users', userId));
        if (userDoc.exists() && userDoc.data().currentAppliance) {
          setCurrent(userDoc.data().currentAppliance);
        }
      } catch (err) {
        console.warn('Error fetching current appliance', err);
      } finally {
        setLoading(false);
      }
    })();
  }, [userId]);

  // Save appliance data back to Firestore
  const handleSave = async () => {
    if (!form.name || !form.usage) {
      alert('Fill all fields!');
      return;
    }
    const newAppliance = {
      name: form.name,
      usage: parseInt(form.usage, 10),
      image: form.image, // In production, upload to Storage & save URL
    };
    try {
      await setDoc(
        doc(db, 'users', userId),
        { currentAppliance: newAppliance },
        { merge: true }
      );
      setCurrent(newAppliance);
      setModalVisible(false);
    } catch (err) {
      console.warn('Error saving appliance', err);
      alert('Failed to save.');
    }
  };

  if (loading) {
    return (
      <View style={styles.overlay}>
        <ActivityIndicator size="large" color="#333" />
      </View>
    );
  }

  return (
    <View style={styles.overlay}>
      {/* Back button */}
      <TouchableOpacity style={styles.backButtonModal} onPress={onClose}>
        <Text style={styles.backTextModal}>← Back</Text>
      </TouchableOpacity>

      <View style={styles.popup}>
        {/* Current Appliance Card */}
        <View style={styles.recCard}>
          <Image
            source={require('../assets/bedroom.png')}
            style={styles.recImage}
            resizeMode="contain"
          />
          <View style={styles.recInfo}>
            <Text style={styles.recName}>{current?.name || 'YOUR FRIDGE'}</Text>
            <Text style={styles.recUsage}>
              {current?.usage || '500'} Kilowatt‑Hours per year
            </Text>
          </View>
          <TouchableOpacity
            style={styles.editButton}
            onPress={() => {
              setForm({
                name: current?.name || '',
                usage: String(current?.usage || ''),
                image: current?.image || null,
              });
              setModalVisible(true);
            }}
          >
            <Text style={styles.editText}>Edit</Text>
          </TouchableOpacity>
        </View>

        {/* Usage Cards */}
        <View style={styles.usageRow}>
          <View style={styles.usageCard}>
            <Text style={styles.cardLabel}>Your Usage</Text>
            <Text style={styles.cardValue}>{userUsage}</Text>
            <Text style={styles.cardUnit}>
              Kilowatt‑Hours{'\n'}per year
            </Text>
          </View>
          <View style={styles.usageCard}>
            <Text style={styles.cardLabel}>Average Usage</Text>
            <Text style={styles.cardValue}>{averageUsage}</Text>
            <Text style={styles.cardUnit}>
              Kilowatt‑Hours{'\n'}per year
            </Text>
          </View>
        </View>

        {/* Recommendations */}
        <Text style={styles.sectionTitle}>Recommendations</Text>
        {recommendations.map((item) => (
          <View key={item.id} style={styles.recCard}>
            <Image source={item.image} style={styles.recImage} resizeMode="contain" />
            <View style={styles.recInfo}>
              <Text style={styles.recName}>{item.name}</Text>
              <Text style={styles.recPrice}>${item.price}</Text>
              <Text style={styles.recUsage}>
                {item.usage} Kilowatt‑Hours per year
              </Text>
            </View>
          </View>
        ))}

        {/* Pagination Dots */}
        <View style={styles.dots}>
          {[0, 1, 2, 3].map((_, i) => (
            <View
              key={i}
              style={[styles.dot, i === 0 ? styles.dotActive : styles.dotInactive]}
            />
          ))}
        </View>
      </View>

      {/* Edit Modal */}
      <Modal transparent animationType="slide" visible={modalVisible}>
  <TouchableWithoutFeedback
    onPress={() => setModalVisible(false)}
  >
    <View style={styles.modalOverlay}>
      <TouchableWithoutFeedback onPress={() => null}>
        <View style={styles.modalContent}>
          <Text style={{ fontSize: 18, marginBottom: 12 }}>Edit Appliance</Text>
          <TouchableOpacity>
            <Text style={styles.pickImage}>📷 Select Image</Text>
          </TouchableOpacity>
          {form.image && (
            <Image
              source={{ uri: form.image }}
              style={{ width: 100, height: 100, marginVertical: 8 }}
            />
          )}
          <TextInput
            placeholder="Name"
            style={styles.input}
            value={form.name}
            onChangeText={(t) => setForm((f) => ({ ...f, name: t }))}
          />
          <TextInput
            placeholder="Usage (kWh/year)"
            keyboardType="numeric"
            style={styles.input}
            value={form.usage}
            onChangeText={(t) => setForm((f) => ({ ...f, usage: t }))}
          />
          <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <Button title="Cancel" onPress={() => setModalVisible(false)} />
            <Button title="Save" onPress={handleSave} />
          </View>
        </View>
      </TouchableWithoutFeedback>
    </View>
  </TouchableWithoutFeedback>
</Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.14)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  popup: {
    width: SCREEN_WIDTH * 0.9,
    backgroundColor: '#DCECC3',
    borderRadius: 20,
    padding: 20,
  },
  usageRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  usageCard: {
    width: '48%',
    backgroundColor: '#FFF',
    borderRadius: 15,
    paddingVertical: 10,
    alignItems: 'center',
  },
  cardLabel: { fontSize: 16, fontWeight: '600', marginBottom: 8 },
  cardValue: { fontSize: 48, fontWeight: 'bold', lineHeight: 52 },
  cardUnit: { fontSize: 12, textAlign: 'center', marginTop: 4, lineHeight: 16 },
  sectionTitle: { fontSize: 18, fontWeight: '600', marginBottom: 12 },
  recCard: {
    flexDirection: 'row',
    backgroundColor: '#FFF',
    borderRadius: 15,
    padding: 10,
    alignItems: 'center',
    marginBottom: 10,
  },
  recImage: { width: 60, height: 60, marginRight: 12 },
  recInfo: { flex: 1 },
  recName: { fontSize: 14, fontWeight: '600' },
  recPrice: { fontSize: 16, fontWeight: 'bold', marginVertical: 4 },
  recUsage: { fontSize: 12, color: '#666' },
  editButton: { padding: 6, backgroundColor: '#2E4C17', borderRadius: 6 },
  editText: { color: '#FFF', fontSize: 12 },
  dots: { flexDirection: 'row', justifyContent: 'center', marginTop: 10 },
  dot: { width: 8, height: 8, borderRadius: 4, marginHorizontal: 4 },
  dotActive: { backgroundColor: '#2E4C17' },
  dotInactive: { backgroundColor: '#C9D7B5' },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    width: SCREEN_WIDTH * 0.8,
    backgroundColor: '#FFF',
    borderRadius: 12,
    padding: 20,
  },
  pickImage: { color: '#2E4C17', marginBottom: 8 },
  input: {
    borderWidth: 1,
    borderColor: '#CCC',
    borderRadius: 8,
    padding: 8,
    marginBottom: 12,
  },
  backButtonModal: {
    position: 'absolute',
    top: 45,
    left: 10,
    zIndex: 10,
    padding: 10,
  },
  backTextModal: {
    fontSize: 18,
    color: '#3E2C1D',
    fontWeight: '500',
  },
});