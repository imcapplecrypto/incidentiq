import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface QuestionResponse {
  questionId: string;
  categoryId: string;
  selectedLevel: number;
}

export interface CategoryScore {
  categoryId: string;
  score: number;
  totalQuestions: number;
  answeredQuestions: number;
}

interface AssessmentStore {
  responses: QuestionResponse[];
  categoryScores: CategoryScore[];
  
  // Actions
  updateResponse: (questionId: string, categoryId: string, selectedLevel: number) => void;
  getCategoryScore: (categoryId: string) => number;
  getOverallScore: () => number;
  initializeCategory: (categoryId: string, totalQuestions: number) => void;
}

const calculateCategoryScore = (responses: QuestionResponse[], categoryId: string): number => {
  const categoryResponses = responses.filter(r => r.categoryId === categoryId);
  
  if (categoryResponses.length === 0) {
    return 20; // Default 20% (level 1 out of 5 levels)
  }
  
  const totalScore = categoryResponses.reduce((sum, response) => sum + response.selectedLevel, 0);
  const maxPossibleScore = categoryResponses.length * 5; // 5 is the maximum level
  
  return Math.round((totalScore / maxPossibleScore) * 100);
};

export const useAssessmentStore = create<AssessmentStore>()(
  persist(
    (set, get) => ({
      responses: [],
      categoryScores: [],
      
      updateResponse: (questionId: string, categoryId: string, selectedLevel: number) => {
        set((state) => {
          // Update or add the response
          const existingResponseIndex = state.responses.findIndex(
            r => r.questionId === questionId
          );
          
          let newResponses;
          if (existingResponseIndex >= 0) {
            newResponses = [...state.responses];
            newResponses[existingResponseIndex] = { questionId, categoryId, selectedLevel };
          } else {
            newResponses = [...state.responses, { questionId, categoryId, selectedLevel }];
          }
          
          // Recalculate category score
          const newScore = calculateCategoryScore(newResponses, categoryId);
          
          // Update category scores
          const categoryScoreIndex = state.categoryScores.findIndex(
            cs => cs.categoryId === categoryId
          );
          
          let newCategoryScores = [...state.categoryScores];
          if (categoryScoreIndex >= 0) {
            newCategoryScores[categoryScoreIndex] = {
              ...newCategoryScores[categoryScoreIndex],
              score: newScore,
              answeredQuestions: newResponses.filter(r => r.categoryId === categoryId).length
            };
          }
          
          return {
            responses: newResponses,
            categoryScores: newCategoryScores
          };
        });
      },
      
      getCategoryScore: (categoryId: string) => {
        const state = get();
        const categoryScore = state.categoryScores.find(cs => cs.categoryId === categoryId);
        return categoryScore?.score ?? 20; // Default to 20% if not found
      },
      
      getOverallScore: () => {
        const state = get();
        if (state.categoryScores.length === 0) return 20;
        
        const totalScore = state.categoryScores.reduce((sum, cs) => sum + cs.score, 0);
        return Math.round(totalScore / state.categoryScores.length);
      },
      
      initializeCategory: (categoryId: string, totalQuestions: number) => {
        set((state) => {
          const existingIndex = state.categoryScores.findIndex(cs => cs.categoryId === categoryId);
          
          if (existingIndex >= 0) {
            // Category already exists, don't reinitialize
            return state;
          }
          
          const newCategoryScore: CategoryScore = {
            categoryId,
            score: 20, // Default 20% (level 1 out of 5)
            totalQuestions,
            answeredQuestions: 0
          };
          
          return {
            categoryScores: [...state.categoryScores, newCategoryScore]
          };
        });
      }
    }),
    {
      name: 'assessment-storage',
      partialize: (state) => ({
        responses: state.responses,
        categoryScores: state.categoryScores
      })
    }
  )
);