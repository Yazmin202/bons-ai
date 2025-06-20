import React, { useState, useEffect, useContext } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Keyboard,
  Dimensions,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { RegistrationContext } from '@context/RegistrationContext';

const { height } = Dimensions.get('window');

export default function StepAddress({ onNext }) {
  const { updateForm } = useContext(RegistrationContext);

  const [country, setCountry] = useState('');
  const [state, setState] = useState('');
  const [city, setCity] = useState('');
  const [addressLine, setAddressLine] = useState('');
  const [zipCode, setZipCode] = useState('');
  const [keyboardVisible, setKeyboardVisible] = useState(false);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    const show = Keyboard.addListener('keyboardDidShow', () => setKeyboardVisible(true));
    const hide = Keyboard.addListener('keyboardDidHide', () => setKeyboardVisible(false));
    return () => {
      show.remove();
      hide.remove();
    };
  }, []);

  const validateAndContinue = () => {
    let newErrors = {};
    if (!country.trim()) newErrors.country = 'Country is required';
    if (!state.trim()) newErrors.state = 'State or province is required';
    if (!city.trim()) newErrors.city = 'City is required';
    if (!addressLine.trim()) newErrors.addressLine = 'Address is required';
    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      updateForm({
        country,
        state,
        city,
        address_line: addressLine,
        zip_code: zipCode,
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
            <View style={[styles.progressBarFill, { width: '28.6%' }]} />
          </View>
          <Text style={styles.step}>2 Of 7</Text>
        </View>

        <ScrollView contentContainerStyle={styles.scrollForm} keyboardShouldPersistTaps="handled">
          <Text style={styles.title}>Address Information</Text>

          <Text style={styles.sectionTitle}>Location</Text>
          <TextInput
            style={[styles.input, errors.country && styles.errorInput]}
            placeholder="Country"
            value={country}
            onChangeText={setCountry}
          />
          {errors.country && <Text style={styles.errorText}>{errors.country}</Text>}

          <TextInput
            style={[styles.input, errors.state && styles.errorInput]}
            placeholder="State or Province"
            value={state}
            onChangeText={setState}
          />
          {errors.state && <Text style={styles.errorText}>{errors.state}</Text>}

          <TextInput
            style={[styles.input, errors.city && styles.errorInput]}
            placeholder="City"
            value={city}
            onChangeText={setCity}
          />
          {errors.city && <Text style={styles.errorText}>{errors.city}</Text>}

          <TextInput
            style={[styles.input, errors.addressLine && styles.errorInput]}
            placeholder="Full Address"
            value={addressLine}
            onChangeText={setAddressLine}
          />
          {errors.addressLine && <Text style={styles.errorText}>{errors.addressLine}</Text>}

          <TextInput
            style={styles.input}
            placeholder="ZIP Code (optional)"
            keyboardType="numeric"
            value={zipCode}
            onChangeText={setZipCode}
          />
        </ScrollView>

        {!keyboardVisible && (
          <View style={styles.bottomSection}>
            <TouchableOpacity style={styles.button} onPress={onNext}>
              <Text style={styles.buttonText}>Next</Text>
            </TouchableOpacity>
            <Text style={styles.privacyText}>
              I acknowledge that my data will be used to personalize my experience.
            </Text>
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
  input: {
    height: 56,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#ccc',
    paddingHorizontal: 16,
    backgroundColor: '#fff',
    marginBottom: 12,
  },
  errorInput: { borderColor: '#D00' },
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
  privacyText: { fontSize: 12, color: '#666', textAlign: 'center' },
});
