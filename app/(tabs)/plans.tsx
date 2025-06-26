import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, SafeAreaView } from 'react-native';
import { FileText, Plus, Clock, CircleCheck as CheckCircle, TriangleAlert as AlertTriangle, CreditCard as Edit3, Share, Download } from 'lucide-react-native';
import { useRouter } from 'expo-router';
import UnifiedHeader from '@/components/UnifiedHeader';

const PlanCard = ({ title, description, status, lastUpdated, compliance, onPress }: any) => {
  const getStatusColor = () => {
    switch (status) {
      case 'active': return '#059669';
      case 'draft': return '#F59E0B';
      case 'review': return '#2563EB';
      default: return '#6B7280';
    }
  };

  const getStatusIcon = () => {
    switch (status) {
      case 'active': return CheckCircle;
      case 'draft': return Edit3;
      case 'review': return Clock;
      default: return AlertTriangle;
    }
  };

  const StatusIcon = getStatusIcon();

  return (
    <TouchableOpacity style={styles.planCard} onPress={onPress}>
      <View style={styles.planHeader}>
        <View style={[styles.planIcon, { backgroundColor: getStatusColor() + '20' }]}>
          <FileText color={getStatusColor()} size={24} />
        </View>
        <View style={styles.planInfo}>
          <Text style={styles.planTitle}>{title}</Text>
          <Text style={styles.planDescription}>{description}</Text>
        </View>
        <View style={styles.planStatus}>
          <StatusIcon color={getStatusColor()} size={16} />
        </View>
      </View>
      
      <View style={styles.planMeta}>
        <View style={styles.metaItem}>
          <Text style={styles.metaLabel}>Last Updated</Text>
          <Text style={styles.metaValue}>{lastUpdated}</Text>
        </View>
        <View style={styles.metaItem}>
          <Text style={styles.metaLabel}>Compliance</Text>
          <Text style={[styles.metaValue, { color: compliance >= 90 ? '#059669' : '#F59E0B' }]}>
            {compliance}%
          </Text>
        </View>
      </View>

      <View style={styles.planActions}>
        <TouchableOpacity style={styles.actionButton}>
          <Edit3 color="#6B7280" size={16} />
          <Text style={styles.actionText}>Edit</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionButton}>
          <Share color="#6B7280" size={16} />
          <Text style={styles.actionText}>Share</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionButton}>
          <Download color="#6B7280" size={16} />
          <Text style={styles.actionText}>Export</Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
};

const CreatePlanCard = ({ onPress }: { onPress: () => void }) => (
  <TouchableOpacity style={styles.createCard} onPress={onPress}>
    <View style={styles.createIcon}>
      <Plus color="#2563EB" size={32} />
    </View>
    <Text style={styles.createTitle}>Create New Plan</Text>
    <Text style={styles.createDescription}>
      Build a comprehensive incident response plan with AI guidance
    </Text>
  </TouchableOpacity>
);

const TemplateCard = ({ title, description, framework, onPress }: any) => (
  <TouchableOpacity style={styles.templateCard} onPress={onPress}>
    <View style={styles.templateContent}>
      <Text style={styles.templateTitle}>{title}</Text>
      <Text style={styles.templateDescription}>{description}</Text>
      <Text style={styles.templateFramework}>Based on {framework}</Text>
    </View>
    <Plus color="#2563EB" size={20} />
  </TouchableOpacity>
);

export default function PlansScreen() {
  const router = useRouter();
  const [plans] = useState([
    {
      id: 1,
      title: 'Data Breach Response',
      description: 'Comprehensive plan for data security incidents',
      status: 'active',
      lastUpdated: '2 days ago',
      compliance: 94,
    },
    {
      id: 2,
      title: 'Ransomware Response',
      description: 'Specialized procedures for ransomware attacks',
      status: 'active',
      lastUpdated: '1 week ago',
      compliance: 87,
    },
    {
      id: 3,
      title: 'DDoS Mitigation',
      description: 'Response procedures for denial of service attacks',
      status: 'draft',
      lastUpdated: '3 days ago',
      compliance: 65,
    },
    {
      id: 4,
      title: 'Insider Threat Response',
      description: 'Procedures for internal security incidents',
      status: 'review',
      lastUpdated: '5 days ago',
      compliance: 78,
    },
  ]);

  const [templates] = useState([
    {
      id: 1,
      title: 'NIST Cybersecurity Framework',
      description: 'Standard incident response plan template',
      framework: 'NIST CSF',
    },
    {
      id: 2,
      title: 'ISO 27035 Compliance',
      description: 'International standard for incident management',
      framework: 'ISO 27035',
    },
    {
      id: 3,
      title: 'GDPR Incident Response',
      description: 'EU data protection regulation compliance',
      framework: 'GDPR',
    },
  ]);

  return (
    <SafeAreaView style={styles.container}>
      <UnifiedHeader 
        title="Response Plans"
        subtitle="Manage your incident response procedures"
      />

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.createSection}>
          <CreatePlanCard onPress={() => {}} />
        </View>

        <View style={styles.plansSection}>
          <Text style={styles.sectionTitle}>Your Plans ({plans.length})</Text>
          {plans.map((plan) => (
            <PlanCard
              key={plan.id}
              title={plan.title}
              description={plan.description}
              status={plan.status}
              lastUpdated={plan.lastUpdated}
              compliance={plan.compliance}
              onPress={() => {}}
            />
          ))}
        </View>

        <View style={styles.templatesSection}>
          <Text style={styles.sectionTitle}>Quick Start Templates</Text>
          {templates.map((template) => (
            <TemplateCard
              key={template.id}
              title={template.title}
              description={template.description}
              framework={template.framework}
              onPress={() => {}}
            />
          ))}
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
  createSection: {
    padding: 20,
  },
  createCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 24,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#E5E7EB',
    borderStyle: 'dashed',
  },
  createIcon: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: '#EFF6FF',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  createTitle: {
    fontSize: 18,
    fontFamily: 'Inter-SemiBold',
    color: '#111827',
    marginBottom: 8,
  },
  createDescription: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#6B7280',
    textAlign: 'center',
    lineHeight: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontFamily: 'Inter-SemiBold',
    color: '#111827',
    marginBottom: 16,
  },
  plansSection: {
    padding: 20,
    paddingTop: 0,
  },
  planCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  planHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  planIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  planInfo: {
    flex: 1,
    marginLeft: 16,
  },
  planTitle: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#111827',
    marginBottom: 4,
  },
  planDescription: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#6B7280',
  },
  planStatus: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  planMeta: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
    paddingHorizontal: 4,
  },
  metaItem: {
    alignItems: 'center',
  },
  metaLabel: {
    fontSize: 12,
    fontFamily: 'Inter-Regular',
    color: '#9CA3AF',
    marginBottom: 2,
  },
  metaValue: {
    fontSize: 14,
    fontFamily: 'Inter-SemiBold',
    color: '#374151',
  },
  planActions: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    borderTopWidth: 1,
    borderTopColor: '#F3F4F6',
    paddingTop: 12,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  actionText: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    color: '#6B7280',
  },
  templatesSection: {
    padding: 20,
    paddingTop: 0,
  },
  templateCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  templateContent: {
    flex: 1,
  },
  templateTitle: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#111827',
    marginBottom: 4,
  },
  templateDescription: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#6B7280',
    marginBottom: 4,
  },
  templateFramework: {
    fontSize: 12,
    fontFamily: 'Inter-Medium',
    color: '#2563EB',
  },
});