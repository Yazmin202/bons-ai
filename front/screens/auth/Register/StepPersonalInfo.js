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

export default function StepPersonalInfo({ onNext }) {
  const { updateForm } = useContext(RegistrationContext);

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [nationalId, setNationalId] = useState('');
  const [altEmail, setAltEmail] = useState('');
  const [dayOfBirth, setDayOfBirth] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');
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
    if (!firstName.trim()) newErrors.firstName = 'First name is required';
    if (!lastName.trim()) newErrors.lastName = 'Last name is required';
    if (!nationalId.trim()) newErrors.nationalId = 'National ID is required';
    if (!altEmail.includes('@')) newErrors.altEmail = 'Alt email is invalid';
    if (!dayOfBirth.trim() || !/^\d{4}-\d{2}-\d{2}$/.test(dayOfBirth)) {
      newErrors.dayOfBirth = 'Date must be in YYYY-MM-DD format';
    }
    if (!email.includes('@') || !email.includes('.')) newErrors.email = 'Invalid email address';
    if (password.length < 6) newErrors.password = 'Password must be at least 6 characters';
    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      updateForm({
        name: `${firstName} ${lastName}`.trim(),
        national_id: nationalId,
        alt_email: altEmail,
        day_of_birth: dayOfBirth,
        email,
        password,
        phone,
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
            <View style={styles.progressBarFill} />
          </View>
          <Text style={styles.step}>1 Of 7</Text>
        </View>

        <ScrollView contentContainerStyle={styles.scrollForm} keyboardShouldPersistTaps="handled">
          <Text style={styles.title}>Create Account</Text>

          <Text style={styles.sectionTitle}>Personal Info</Text>
          <TextInput
            style={[styles.input, errors.firstName && styles.errorInput]}
            placeholder="First name"
            value={firstName}
            onChangeText={setFirstName}
          />
          {errors.firstName && <Text style={styles.errorText}>{errors.firstName}</Text>}

          <TextInput
            style={[styles.input, errors.lastName && styles.errorInput]}
            placeholder="Last name"
            value={lastName}
            onChangeText={setLastName}
          />
          {errors.lastName && <Text style={styles.errorText}>{errors.lastName}</Text>}

          <Text style={styles.sectionTitle}>Contact Info</Text>
          <TextInput
            style={[styles.input, errors.email && styles.errorInput]}
            placeholder="Email address"
            keyboardType="email-address"
            value={email}
            onChangeText={setEmail}
          />
          {errors.email && <Text style={styles.errorText}>{errors.email}</Text>}

          <TextInput
            style={styles.input}
            placeholder="Phone"
            keyboardType="phone-pad"
            value={phone}
            onChangeText={setPhone}
          />

          <TextInput
            style={[styles.input, errors.altEmail && styles.errorInput]}
            placeholder="Alternative email"
            keyboardType="email-address"
            value={altEmail}
            onChangeText={setAltEmail}
          />
          {errors.altEmail && <Text style={styles.errorText}>{errors.altEmail}</Text>}

          <Text style={styles.sectionTitle}>Identity</Text>
          <TextInput
            style={[styles.input, errors.nationalId && styles.errorInput]}
            placeholder="National ID"
            value={nationalId}
            onChangeText={setNationalId}
          />
          {errors.nationalId && <Text style={styles.errorText}>{errors.nationalId}</Text>}

          <TextInput
            style={[styles.input, errors.dayOfBirth && styles.errorInput]}
            placeholder="Date of Birth (YYYY-MM-DD) 🎂"
            value={dayOfBirth}
            onChangeText={setDayOfBirth}
          />
          {errors.dayOfBirth && <Text style={styles.errorText}>{errors.dayOfBirth}</Text>}
        </ScrollView>

        {!keyboardVisible && (
          <View style={styles.bottomSection}>
            <TouchableOpacity style={styles.button} onPress={onNext}>
              <Text style={styles.buttonText}>Next</Text>
            </TouchableOpacity>

            
            <Text style={styles.privacyText}>
              I acknowledge that my personal data will be processed according to the{' '}
              <Text style={{ textDecorationLine: 'underline' }}>Privacy Policy</Text>.
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
    width: '14.3%',
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
