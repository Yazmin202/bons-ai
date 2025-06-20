import React from 'react';
import * as Animatable from 'react-native-animatable';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  Dimensions,
} from 'react-native';

import bonsaiLogo from '../../assets/imagenes/BONSAILOGO.png';
import testimonio1 from '../../assets/imagenes/testimonio1.png';
import testimonio2 from '../../assets/imagenes/testimonio2.png';
import testimonio3 from '../../assets/imagenes/testimonio3.png';

const { height } = Dimensions.get('window');

export default function WelcomeScreen({ onNext }) {
  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        bounces={false}
      >
        <View style={styles.fullContent}>
          <View style={styles.centeredBlock}>
            <View style={styles.logoTitleWrapper}>
              <Image
                source={bonsaiLogo}
                style={styles.logo}
                resizeMode="contain"
              />
              <Text style={styles.title}>BONS-AI AGENT</Text>
            </View>

            <Text style={styles.headline}>Smarter trading starts here</Text>
            <Text style={styles.description}>
              Welcome to Bons-AI — your financial AI agent, thinking for you.
            </Text>

            {testimonials.map((item, index) => (
              <Animatable.View
                key={index}
                animation="fadeInUp"
                delay={index * 600}
                duration={600}
                useNativeDriver
                style={styles.testimonial}
              >
                <Image source={item.image} style={styles.avatar} />
                <View style={styles.testimonialTextContainer}>
                  <Text style={styles.testimonialText}>{item.text}</Text>
                  <Text style={styles.testimonialAuthor}>{item.name}</Text>
                </View>
              </Animatable.View>
            ))}
          </View>

          <View style={styles.bottomSection}>
            <TouchableOpacity
              style={styles.primaryButton}
              onPress={onNext}
            >
              <Text style={styles.primaryButtonText}>Activate Your AI Agent</Text>
            </TouchableOpacity>

            <View style={styles.footer}>
              <Text style={styles.footerText}>
                Already have an account?{' '}
                <Text style={styles.linkText}>Log in</Text>
              </Text>
              <Text style={styles.aboutText}>About Bons-AI</Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const testimonials = [
  {
    image: testimonio1,
    text: 'This AI agent simplifies my trading and saves me time.',
    name: 'Sarah',
  },
  {
    image: testimonio2,
    text: 'Thanks to Bons-AI, I feel more confident about my investments.',
    name: 'John',
  },
  {
    image: testimonio3,
    text: 'Trading with AI has been a game-changer for me.',
    name: 'Anna',
  },
];

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#fff' },
  scrollContent: { flexGrow: 1 },
  fullContent: {
    flex: 1,
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    minHeight: height,
  },
  centeredBlock: {
    alignItems: 'center',
    justifyContent: 'center',
    flexGrow: 1,
    paddingVertical: 32,
  },
  logoTitleWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  logo: {
    width: 80,
    height: 80,
    marginRight: 10,
  },
  title: {
    fontFamily: 'MarcellusSC',
    fontSize: 28,
    color: '#040404',
    lineHeight: 36,
  },
  headline: {
    fontFamily: 'Manrope-Bold',
    fontSize: 24,
    color: '#000',
    textAlign: 'center',
    marginTop: 16,
    marginBottom: 8,
    lineHeight: 32,
  },
  description: {
    fontFamily: 'Manrope-Regular',
    fontSize: 16,
    color: '#333',
    textAlign: 'center',
    lineHeight: 24,
    marginBottom: 24,
    paddingHorizontal: 12,
  },
  testimonial: {
    backgroundColor: '#B3E8ED',
    borderRadius: 16,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    marginBottom: 16,
    width: '100%',
  },
  avatar: {
    width: 64,
    height: 64,
    borderRadius: 32,
    marginRight: 12,
    borderWidth: 1,
    borderColor: '#ccc',
  },
  testimonialTextContainer: { flex: 1 },
  testimonialText: {
    fontFamily: 'Manrope-Regular',
    fontSize: 14,
    lineHeight: 20,
    color: '#000',
    marginBottom: 4,
  },
  testimonialAuthor: {
    fontFamily: 'Manrope-Regular',
    fontSize: 14,
    color: '#000',
    textAlign: 'right',
  },
  bottomSection: {
    alignItems: 'center',
    marginBottom: 32,
  },
  primaryButton: {
    width: '100%',
    height: 48,
    borderRadius: 24,
    backgroundColor: '#0A3756',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    elevation: 4,
  },
  primaryButtonText: {
    fontFamily: 'Manrope-Bold',
    fontSize: 18,
    color: '#fff',
    textTransform: 'capitalize',
    letterSpacing: 0.5,
  },
  footer: { alignItems: 'center' },
  footerText: {
    fontFamily: 'Manrope-Regular',
    fontSize: 14,
    color: '#000',
    textAlign: 'center',
    marginBottom: 6,
  },
  linkText: {
    color: '#0A3756',
    fontFamily: 'Manrope-Bold',
  },
  aboutText: {
    fontFamily: 'Manrope-Regular',
    fontSize: 14,
    color: '#000',
    textAlign: 'center',
    textDecorationLine: 'underline',
    marginTop: 6,
  },
});
