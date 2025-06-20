import React, { useState, useContext } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Platform,
  KeyboardAvoidingView,
  SafeAreaView,
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { Ionicons } from '@expo/vector-icons';
import { RegistrationContext } from '../../../context/RegistrationContext';



export default function StepRiskTolerance({ onNext, onBack }) {
  const [riskTolerance, setRiskTolerance] = useState('MEDIUM');
  const { updateForm } = useContext(RegistrationContext); // ✅ Usar contexto

  const handleNext = () => {
    updateForm({ risk_tolerance: riskTolerance }); // ✅ Guardar en formData
    onNext();
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 80 : 0}
      >
        {/* Botón back */}
        <TouchableOpacity onPress={onBack} style={styles.backButton}>
          <Ionicons name="arrow-back" size={28} color="#0A3756" />
        </TouchableOpacity>

        {/* Logo */}
        <Image
          source={require('../../../assets/imagenes/BONSAILOGO.png')}
          style={styles.logo}
          resizeMode="contain"
        />

        {/* Progreso */}
        <View style={styles.progressWrapper}>
          <View style={styles.progressBarBackground}>
            <View style={styles.progressBarFill} />
          </View>
          <Text style={styles.step}>4 Of 9</Text>
        </View>

        {/* Contenido */}
        <View style={styles.contentBlock}>
          <Text style={styles.title}>Risk Tolerance</Text>
          <Text style={styles.subtitle}>
            Select the option that best represents your risk tolerance.
          </Text>

          <View style={styles.pickerWrapper}>
            <Picker
              selectedValue={riskTolerance}
              onValueChange={(itemValue) => setRiskTolerance(itemValue)}
              style={styles.picker}
            >
              <Picker.Item label="High" value="HIGH" />
              <Picker.Item label="Medium" value="MEDIUM" />
              <Picker.Item label="Low" value="LOW" />
            </Picker>
          </View>
        </View>

        {/* Botón Next */}
        <View style={styles.absoluteButtonWrapper}>
          <TouchableOpacity style={styles.button} onPress={handleNext}>
            <Text style={styles.buttonText}>Next</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 40,
    paddingHorizontal: 24,
    backgroundColor: '#fff',
  },
  backButton: {
    position: 'absolute',
    top: 38,
    left: 16,
    zIndex: 10,
    padding: 8,
  },
  logo: {
    width: 50,
    height: 50,
    marginBottom: 16,
    alignSelf: 'center',
  },
  progressWrapper: {
    width: 300,
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'center',
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
    width: '42.8%',
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
    alignSelf: 'center',
    marginTop: 40,
    marginBottom: 40,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 6,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 14,
    color: '#555',
    marginBottom: 24,
    textAlign: 'center',
  },
  pickerWrapper: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    overflow: 'hidden',
  },
  picker: {
    height: 50,
    width: '100%',
  },
  absoluteButtonWrapper: {
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
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
