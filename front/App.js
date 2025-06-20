import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import AuthNavigator from './navigation/AuthNavigator';
import { RegistrationProvider } from './context/RegistrationContext';

export default function App() {
  return (
    <RegistrationProvider>
      <NavigationContainer>
        <AuthNavigator />
      </NavigationContainer>
    </RegistrationProvider>
  );
}
