import { create } from 'zustand';

export type DifficultyLevel = 'beginner' | 'intermediate' | 'advanced';

export interface Question {
  id: string;
  question: string;
  options: {
    A: string;
    B: string;
    C: string;
    D: string;
  };
  correctAnswer: 'A' | 'B' | 'C' | 'D';
}

export interface QuizState {
  difficulty: DifficultyLevel | null;
  careerPath: string;
  questions: Question[];
  currentQuestionIndex: number;
  answers: Record<string, 'A' | 'B' | 'C' | 'D'>;
  startTime: number | null;
  isFullscreen: boolean;
  isLoading: boolean;
  error: string | null;
  
  // Actions
  setDifficulty: (difficulty: DifficultyLevel) => void;
  setCareerPath: (path: string) => void;
  setQuestions: (questions: Question[]) => void;
  setAnswer: (questionId: string, answer: 'A' | 'B' | 'C' | 'D') => void;
  nextQuestion: () => void;
  previousQuestion: () => void;
  startQuiz: () => void;
  toggleFullscreen: () => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  reset: () => void;
}

export const useQuizStore = create<QuizState>((set) => ({
  difficulty: null,
  careerPath: '',
  questions: [],
  currentQuestionIndex: 0,
  answers: {},
  startTime: null,
  isFullscreen: false,
  isLoading: false,
  error: null,

  setDifficulty: (difficulty) => set({ difficulty, questions: [], answers: {}, currentQuestionIndex: 0, startTime: null, isLoading: false, error: null }),
  setCareerPath: (careerPath) => set({ careerPath }),
  setQuestions: (questions) => set({ questions }),
  setAnswer: (questionId, answer) =>
    set((state) => ({
      answers: { ...state.answers, [questionId]: answer },
    })),
  nextQuestion: () =>
    set((state) => ({
      currentQuestionIndex: Math.min(
        state.currentQuestionIndex + 1,
        state.questions.length - 1
      ),
    })),
  previousQuestion: () =>
    set((state) => ({
      currentQuestionIndex: Math.max(state.currentQuestionIndex - 1, 0),
    })),
  startQuiz: () => set({ startTime: Date.now() }),
  toggleFullscreen: () => set((state) => ({ isFullscreen: !state.isFullscreen })),
  setLoading: (isLoading) => set({ isLoading }),
  setError: (error) => set({ error }),
  reset: () =>
    set({
      difficulty: null,
      careerPath: '',
      questions: [],
      currentQuestionIndex: 0,
      answers: {},
      startTime: null,
      isLoading: false,
      error: null,
    }),
}));
