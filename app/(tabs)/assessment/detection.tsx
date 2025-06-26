import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, SafeAreaView, TouchableOpacity } from 'react-native';
import { ArrowLeft, TriangleAlert as AlertTriangle } from 'lucide-react-native';
import { useRouter } from 'expo-router';
import AssessmentQuestion from '@/components/AssessmentQuestion';
import MaturityLevelsTable from '@/components/MaturityLevelsTable';
import { useAssessmentStore } from '@/hooks/useAssessmentStore';

interface QuestionData {
  id: string;
  question: string;
  selectedLevel: number;
}

const CATEGORY_ID = 'detection';

export default function DetectionAssessment() {
  const router = useRouter();
  const { updateResponse, getCategoryScore, responses } = useAssessmentStore();
  
  const [questions, setQuestions] = useState<QuestionData[]>([
    {
      id: 'detect-1',
      question: 'How comprehensive is your security monitoring and alerting system?',
      selectedLevel: 1,
    },
    {
      id: 'detect-2',
      question: 'How effective is your threat detection and analysis capability?',
      selectedLevel: 1,
    },
    {
      id: 'detect-3',
      question: 'How well do you correlate and prioritize security events?',
      selectedLevel: 1,
    },
    {
      id: 'detect-4',
      question: 'How mature is your incident classification and categorization process?',
      selectedLevel: 1,
    },
  ]);

  // Load existing responses on component mount
  useEffect(() => {
    const categoryResponses = responses.filter(r => r.categoryId === CATEGORY_ID);
    
    setQuestions(prevQuestions => 
      prevQuestions.map(q => {
        const existingResponse = categoryResponses.find(r => r.questionId === q.id);
        return existingResponse 
          ? { ...q, selectedLevel: existingResponse.selectedLevel }
          : q;
      })
    );
  }, [responses]);

  const score = getCategoryScore(CATEGORY_ID);

  const handleLevelChange = (questionId: string, level: number) => {
    // Update local state
    setQuestions(prev => 
      prev.map(q => 
        q.id === questionId ? { ...q, selectedLevel: level } : q
      )
    );
    
    // Update global store
    updateResponse(questionId, CATEGORY_ID, level);
  };

  const getScoreColor = () => {
    if (score >= 80) return '#059669';
    if (score >= 60) return '#F59E0B';
    return '#DC2626';
  };

  const getMaturityLevel = () => {
    if (score >= 80) return 'Advanced';
    if (score >= 60) return 'Intermediate';
    if (score >= 40) return 'Basic';
    return 'Initial';
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
          <ArrowLeft color="#374151" size={24} />
        </TouchableOpacity>
        <View style={styles.headerContent}>
          <View style={styles.headerIcon}>
            <AlertTriangle color="#F59E0B" size={24} />
          </View>
          <View style={styles.headerText}>
            <Text style={styles.title}>Detection & Analysis</Text>
            <Text style={styles.subtitle}>Monitoring, alerting, and incident identification</Text>
          </View>
        </View>
      </View>

      <View style={styles.scoreCard}>
        <View style={styles.scoreHeader}>
          <Text style={styles.scoreTitle}>Current Score</Text>
          <View style={styles.scoreValue}>
            <Text style={[styles.scoreNumber, { color: getScoreColor() }]}>{score}%</Text>
            <Text style={[styles.scoreLevel, { color: getScoreColor() }]}>{getMaturityLevel()}</Text>
          </View>
        </View>
        <View style={styles.progressBar}>
          <View 
            style={[
              styles.progressFill, 
              { width: `${score}%`, backgroundColor: getScoreColor() }
            ]} 
          />
        </View>
      </View>

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.questionsContainer}>
          <Text style={styles.sectionTitle}>Assessment Questions</Text>
          <Text style={styles.sectionDescription}>
            Evaluate your organization's ability to detect and analyze security incidents.
          </Text>

          {questions.map((question) => (
            <AssessmentQuestion
              key={question.id}
              question={question.question}
              selectedLevel={question.selectedLevel}
              onLevelChange={(level) => handleLevelChange(question.id, level)}
            />
          ))}
        </View>

        <View style={styles.recommendationsContainer}>
          <Text style={styles.sectionTitle}>Recommendations</Text>
          {score < 60 && (
            <View style={styles.recommendationCard}>
              <Text style={styles.recommendationTitle}>Critical Improvements Needed</Text>
              <Text style={styles.recommendationText}>
                • Implement comprehensive SIEM solution{'\n'}
                • Deploy network and endpoint monitoring tools{'\n'}
                • Establish 24/7 security operations center (SOC){'\n'}
                • Create incident detection and triage procedures
              </Text>
            </View>
          )}
          {score >= 60 && score < 80 && (
            <View style={styles.recommendationCard}>
              <Text style={styles.recommendationTitle}>Enhancement Opportunities</Text>
              <Text style={styles.recommendationText}>
                • Implement advanced threat hunting capabilities{'\n'}
                • Deploy behavioral analytics and machine learning{'\n'}
                • Enhance correlation rules and threat intelligence{'\n'}
                • Automate incident classification and prioritization
              </Text>
            </View>
          )}
          {score >= 80 && (
            <View style={styles.recommendationCard}>
              <Text style={styles.recommendationTitle}>Advanced Optimization</Text>
              <Text style={styles.recommendationText}>
                • Implement predictive threat detection{'\n'}
                • Deploy AI-powered security analytics{'\n'}
                • Create custom threat intelligence feeds{'\n'}
                • Develop proactive threat hunting programs
              </Text>
            </View>
          )}
        </View>

        <View style={styles.maturityTableContainer}>
          <MaturityLevelsTable />
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
  header: {
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
    flexDirection: 'row',
    alignItems: 'center',
  },
  backButton: {
    marginRight: 16,
    padding: 4,
  },
  headerContent: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#FEF3C7',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  headerText: {
    flex: 1,
  },
  title: {
    fontSize: 24,
    fontFamily: 'Inter-SemiBold',
    color: '#111827',
    marginBottom: 2,
  },
  subtitle: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#6B7280',
  },
  scoreCard: {
    backgroundColor: '#FFFFFF',
    margin: 20,
    padding: 20,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  scoreHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  scoreTitle: {
    fontSize: 16,
    fontFamily: 'Inter-Medium',
    color: '#374151',
  },
  scoreValue: {
    alignItems: 'flex-end',
  },
  scoreNumber: {
    fontSize: 24,
    fontFamily: 'Inter-Bold',
  },
  scoreLevel: {
    fontSize: 12,
    fontFamily: 'Inter-Medium',
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  progressBar: {
    height: 8,
    backgroundColor: '#F3F4F6',
    borderRadius: 4,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    borderRadius: 4,
  },
  scrollView: {
    flex: 1,
  },
  questionsContainer: {
    padding: 20,
    paddingTop: 0,
  },
  sectionTitle: {
    fontSize: 18,
    fontFamily: 'Inter-SemiBold',
    color: '#111827',
    marginBottom: 8,
  },
  sectionDescription: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#6B7280',
    marginBottom: 24,
    lineHeight: 20,
  },
  recommendationsContainer: {
    padding: 20,
    paddingTop: 0,
  },
  recommendationCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  recommendationTitle: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#111827',
    marginBottom: 8,
  },
  recommendationText: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#6B7280',
    lineHeight: 20,
  },
  maturityTableContainer: {
    padding: 20,
    paddingTop: 0,
  },
});