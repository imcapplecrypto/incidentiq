import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, SafeAreaView, TouchableOpacity } from 'react-native';
import { ArrowLeft, TrendingUp } from 'lucide-react-native';
import { useRouter } from 'expo-router';
import AssessmentQuestion from '@/components/AssessmentQuestion';
import MaturityLevelsTable from '@/components/MaturityLevelsTable';
import { useAssessmentStore } from '@/hooks/useAssessmentStore';

interface QuestionData {
  id: string;
  question: string;
  selectedLevel: number;
}

const CATEGORY_ID = 'recovery';

export default function RecoveryAssessment() {
  const router = useRouter();
  const { updateResponse, getCategoryScore, responses } = useAssessmentStore();
  
  const [questions, setQuestions] = useState<QuestionData[]>([
    {
      id: 'recovery-1',
      question: 'How comprehensive are your system recovery and restoration procedures?',
      selectedLevel: 1,
    },
    {
      id: 'recovery-2',
      question: 'How effective is your post-incident analysis and lessons learned process?',
      selectedLevel: 1,
    },
    {
      id: 'recovery-3',
      question: 'How well do you validate system integrity after recovery?',
      selectedLevel: 1,
    },
    {
      id: 'recovery-4',
      question: 'How do you monitor for recurring incidents and implement preventive measures?',
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
            <TrendingUp color="#059669" size={24} />
          </View>
          <View style={styles.headerText}>
            <Text style={styles.title}>Recovery & Post-Incident</Text>
            <Text style={styles.subtitle}>System restoration and lessons learned</Text>
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
            Evaluate your organization's recovery capabilities and continuous improvement processes.
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
              <Text style={styles.recommendationTitle}>Foundation Building</Text>
              <Text style={styles.recommendationText}>
                • Develop comprehensive recovery procedures{'\n'}
                • Implement system backup and restoration testing{'\n'}
                • Create post-incident review processes{'\n'}
                • Establish lessons learned documentation
              </Text>
            </View>
          )}
          {score >= 60 && score < 80 && (
            <View style={styles.recommendationCard}>
              <Text style={styles.recommendationTitle}>Process Maturation</Text>
              <Text style={styles.recommendationText}>
                • Automate recovery validation processes{'\n'}
                • Implement continuous monitoring post-recovery{'\n'}
                • Enhance lessons learned integration{'\n'}
                • Develop predictive recovery metrics
              </Text>
            </View>
          )}
          {score >= 80 && (
            <View style={styles.recommendationCard}>
              <Text style={styles.recommendationTitle}>Excellence Achievement</Text>
              <Text style={styles.recommendationText}>
                • Implement self-healing systems{'\n'}
                • Deploy AI-driven recovery optimization{'\n'}
                • Create industry benchmarking programs{'\n'}
                • Develop continuous improvement frameworks
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
    backgroundColor: '#ECFDF5',
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