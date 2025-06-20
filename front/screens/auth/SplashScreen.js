import { StyleSheet, View, Image, Text } from 'react-native';
import { useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  Easing,
} from 'react-native-reanimated';

import fogImage from '../../assets/imagenes/fog.png';
import bitcoinBack from '../../assets/imagenes/BITCOINBACK.png';
import bonsaiLogo from '../../assets/imagenes/BONSAILOGO.png';

const baseSize = 220;
const logoSize = 200;
const fontSize = 20;

export default function SplashScreen() {
  const navigation = useNavigation();

  const fadeIn = useSharedValue(0);
  const scale = useSharedValue(0.9);
  const fogShift = useSharedValue(0);

  useEffect(() => {
    fadeIn.value = withTiming(1, {
      duration: 1200,
      easing: Easing.out(Easing.ease),
    });

    scale.value = withTiming(1, {
      duration: 1500,
      easing: Easing.out(Easing.exp),
    });

    fogShift.value = withTiming(-15, {
      duration: 2000,
      easing: Easing.linear,
    });

    const timer = setTimeout(() => {
      navigation.replace('Welcome');
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  const fogStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: fogShift.value }],
    opacity: 0.1,
  }));

  const contentStyle = useAnimatedStyle(() => ({
    opacity: fadeIn.value,
    transform: [{ scale: scale.value }],
  }));

  return (
    <View style={styles.container}>
      <Animated.Image
        source={fogImage}
        resizeMode="cover"
        style={[
          styles.fogLayer,
          fogStyle,
          { width: '150%', height: '150%' },
        ]}
      />

      <Animated.View style={[styles.logoWrapper, contentStyle]}>
        <Image
          source={bitcoinBack}
          style={[styles.backgroundCircle, { width: baseSize, height: baseSize }]}
          resizeMode="contain"
        />
        <Image
          source={bonsaiLogo}
          style={[styles.logo, { width: logoSize, height: logoSize }]}
          resizeMode="contain"
        />
        <Text style={[styles.text, { fontSize }]}>BONS-AI AGENT</Text>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  logoWrapper: {
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    zIndex: 2,
  },
  backgroundCircle: {
    position: 'absolute',
    zIndex: 1,
    opacity: 0.15,
  },
  logo: {
    zIndex: 2,
  },
  text: {
    marginTop: 24,
    fontWeight: 'bold',
    fontFamily: 'serif',
    color: '#000000',
    zIndex: 2,
  },
  fogLayer: {
    position: 'absolute',
    top: 0,
    left: -50,
    zIndex: 0,
  },
});
