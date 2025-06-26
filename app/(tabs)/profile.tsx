import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, SafeAreaView, Switch } from 'react-native';
import { User, Settings, Shield, Bell, Download, CircleHelp as HelpCircle, LogOut, ChevronRight, Mail, Building } from 'lucide-react-native';
import UnifiedHeader from '@/components/UnifiedHeader';

const ProfileHeader = () => (
  <View style={styles.profileHeader}>
    <View style={styles.avatar}>
      <User color="#FFFFFF" size={32} />
    </View>
    <View style={styles.profileInfo}>
      <Text style={styles.profileName}>Security Manager</Text>
      <Text style={styles.profileEmail}>security@company.com</Text>
      <Text style={styles.profileOrg}>Tech Corp Inc.</Text>
    </View>
  </View>
);

const SettingItem = ({ title, subtitle, icon: Icon, onPress, showArrow = true, rightComponent }: any) => (
  <TouchableOpacity style={styles.settingItem} onPress={onPress}>
    <View style={styles.settingIcon}>
      <Icon color="#6B7280" size={20} />
    </View>
    <View style={styles.settingContent}>
      <Text style={styles.settingTitle}>{title}</Text>
      {subtitle && <Text style={styles.settingSubtitle}>{subtitle}</Text>}
    </View>
    {rightComponent || (showArrow && <ChevronRight color="#9CA3AF" size={20} />)}
  </TouchableOpacity>
);

const StatsCard = ({ title, value, description }: any) => (
  <View style={styles.statsCard}>
    <Text style={styles.statsValue}>{value}</Text>
    <Text style={styles.statsTitle}>{title}</Text>
    <Text style={styles.statsDescription}>{description}</Text>
  </View>
);

export default function ProfileScreen() {
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [secureMode, setSecureMode] = useState(false);

  return (
    <SafeAreaView style={styles.container}>
      <UnifiedHeader 
        title="Profile" 
        subtitle="Account settings and preferences"
      />

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <ProfileHeader />

        <View style={styles.statsContainer}>
          <Text style={styles.sectionTitle}>Your Progress</Text>
          <View style={styles.statsGrid}>
            <StatsCard
              title="Plans Created"
              value="4"
              description="Active response plans"
            />
            <StatsCard
              title="Assessments"
              value="12"
              description="Completed evaluations"
            />
            <StatsCard
              title="Incidents"
              value="8"
              description="Successfully resolved"
            />
          </View>
        </View>

        <View style={styles.settingsContainer}>
          <Text style={styles.sectionTitle}>Account Settings</Text>
          
          <SettingItem
            title="Personal Information"
            subtitle="Update your profile details"
            icon={User}
            onPress={() => {}}
          />
          
          <SettingItem
            title="Organization Settings"
            subtitle="Manage company details"
            icon={Building}
            onPress={() => {}}
          />
          
          <SettingItem
            title="Email Preferences"
            subtitle="Configure email notifications"
            icon={Mail}
            onPress={() => {}}
          />
        </View>

        <View style={styles.settingsContainer}>
          <Text style={styles.sectionTitle}>App Settings</Text>
          
          <SettingItem
            title="Push Notifications"
            subtitle="Incident alerts and updates"
            icon={Bell}
            showArrow={false}
            rightComponent={
              <Switch
                value={notificationsEnabled}
                onValueChange={setNotificationsEnabled}
                trackColor={{ false: '#D1D5DB', true: '#BFDBFE' }}
                thumbColor={notificationsEnabled ? '#2563EB' : '#9CA3AF'}
              />
            }
          />
          
          <SettingItem
            title="Secure Mode"
            subtitle="Enhanced security features"
            icon={Shield}
            showArrow={false}
            rightComponent={
              <Switch
                value={secureMode}
                onValueChange={setSecureMode}
                trackColor={{ false: '#D1D5DB', true: '#BFDBFE' }}
                thumbColor={secureMode ? '#2563EB' : '#9CA3AF'}
              />
            }
          />
          
          <SettingItem
            title="App Settings"
            subtitle="General app preferences"
            icon={Settings}
            onPress={() => {}}
          />
        </View>

        <View style={styles.settingsContainer}>
          <Text style={styles.sectionTitle}>Data & Privacy</Text>
          
          <SettingItem
            title="Export Data"
            subtitle="Download your incident response data"
            icon={Download}
            onPress={() => {}}
          />
          
          <SettingItem
            title="Privacy Policy"
            subtitle="Review our privacy practices"
            icon={Shield}
            onPress={() => {}}
          />
        </View>

        <View style={styles.settingsContainer}>
          <Text style={styles.sectionTitle}>Support</Text>
          
          <SettingItem
            title="Help Center"
            subtitle="FAQs and user guides"
            icon={HelpCircle}
            onPress={() => {}}
          />
          
          <SettingItem
            title="Contact Support"
            subtitle="Get help from our team"
            icon={Mail}
            onPress={() => {}}
          />
        </View>

        <View style={styles.logoutContainer}>
          <TouchableOpacity style={styles.logoutButton}>
            <LogOut color="#DC2626" size={20} />
            <Text style={styles.logoutText}>Sign Out</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.footer}>
          <Text style={styles.footerText}>IdentityIQ v1.0.0</Text>
          <Text style={styles.footerText}>© 2025 Security Solutions</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  scrollView: {
    flex: 1,
  },
  profileHeader: {
    backgroundColor: '#FFFFFF',
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  avatar: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: '#2563EB',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  profileInfo: {
    flex: 1,
  },
  profileName: {
    fontSize: 20,
    fontFamily: 'Inter-SemiBold',
    color: '#111827',
    marginBottom: 4,
  },
  profileEmail: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#6B7280',
    marginBottom: 2,
  },
  profileOrg: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    color: '#2563EB',
  },
  statsContainer: {
    padding: 20,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  sectionTitle: {
    fontSize: 18,
    fontFamily: 'Inter-SemiBold',
    color: '#111827',
    marginBottom: 16,
  },
  statsGrid: {
    flexDirection: 'row',
    gap: 12,
  },
  statsCard: {
    flex: 1,
    backgroundColor: '#F8FAFC',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
  },
  statsValue: {
    fontSize: 24,
    fontFamily: 'Inter-Bold',
    color: '#2563EB',
    marginBottom: 4,
  },
  statsTitle: {
    fontSize: 12,
    fontFamily: 'Inter-SemiBold',
    color: '#374151',
    marginBottom: 2,
    textAlign: 'center',
  },
  statsDescription: {
    fontSize: 10,
    fontFamily: 'Inter-Regular',
    color: '#9CA3AF',
    textAlign: 'center',
  },
  settingsContainer: {
    backgroundColor: '#FFFFFF',
    marginTop: 12,
    paddingVertical: 8,
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  settingIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F3F4F6',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  settingContent: {
    flex: 1,
  },
  settingTitle: {
    fontSize: 16,
    fontFamily: 'Inter-Medium',
    color: '#111827',
    marginBottom: 2,
  },
  settingSubtitle: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#6B7280',
  },
  logoutContainer: {
    padding: 20,
  },
  logoutButton: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#FEE2E2',
    gap: 8,
  },
  logoutText: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#DC2626',
  },
  footer: {
    alignItems: 'center',
    padding: 20,
    paddingTop: 0,
  },
  footerText: {
    fontSize: 12,
    fontFamily: 'Inter-Regular',
    color: '#9CA3AF',
    marginBottom: 4,
  },
});