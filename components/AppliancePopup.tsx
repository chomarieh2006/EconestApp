import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  Button,
  ActivityIndicator,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import televisions from '../JSONs/televisions.json';
import airConditioners from '../JSONs/air_conditioners.json';
import downlights from '../JSONs/downlights.json';
import { Picker } from '@react-native-picker/picker';
import { doc, setDoc, arrayUnion, updateDoc, getDoc } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { db } from '../firebase';
import { useRoute, RouteProp, useNavigation } from '@react-navigation/native';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

type ApplianceModalParams = {
  ApplianceModal: {
    userId: string;
    appliance: string;
  };
};

const AppliancePopup = () => {
  const route = useRoute<RouteProp<ApplianceModalParams, 'ApplianceModal'>>();
  const navigation = useNavigation();
  const { userId, appliance } = route.params;

  const [current, setCurrent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const [form, setForm] = useState({ name: '', usage: '', image: null });
  const [selectedValue, setSelectedValue] = useState<string>('');

  useEffect(() => {
    (async () => {
      try {
        const userDoc = await getDoc(doc(db, 'users', userId));
        if (userDoc.exists() && userDoc.data().currentAppliance) {
          setCurrent(userDoc.data().currentAppliance);
        }
      } catch (err) {
        console.warn('Error fetching appliance', err);
      } finally {
        setLoading(false);
      }
    })();
  }, [userId]);

  const getDropdownFromAppliance = (appliance: string) => {
    let data = [];
    if (appliance === 'TV') {
      data = televisions.map(item => ({
        label: `${item['Brand Name']} - ${item['Model Number']}`,
        value: item['Model Number'],
        fullData: {
          name: item['Model Number'],
          brand: item['Brand Name'],
          usage: item['Reported Annual Energy Consumption (kWh)'] || 0,
        },
      }));
    } else if (appliance === 'Lamp') {
      data = downlights.map(item => ({
        label: `${item['Brand Name']} ${item['Model Number']}`,
        value: item['Model Number'],
        fullData: {
          name: item['Model Number'],
          brand: item['Brand Name'],
          usage: item['Total Input Power (Watts)'] || 0,
        },
      }));
    } else if (appliance === 'Air Conditioner') {
      data = airConditioners.map(item => ({
        label: `${item['Brand Name']} ${item['Model Number']}`,
        value: item['Model Number'],
        fullData: {
          name: item['Model Number'],
          brand: item['Brand Name'],
          usage: item['Annual Energy Use (kWh/yr)'] || 0,
        },
      }));
    }
    return data;
  };

  const dropdownOptions = getDropdownFromAppliance(appliance);

  const handleSave = async () => {
    if (!form.name || !form.usage) {
      alert('Fill all fields!');
      return;
    }

    const auth = getAuth();
    const user = auth.currentUser;
    if (!user) {
      alert('No logged-in user!');
      return;
    }

    const userRef = doc(db, 'users', user.uid);
    const userSnap = await getDoc(userRef);

    const selected = dropdownOptions.find(opt => opt.value === selectedValue);
    const newAppliance = selected
      ? selected.fullData
      : {
          name: form.name,
          usage: parseInt(form.usage, 10),
          brand: selected.fullData.brand,
          image: form.image,
        };

    try {
      if (userSnap.exists()) {
        // Document exists, safely use arrayUnion
        await updateDoc(userRef, {
          [`AppliancesMap.${appliance}`]: arrayUnion(form.name)
        });
      } else {
        // Create the document with proper map + array structure
        await setDoc(userRef, {
          AppliancesMap: {
            [appliance]: [form.name] // ✅ now it's a real array in a map
          }
        });
      }

      alert(`${appliance} saved successfully!`);
      setModalVisible(false);
    } catch (err) {
      console.error('Error saving appliance:', err);
      alert('Failed to save appliance.');
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
      <TouchableOpacity style={styles.backButtonModal} onPress={() => navigation.goBack()}>
        <Text style={styles.backTextModal}>← Back</Text>
      </TouchableOpacity>

      <View style={styles.popup}>
        <View style={styles.recCard}>
          <Image source={require('../assets/bedroom.png')} style={styles.recImage} resizeMode="contain" />
          <View style={styles.recInfo}>
            <Text style={styles.recName}>{current?.name || appliance}</Text>
            <Text style={styles.recUsage}>{current?.usage || '500'} kWh/year</Text>
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
            }}>
            <Text style={styles.editText}>Edit</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.usageRow}>
          <View style={styles.usageCard}>
            <Text style={styles.cardLabel}>Your Usage</Text>
            <Text style={styles.cardValue}>{current?.usage || 600}</Text>
            <Text style={styles.cardUnit}>kWh/year</Text>
          </View>
          <View style={styles.usageCard}>
            <Text style={styles.cardLabel}>Average Usage</Text>
            <Text style={styles.cardValue}>500</Text>
            <Text style={styles.cardUnit}>kWh/year</Text>
          </View>
        </View>

        {modalVisible && (
          <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>Edit Appliance</Text>

              <Picker
                selectedValue={selectedValue ?? ''}
                onValueChange={(value) => {
                  if (!value) return;
                  setSelectedValue(value);
                  const selected = dropdownOptions.find(opt => opt.value === value);
                  if (selected) {
                    setForm({
                      name: selected.fullData.name,
                      usage: String(selected.fullData.usage),
                      image: null,
                    });
                  }
                }}>
                <Picker.Item label={`Select a ${appliance} model...`} value="" />
                {dropdownOptions.map((item) => (
                  <Picker.Item key={item.value} label={item.label} value={item.value} />
                ))}
              </Picker>

              <Text style={styles.confirmedLabel}>Selected: {form.name}</Text>
              <Text style={styles.confirmedLabel}>Usage: {form.usage} kWh/year</Text>
              <View style={styles.buttonContainer}>
                <Button title="Cancel" onPress={() => setModalVisible(false)} />
                <Button title="Save" onPress={handleSave} />
              </View>
            </View>
          </View>
        )}
      </View>
    </View>
  );
};

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
  recUsage: { fontSize: 12, color: '#666' },
  editButton: { padding: 6, backgroundColor: '#2E4C17', borderRadius: 6 },
  editText: { color: '#FFF', fontSize: 12 },
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
  confirmedLabel: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 12,
    textAlign: 'center',
    color: '#333',
  },
  cardLabel: { fontSize: 16, fontWeight: '600', marginBottom: 8 },
  cardValue: { fontSize: 48, fontWeight: 'bold', lineHeight: 52 },
  cardUnit: { fontSize: 12, textAlign: 'center', marginTop: 4, lineHeight: 16 },
  modalOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 100,
  },
  modalContent: {
    width: SCREEN_WIDTH * 0.85,
    backgroundColor: '#FFF',
    borderRadius: 12,
    padding: 20,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 12,
    textAlign: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 12,
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

export default AppliancePopup;
