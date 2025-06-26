import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, SafeAreaView } from 'react-native';
import { Shield, TriangleAlert as AlertTriangle, CircleCheck as CheckCircle, ArrowRight, Activity, FileText, MessageCircle, TrendingUp } from 'lucide-react-native';
import { useRouter } from 'expo-router';
import UnifiedHeader from '@/components/UnifiedHeader';

const StatCard = ({ title, value, subtitle, color, icon: Icon }: any) => (
  <View style={[styles.statCard, { borderLeftColor: color }]}>
    <View style={styles.statContent}>
      <View style={styles.statHeader}>
        <Icon color={color} size={20} />
        <Text style={styles.statValue}>{value}</Text>
      </View>
      <Text style={styles.statTitle}>{title}</Text>
      <Text style={styles.statSubtitle}>{subtitle}</Text>
    </View>
  </View>
);

const QuickActionCard = ({ title, description, icon: Icon, onPress, color }: any) => (
  <TouchableOpacity style={styles.actionCard} onPress={onPress}>
    <View style={[styles.actionIcon, { backgroundColor: color + '20' }]}>
      <Icon color={color} size={24} />
    </View>
    <View style={styles.actionContent}>
      <Text style={styles.actionTitle}>{title}</Text>
      <Text style={styles.actionDescription}>{description}</Text>
    </View>
    <ArrowRight color="#6B7280" size={20} />
  </TouchableOpacity>
);

export default function HomeScreen() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.container}>
      <UnifiedHeader 
        title="Dashboard"
        subtitle="AI-Powered Incident Response Planning"
      />
      
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.statsContainer}>
          <Text style={styles.sectionTitle}>Overview</Text>
          <View style={styles.statsGrid}>
            <StatCard
              title="Maturity Score"
              value="72%"
              subtitle="Good"
              color="#059669"
              icon={TrendingUp}
            />
            <StatCard
              title="Active Plans"
              value="3"
              subtitle="Updated"
              color="#2563EB"
              icon={FileText}
            />
            <StatCard
              title="Open Incidents"
              value="1"
              subtitle="Critical"
              color="#DC2626"
              icon={AlertTriangle}
            />
            <StatCard
              title="Closed Incidents"
              value="24"
              subtitle="This Month"
              color="#7C3AED"
              icon={CheckCircle}
            />
          </View>
        </View>

        <View style={styles.actionsContainer}>
          <Text style={styles.sectionTitle}>Quick Actions</Text>
          
          <QuickActionCard
            title="Start Assessment"
            description="Evaluate your current IR capabilities"
            icon={Shield}
            color="#2563EB"
            onPress={() => router.push('/assessment')}
          />
          
          <QuickActionCard
            title="Create New Plan"
            description="Build a comprehensive response plan"
            icon={FileText}
            color="#059669"
            onPress={() => router.push('/plans')}
          />
          
          <QuickActionCard
            title="Review Your Plan"
            description="Improve your existing plan"
            icon={MessageCircle}
            color="#7C3AED"
            onPress={() => router.push('/chat')}
          />
          
          <QuickActionCard
            title="Active Incident Advice"
            description="Get real-time response support"
            icon={Activity}
            color="#DC2626"
            onPress={() => router.push('/chat')}
          />
        </View>

        <View style={styles.recentContainer}>
          <Text style={styles.sectionTitle}>Recent Activity</Text>
          <View style={styles.activityItem}>
            <View style={[styles.activityDot, { backgroundColor: '#059669' }]} />
            <View style={styles.activityContent}>
              <Text style={styles.activityTitle}>Assessment completed</Text>
              <Text style={styles.activityTime}>2 hours ago</Text>
            </View>
          </View>
          <View style={styles.activityItem}>
            <View style={[styles.activityDot, { backgroundColor: '#2563EB' }]} />
            <View style={styles.activityContent}>
              <Text style={styles.activityTitle}>Plan "Data Breach Response" updated</Text>
              <Text style={styles.activityTime}>1 day ago</Text>
            </View>
          </View>
          <View style={styles.activityItem}>
            <View style={[styles.activityDot, { backgroundColor: '#F59E0B' }]} />
            <View style={styles.activityContent}>
              <Text style={styles.activityTitle}>New regulatory requirements detected</Text>
              <Text style={styles.activityTime}>3 days ago</Text>
            </View>
          </View>
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
  sectionTitle: {
    fontSize: 20,
    fontFamily: 'Inter-SemiBold',
    color: '#111827',
    marginBottom: 16,
  },
  statsContainer: {
    padding: 20,
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  statCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    flex: 1,
    minWidth: '45%',
    borderLeftWidth: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  statContent: {
    gap: 4,
  },
  statHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  statValue: {
    fontSize: 24,
    fontFamily: 'Inter-Bold',
    color: '#111827',
  },
  statTitle: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    color: '#374151',
  },
  statSubtitle: {
    fontSize: 12,
    fontFamily: 'Inter-Regular',
    color: '#6B7280',
  },
  actionsContainer: {
    padding: 20,
    paddingTop: 0,
  },
  actionCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  actionIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  actionContent: {
    flex: 1,
  },
  actionTitle: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#111827',
    marginBottom: 4,
  },
  actionDescription: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#6B7280',
  },
  recentContainer: {
    padding: 20,
    paddingTop: 0,
  },
  activityItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  activityDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 16,
  },
  activityContent: {
    flex: 1,
  },
  activityTitle: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    color: '#374151',
    marginBottom: 2,
  },
  activityTime: {
    fontSize: 12,
    fontFamily: 'Inter-Regular',
    color: '#9CA3AF',
  },
});