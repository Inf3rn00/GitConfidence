
import { useState, useCallback, useEffect } from 'react';
import { questions } from '../data/questions';
import { QuizState, QuizResult, CategoryResult, Category, Stack } from '../../types';

export const useQuiz = (userStack: Stack) => {
  const [filteredQuestions, setFilteredQuestions] = useState(questions);
  
  const [state, setState] = useState<QuizState>({
    answers: {},
    currentQuestionIndex: 0,
    isFinished: false,
  });

  // Filter questions based on the user's stack when the hook initializes
  useEffect(() => {
    const stackQuestions = questions.filter(q => q.stack === userStack);
    // If no questions found for stack (edge case), fallback to all or handle error
    setFilteredQuestions(stackQuestions.length > 0 ? stackQuestions : questions);
  }, [userStack]);

  const submitAnswer = useCallback((optionId: string) => {
    setState((prev) => {
      const currentQuestion = filteredQuestions[prev.currentQuestionIndex];
      const newAnswers = { ...prev.answers, [currentQuestion.id]: optionId };
      
      const isLastQuestion = prev.currentQuestionIndex === filteredQuestions.length - 1;

      if (isLastQuestion) {
        return {
          ...prev,
          answers: newAnswers,
          isFinished: true,
        };
      } else {
        return {
          ...prev,
          answers: newAnswers,
          currentQuestionIndex: prev.currentQuestionIndex + 1,
        };
      }
    });
  }, [filteredQuestions]);

  const resetQuiz = useCallback(() => {
    setState({
      answers: {},
      currentQuestionIndex: 0,
      isFinished: false,
    });
  }, []);

  const calculateResults = useCallback((): QuizResult => {
    // Get unique categories from the filtered questions
    const categories = Array.from(new Set(filteredQuestions.map(q => q.category))) as Category[];
    
    const categoryResults: CategoryResult[] = categories.map((cat) => {
      const catQuestions = filteredQuestions.filter((q) => q.category === cat);
      const total = catQuestions.length;
      const correct = catQuestions.reduce((acc, q) => {
        return state.answers[q.id] === q.correctOptionId ? acc + 1 : acc;
      }, 0);
      const percentage = total === 0 ? 0 : Math.round((correct / total) * 100);
      
      let status: 'Weak' | 'Average' | 'Strong' = 'Average';
      if (percentage < 50) status = 'Weak';
      if (percentage > 80) status = 'Strong';

      return {
        category: cat,
        correct,
        total,
        percentage,
        status,
      };
    });

    const totalScore = Object.entries(state.answers).reduce((acc, [qId, ans]) => {
      const q = filteredQuestions.find((quest) => quest.id === qId);
      return q && q.correctOptionId === ans ? acc + 1 : acc;
    }, 0);

    // Added stats mapping to fulfill QuizResult requirements
    const stats = {
      algorithms: categoryResults.find(c => c.category === 'algorithms')?.percentage || 0,
      react: categoryResults.find(c => c.category === 'react')?.percentage || 0,
      async: categoryResults.find(c => c.category === 'async')?.percentage || 0,
      apis: categoryResults.find(c => c.category === 'apis')?.percentage || 0,
      testing: categoryResults.find(c => c.category === 'testing')?.percentage || 0,
    };

    return {
      score: totalScore,
      total: filteredQuestions.length,
      totalScore,
      totalQuestions: filteredQuestions.length,
      categoryResults,
      stats
    };
  }, [state.answers, filteredQuestions]);

  // Guard against empty question sets
  const currentQ = filteredQuestions[state.currentQuestionIndex];

  return {
    currentQuestionIndex: state.currentQuestionIndex,
    currentQuestion: currentQ,
    totalQuestions: filteredQuestions.length,
    isFinished: state.isFinished,
    submitAnswer,
    calculateResults,
    resetQuiz,
  };
};
