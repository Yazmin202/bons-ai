import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import SplashScreen from '../screens/auth/SplashScreen';
import WelcomeScreen from '../screens/auth/WelcomeScreen';
import StepPersonalInfo from '../screens/auth/Register/StepPersonalInfo';
import StepAddress from '../screens/auth/Register/StepAddress';
import StepOccupation from '../screens/auth/Register/StepOccupation';
import StepRiskTolerance from '../screens/auth/Register/StepRiskTolerance';
import StepPassword from '../screens/auth/Register/StepPassword';
import StepSetPin from '../screens/auth/Register/StepSetPin';



const Stack = createNativeStackNavigator();

export default function AuthNavigator() {
  return (
    <Stack.Navigator initialRouteName="Splash" screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Splash" component={SplashScreen} />

      <Stack.Screen name="Welcome">
        {({ navigation }) => (
          <WelcomeScreen onNext={() => navigation.navigate('StepPersonalInfo')} />
        )}
      </Stack.Screen>

      <Stack.Screen name="StepPersonalInfo">
        {({ navigation }) => (
          <StepPersonalInfo onNext={() => navigation.navigate('StepAddress')} />
        )}
      </Stack.Screen>

      <Stack.Screen name="StepAddress">
        {({ navigation }) => (
          <StepAddress onNext={() => navigation.navigate('StepOccupation')} />
        )}
      </Stack.Screen>

      <Stack.Screen name="StepOccupation">
        {({ navigation }) => (
          <StepOccupation onNext={() => navigation.navigate('StepRiskTolerance')} />
        )}
      </Stack.Screen>

      <Stack.Screen name="StepRiskTolerance">
        {({ navigation }) => (
          <StepRiskTolerance onNext={() => navigation.navigate('StepPassword')} />
        )}
      </Stack.Screen>

      <Stack.Screen name="StepPassword">
        {({ navigation }) => (
          <StepPassword onNext={() => navigation.navigate('StepSetPin')} />
        )}
      </Stack.Screen>

      <Stack.Screen name="StepSetPin">
        {({ navigation }) => (
          <StepSetPin onNext={() => alert('Fin del flujo por ahora')} />
        )}
      </Stack.Screen>

    </Stack.Navigator>
  );
}
