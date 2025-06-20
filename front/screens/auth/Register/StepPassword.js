import React, { useState, useContext } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Image,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { RegistrationContext } from '../../../context/RegistrationContext';


export default function StepPassword({ onNext, onBack }) {
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');

  const { updateForm } = useContext(RegistrationContext); // ✅ Usar contexto

  const isMinLength = password.length >= 8;
  const hasUppercase = /[A-Z]/.test(password);
  const hasNumber = /\d/.test(password);
  const hasSpecialChar = /[^A-Za-z0-9]/.test(password);
  const isValidPassword = isMinLength && hasUppercase && hasNumber && hasSpecialChar;

  const handleNext = () => {
    if (!isValidPassword) {
      setError('Please enter a valid password.');
      return;
    }
    setError('');

    // ✅ Guardar contraseña en contexto
    updateForm({ password });

    onNext();
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 80 : 0}
      >
        <View style={styles.container}>
          <TouchableOpacity onPress={onBack} style={styles.backButton}>
            <Ionicons name="arrow-back" size={24} color="#0A3756" />
          </TouchableOpacity>

          <Image
            source={require('../../../assets/imagenes/BONSAILOGO.png')}
            style={styles.logo}
            resizeMode="contain"
          />

          <View style={styles.progressWrapper}>
            <View style={styles.progressBarBackground}>
              <View style={[styles.progressBarFill, { width: '42.8%' }]} />
            </View>
            <Text style={styles.step}>5 Of 9</Text>
          </View>

          <View style={styles.contentBlock}>
            <Text style={styles.title}>Protect your account</Text>
            <Text style={styles.subtitle}>Create a secure password</Text>

            <Text style={styles.label}>Password</Text>
            <View style={styles.passwordContainer}>
              <TextInput
                placeholder="Password"
                secureTextEntry={!showPassword}
                style={styles.input}
                value={password}
                onChangeText={setPassword}
              />
              <TouchableOpacity
                onPress={() => setShowPassword(!showPassword)}
                style={styles.eyeIcon}
              >
                <Ionicons
                  name={showPassword ? 'eye-off-outline' : 'eye-outline'}
                  size={20}
                  color="#999"
                />
              </TouchableOpacity>
            </View>

            <View style={styles.rules}>
              <RuleItem valid={isMinLength} text="Minimum 8 characters" />
              <RuleItem valid={hasUppercase} text="At least 1 uppercase letter" />
              <RuleItem valid={hasNumber} text="At least 1 number" />
              <RuleItem valid={hasSpecialChar} text="At least 1 special character" />
            </View>

            {error ? <Text style={styles.errorText}>{error}</Text> : null}
          </View>

          {/* Botón fijo abajo */}
          <View style={styles.fixedButtonWrapper}>
            <TouchableOpacity
              style={[styles.button, !isValidPassword && styles.buttonDisabled]}
              disabled={!isValidPassword}
              onPress={handleNext}
            >
              <Text style={styles.buttonText}>Next</Text>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

function RuleItem({ valid, text }) {
  return (
    <View style={styles.ruleItem}>
      <Ionicons
        name={valid ? 'checkmark-circle' : 'ellipse-outline'}
        size={16}
        color={valid ? '#00B27A' : '#bbb'}
        style={{ marginRight: 8 }}
      />
      <Text style={[styles.ruleText, valid && styles.ruleTextValid]}>{text}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    paddingTop: 40,
    paddingHorizontal: 24,
    backgroundColor: '#fff',
  },
  backButton: {
    position: 'absolute',
    top: 40,
    left: 20,
    zIndex: 10,
  },
  logo: {
    width: 50,
    height: 50,
    marginBottom: 16,
  },
  progressWrapper: {
    width: 300,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  progressBarBackground: {
    flex: 1,
    height: 12,
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
  step: {
    fontSize: 13,
    color: '#333',
  },
  contentBlock: {
    width: 300,
    alignItems: 'flex-start',
    marginBottom: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 6,
  },
  subtitle: {
    fontSize: 14,
    color: '#555',
    marginBottom: 24,
  },
  label: {
    fontSize: 14,
    color: '#555',
    marginBottom: 6,
  },
  passwordContainer: {
    width: '100%',
    position: 'relative',
    marginBottom: 8,
  },
  input: {
    width: '100%',
    height: 50,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ddd',
    backgroundColor: '#fff',
    paddingHorizontal: 16,
    fontSize: 16,
  },
  eyeIcon: {
    position: 'absolute',
    right: 12,
    top: 14,
  },
  rules: {
    marginTop: 12,
    marginBottom: 8,
  },
  ruleItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
  },
  ruleText: {
    fontSize: 12,
    color: '#777',
  },
  ruleTextValid: {
    color: '#00B27A',
    fontWeight: '600',
  },
  errorText: {
    color: 'red',
    fontSize: 12,
    marginTop: 6,
  },
  fixedButtonWrapper: {
    position: 'absolute',
    bottom: 20,
    left: 0,
    right: 0,
    alignItems: 'center',
  },
  button: {
    width: 300,
    height: 48,
    backgroundColor: '#0A3756',
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonDisabled: {
    backgroundColor: '#A8A8A8',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
