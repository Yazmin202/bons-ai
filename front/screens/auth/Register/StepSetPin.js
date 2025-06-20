import React, { useState, useRef, useContext } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  TextInput,
} from 'react-native';
import { RegistrationContext } from '../../../context/RegistrationContext';

export default function StepSetPin({ onNext, onBack }) {
  const [pin, setPin] = useState('');
  const inputRef = useRef(null);
  const { updateForm } = useContext(RegistrationContext);

  const handleChange = (text) => {
    const cleaned = text.replace(/[^0-9]/g, '').slice(0, 6);
    setPin(cleaned);
  };

  const handleContinue = () => {
    if (pin.length === 6) {
      updateForm({ pin });
      onNext();
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 80 : 0}
      >
        {/* Logo */}
        <Image
          source={require('../../../assets/imagenes/BONSAILOGO.png')}
          style={styles.logo}
          resizeMode="contain"
        />

        {/* Barra de progreso */}
        <View style={styles.progressWrapper}>
          <View style={styles.progressBarBackground}>
            <View style={styles.progressBarFill} />
          </View>
          <Text style={styles.step}>8 Of 9</Text>
        </View>

        {/* Contenido */}
        <View style={styles.contentBlock}>
          <Text style={styles.title}>Set up your mobile PIN</Text>
          <Text style={styles.subtitle}>
            This mobile PIN allows you to access and confirm operations in the app.
          </Text>

          <TouchableOpacity onPress={() => inputRef.current.focus()} activeOpacity={1}>
            <View style={styles.pinWrapper}>
              {Array.from({ length: 6 }).map((_, index) => (
                <View
                  key={index}
                  style={[
                    styles.pinCircle,
                    pin.length > index && styles.pinCircleFilled,
                  ]}
                />
              ))}
            </View>
            <TextInput
              ref={inputRef}
              style={styles.inputOverlay}
              keyboardType="number-pad"
              maxLength={6}
              value={pin}
              onChangeText={handleChange}
              autoFocus
            />
          </TouchableOpacity>
        </View>

        {/* Botón Next */}
        <View style={styles.bottomButtonWrapper}>
          <TouchableOpacity
            style={[styles.button, pin.length === 6 ? {} : { backgroundColor: '#ccc' }]}
            onPress={handleContinue}
            disabled={pin.length !== 6}
          >
            <Text style={styles.buttonText}>Next</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', paddingTop: 40, paddingHorizontal: 24 },
  logo: { width: 50, height: 50, marginBottom: 16 },
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
    width: '85.7%',
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
    alignItems: 'center',
    marginBottom: 40,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 6,
    textAlign: 'center',
    width: 300,
  },
  subtitle: {
    fontSize: 14,
    color: '#555',
    marginBottom: 24,
    textAlign: 'center',
    width: 300,
  },
  pinWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: 240,
    marginBottom: 8,
  },
  pinCircle: {
    width: 20,
    height: 20,
    borderWidth: 2,
    borderColor: '#66CEDF',
    borderRadius: 10,
    backgroundColor: '#fff',
  },
  pinCircleFilled: {
    backgroundColor: '#0A3756',
  },
  inputOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    height: 50,
    width: 240,
    opacity: 0,
  },
  bottomButtonWrapper: {
    position: 'absolute',
    bottom: 20,
    left: 0,
    right: 0,
    alignItems: 'center',
    zIndex: 5,
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
