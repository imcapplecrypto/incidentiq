import React, { useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, SafeAreaView } from 'react-native';
import { Shield, ChevronRight, CircleCheck as CheckCircle, Clock, TriangleAlert as AlertTriangle, TrendingUp } from 'lucide-react-native';
import { useRouter } from 'expo-router';
import UnifiedHeader from '@/components/UnifiedHeader';
import { useAssessmentStore } from '@/hooks/useAssessmentStore';

const ProgressBar = ({ progress, color }: { progress: number; color: string }) => (
  <View style={styles.progressContainer}>
    <View style={styles.progressBar}>
      <View style={[styles.progressFill, { width: `${progress}%`, backgroundColor: color }]} />
    </View>
    <Text style={styles.progressText}>{progress}%</Text>
  </View>
);

const CategoryCard = ({ title, description, progress, status, icon: Icon, onPress, route }: any) => {
  const getStatusColor = () => {
    if (progress >= 80) return '#059669';
    if (progress >= 60) return '#F59E0B';
    if (progress >= 40) return '#2563EB';
    return '#DC2626';
  };

  const getStatusIcon = () => {
    if (progress >= 80) return CheckCircle;
    if (progress >= 40) return Clock;
    return AlertTriangle;
  };

  const StatusIcon = getStatusIcon();

  return (
    <TouchableOpacity style={styles.categoryCard} onPress={onPress}>
      <View style={styles.categoryHeader}>
        <View style={[styles.categoryIcon, { backgroundColor: getStatusColor() + '20' }]}>
          <Icon color={getStatusColor()} size={24} />
        </View>
        <View style={styles.categoryInfo}>
          <Text style={styles.categoryTitle}>{title}</Text>
          <Text style={styles.categoryDescription}>{description}</Text>
        </View>
        <View style={styles.categoryActions}>
          <StatusIcon color={getStatusColor()} size={16} />
          <ChevronRight color="#6B7280" size={20} />
        </View>
      </View>
      <ProgressBar progress={progress} color={getStatusColor()} />
    </TouchableOpacity>
  );
};

const MaturityScore = ({ score, level }: { score: number; level: string }) => (
  <View style={styles.maturityCard}>
    <View style={styles.maturityHeader}>
      <TrendingUp color="#2563EB" size={24} />
      <Text style={styles.maturityTitle}>Overall Maturity Score</Text>
    </View>
    <View style={styles.maturityScore}>
      <Text style={styles.scoreValue}>{score}</Text>
      <Text style={styles.scoreLevel}>{level}</Text>
    </View>
    <Text style={styles.maturityDescription}>
      Your organization shows good incident response capabilities with room for improvement in automation and threat intelligence integration.
    </Text>
  </View>
);

export default function AssessmentScreen() {
  const router = useRouter();
  const { getCategoryScore, getOverallScore, initializeCategory } = useAssessmentStore();

  const assessmentCategories = [
    {
      id: 'preparation',
      title: 'Preparation & Planning',
      description: 'Policies, procedures, and team structure',
      icon: Shield,
      route: '/assessment/preparation',
      totalQuestions: 5,
    },
    {
      id: 'detection',
      title: 'Detection & Analysis',
      description: 'Monitoring, alerting, and incident identification',
      icon: AlertTriangle,
      route: '/assessment/detection',
      totalQuestions: 4,
    },
    {
      id: 'containment',
      title: 'Containment & Eradication',
      description: 'Response procedures and threat elimination',
      icon: Shield,
      route: '/assessment/containment',
      totalQuestions: 5,
    },
    {
      id: 'recovery',
      title: 'Recovery & Post-Incident',
      description: 'System restoration and lessons learned',
      icon: TrendingUp,
      route: '/assessment/recovery',
      totalQuestions: 4,
    },
    {
      id: 'communication',
      title: 'Communication & Coordination',
      description: 'Internal and external communication protocols',
      icon: Shield,
      route: '/assessment/communication',
      totalQuestions: 5,
    },
  ];

  // Initialize all categories on component mount
  useEffect(() => {
    assessmentCategories.forEach(category => {
      initializeCategory(category.id, category.totalQuestions);
    });
  }, [initializeCategory]);

  const overallScore = getOverallScore();
  
  const getMaturityLevel = (score: number) => {
    if (score >= 80) return 'Advanced';
    if (score >= 60) return 'Intermediate';
    if (score >= 40) return 'Basic';
    return 'Initial';
  };

  return (
    <SafeAreaView style={styles.container}>
      <UnifiedHeader 
        title="Maturity Assessment" 
        subtitle="Evaluate your incident response capabilities"
      />

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <MaturityScore score={overallScore} level={getMaturityLevel(overallScore)} />

        <View style={styles.categoriesContainer}>
          <Text style={styles.sectionTitle}>Assessment Categories</Text>
          {assessmentCategories.map((category) => {
            const categoryScore = getCategoryScore(category.id);
            return (
              <CategoryCard
                key={category.id}
                title={category.title}
                description={category.description}
                progress={categoryScore}
                status={categoryScore >= 60 ? 'completed' : 'in-progress'}
                icon={category.icon}
                route={category.route}
                onPress={() => router.push(category.route as any)}
              />
            );
          })}
        </View>

        <View style={styles.recommendationsContainer}>
          <Text style={styles.sectionTitle}>Key Recommendations</Text>
          <View style={styles.recommendationCard}>
            <AlertTriangle color="#F59E0B" size={20} />
            <View style={styles.recommendationContent}>
              <Text style={styles.recommendationTitle}>Improve Detection Capabilities</Text>
              <Text style={styles.recommendationText}>
                Consider implementing SIEM tools and automated threat detection systems to enhance your monitoring capabilities.
              </Text>
            </View>
          </View>
          <View style={styles.recommendationCard}>
            <Shield color="#2563EB" size={20} />
            <View style={styles.recommendationContent}>
              <Text style={styles.recommendationTitle}>Enhance Recovery Procedures</Text>
              <Text style={styles.recommendationText}>
                Develop detailed system recovery procedures and conduct regular restoration testing exercises.
              </Text>
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
  maturityCard: {
    backgroundColor: '#FFFFFF',
    margin: 20,
    padding: 24,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  maturityHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  maturityTitle: {
    fontSize: 18,
    fontFamily: 'Inter-SemiBold',
    color: '#111827',
    marginLeft: 12,
  },
  maturityScore: {
    alignItems: 'center',
    marginBottom: 16,
  },
  scoreValue: {
    fontSize: 48,
    fontFamily: 'Inter-Bold',
    color: '#2563EB',
  },
  scoreLevel: {
    fontSize: 16,
    fontFamily: 'Inter-Medium',
    color: '#059669',
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  maturityDescription: {
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
  categoriesContainer: {
    padding: 20,
    paddingTop: 0,
  },
  categoryCard: {
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
  categoryHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  categoryIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  categoryInfo: {
    flex: 1,
    marginLeft: 16,
  },
  categoryTitle: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#111827',
    marginBottom: 4,
  },
  categoryDescription: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#6B7280',
  },
  categoryActions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  progressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  progressBar: {
    flex: 1,
    height: 6,
    backgroundColor: '#F3F4F6',
    borderRadius: 3,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    borderRadius: 3,
  },
  progressText: {
    fontSize: 12,
    fontFamily: 'Inter-Medium',
    color: '#6B7280',
    minWidth: 32,
  },
  recommendationsContainer: {
    padding: 20,
    paddingTop: 0,
  },
  recommendationCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    flexDirection: 'row',
    alignItems: 'flex-start',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  recommendationContent: {
    flex: 1,
    marginLeft: 12,
  },
  recommendationTitle: {
    fontSize: 14,
    fontFamily: 'Inter-SemiBold',
    color: '#111827',
    marginBottom: 4,
  },
  recommendationText: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#6B7280',
    lineHeight: 20,
  },
});