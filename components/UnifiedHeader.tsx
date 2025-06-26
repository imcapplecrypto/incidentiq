import React from 'react';
import { View, Text, StyleSheet, Image, Dimensions } from 'react-native';

interface UnifiedHeaderProps {
  title?: string;
  subtitle?: string;
  showLogo?: boolean;
}

const { width: screenWidth } = Dimensions.get('window');

export default function UnifiedHeader({ 
  title,
  subtitle,
  showLogo = true
}: UnifiedHeaderProps) {
  return (
    <View style={styles.header}>
      <View style={styles.headerContent}>
        {/* Logo section - left aligned */}
        {showLogo && (
          <View style={styles.logoSection}>
            <Image
              source={require('../assets/images/IdentityIQ-Logo.jpg')}
              style={styles.logo}
              resizeMode="contain"
            />
          </View>
        )}
        
        {/* Second logo - right aligned */}
        {showLogo && (
          <View style={styles.rightLogoSection}>
            <Image
              source={require('../assets/images/Artboard 1.png')}
              style={styles.rightLogo}
              resizeMode="contain"
            />
          </View>
        )}
      </View>
      
      {/* Title section below logos */}
      {title && (
        <View style={styles.titleSection}>
          <Text style={styles.title}>{title}</Text>
          {subtitle && <Text style={styles.subtitle}>{subtitle}</Text>}
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    paddingTop: 10,
    paddingBottom: 10,
    paddingHorizontal: 20,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
    minHeight: 110,
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 0,
    height: 120,
  },
  logoSection: {
    alignItems: 'flex-start',
    flex: 1,
    justifyContent: 'center',
  },
  logo: {
    height: 104.06, // Increased by 10% from 94.6px (94.6 * 1.1 = 104.06)
    width: Math.min(screenWidth * 0.5445, 338.8), // Increased by 10% proportionally (0.495 * 1.1 = 0.5445, 308 * 1.1 = 338.8)
    maxWidth: '100%',
  },
  rightLogoSection: {
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
  rightLogo: {
    height: 120,
    width: 120,
  },
  titleSection: {
    width: '100%',
    marginTop: -8,
    alignItems: 'center',
  },
  title: {
    fontSize: 28,
    fontFamily: 'Inter-Bold',
    color: '#111827',
    lineHeight: 34,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: '#6B7280',
    textAlign: 'center',
    marginTop: 4,
  },
});