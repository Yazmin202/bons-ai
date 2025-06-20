import React, { useState, useEffect, useContext } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Keyboard,
  Dimensions,
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { Ionicons } from '@expo/vector-icons';
import { RegistrationContext } from '@context/RegistrationContext';

const { height } = Dimensions.get('window');

export default function StepOccupation({ onNext }) {
  const { updateForm } = useContext(RegistrationContext);

  const [occupation, setOccupation] = useState('');
  const [incomeRange, setIncomeRange] = useState('');
  const [liquidityLevel, setLiquidityLevel] = useState('');
  const [errors, setErrors] = useState({});
  const [keyboardVisible, setKeyboardVisible] = useState(false);

  useEffect(() => {
    const show = Keyboard.addListener('keyboardDidShow', () => setKeyboardVisible(true));
    const hide = Keyboard.addListener('keyboardDidHide', () => setKeyboardVisible(false));
    return () => {
      show.remove();
      hide.remove();
    };
  }, []);

  const handleContinue = () => {
    const newErrors = {};
    if (!occupation) newErrors.occupation = 'Occupation is required';
    if (!incomeRange) newErrors.incomeRange = 'Annual income is required';
    if (!liquidityLevel) newErrors.liquidityLevel = 'Liquidity level is required';

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      updateForm({
        occupation,
        income_range: incomeRange,
        liquidity_level: liquidityLevel,
      });
      onNext();
    }
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <View style={styles.container}>
        <TouchableOpacity style={styles.backButton}>
          <Ionicons name="arrow-back" size={28} color="#0A3756" />
        </TouchableOpacity>

        <Image
          source={require('@assets/imagenes/BONSAILOGO.png')}
          style={styles.logoImage}
          resizeMode="contain"
        />

        <View style={styles.progressWrapper}>
          <View style={styles.progressBarBackground}>
            <View style={[styles.progressBarFill, { width: '42.9%' }]} />
          </View>
          <Text style={styles.step}>3 Of 7</Text>
        </View>

        <ScrollView contentContainerStyle={styles.scrollForm} keyboardShouldPersistTaps="handled">
          <Text style={styles.title}>Occupation Info</Text>

          <Text style={styles.sectionTitle}>Occupation</Text>
          <View style={styles.pickerWrapper}>
            <Picker selectedValue={occupation} onValueChange={setOccupation}>
              <Picker.Item label="Select occupation..." value="" />
              <Picker.Item label="Employee" value="EMP" />
              <Picker.Item label="Self-employed" value="SEL" />
              <Picker.Item label="Business Owner" value="BUS" />
              <Picker.Item label="Student" value="STU" />
              <Picker.Item label="Homemaker" value="HOM" />
              <Picker.Item label="Retired" value="RET" />
              <Picker.Item label="Unemployed" value="UNP" />
              <Picker.Item label="Public Employee" value="GOV" />
              <Picker.Item label="Technician" value="TEC" />
              <Picker.Item label="Professional" value="PRO" />
              <Picker.Item label="Military" value="MIL" />
              <Picker.Item label="Other" value="OTH" />
            </Picker>
          </View>
          {errors.occupation && <Text style={styles.errorText}>{errors.occupation}</Text>}

          <Text style={styles.sectionTitle}>Annual Income</Text>
          <View style={styles.pickerWrapper}>
            <Picker selectedValue={incomeRange} onValueChange={setIncomeRange}>
              <Picker.Item label="Select income range..." value="" />
              <Picker.Item label="0 - 25K" value="0-25K" />
              <Picker.Item label="26 - 50K" value="26-50K" />
              <Picker.Item label="51 - 100K" value="51-100K" />
              <Picker.Item label="101 - 250K" value="101-250K" />
              <Picker.Item label="250K+" value="250K+" />
            </Picker>
          </View>
          {errors.incomeRange && <Text style={styles.errorText}>{errors.incomeRange}</Text>}

          <Text style={styles.sectionTitle}>Liquidity Level</Text>
          <View style={styles.pickerWrapper}>
            <Picker selectedValue={liquidityLevel} onValueChange={setLiquidityLevel}>
              <Picker.Item label="Select liquidity level..." value="" />
              <Picker.Item label="0 - 30 Days" value="0-30" />
              <Picker.Item label="30 - 60 Days" value="30-60" />
              <Picker.Item label="60 - 90 Days" value="60-90" />
            </Picker>
          </View>
          {errors.liquidityLevel && <Text style={styles.errorText}>{errors.liquidityLevel}</Text>}
        </ScrollView>

        {!keyboardVisible && (
          <View style={styles.bottomSection}>
            <TouchableOpacity style={styles.button} onPress={onNext}>
              <Text style={styles.buttonText}>Next</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', paddingHorizontal: 24 },
  backButton: { marginTop: 40, alignSelf: 'flex-start' },
  logoImage: { width: 60, height: 60, alignSelf: 'center', marginBottom: 12 },
  progressWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'center',
    marginBottom: 12,
    width: '90%',
  },
  progressBarBackground: {
    flex: 1,
    height: 10,
    backgroundColor: '#D8F2F4',
    borderRadius: 50,
    overflow: 'hidden',
    marginRight: 10,
  },
  progressBarFill: {
    height: '100%',
    backgroundColor: '#4FC1D1',
    borderRadius: 50,
  },
  step: { fontSize: 13, color: '#333' },
  scrollForm: { paddingBottom: 100 },
  title: { fontSize: 24, fontWeight: 'bold', marginTop: 16, marginBottom: 24 },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#0A3756',
    marginTop: 24,
    marginBottom: 8,
  },
  pickerWrapper: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 12,
    backgroundColor: '#fff',
    marginBottom: 12,
  },
  errorText: { color: '#D00', fontSize: 13, marginTop: -8, marginBottom: 8 },
  bottomSection: {
    alignItems: 'center',
    marginBottom: 20,
    paddingHorizontal: 24,
  },
  button: {
    backgroundColor: '#0A3756',
    width: '100%',
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  buttonText: { color: '#fff', fontSize: 18, fontWeight: 'bold' },
});
