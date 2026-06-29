import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import { LandingPage } from './components/LandingPage';
import { OnboardingFlow } from './components/OnboardingFlow';
import { Dashboard } from './components/Dashboard';
import { Quiz } from './components/Quiz';
import { Results } from './components/Results';
import { questions } from './data/questions';
import { QuizResult } from './types';

const LoadingScreen: React.FC = () => (
  <div className="min-h-screen bg-white dark:bg-black flex items-center justify-center font-mono">
    <div className="space-y-4 text-center">
      <div className="w-8 h-8 border-2 border-accent border-t-transparent animate-spin mx-auto" />
      <p className="text-zinc-500 uppercase tracking-widest text-[10px]">
        Synchronizing_Protocol...
      </p>
    </div>
  </div>
);

const AppContent: React.FC = () => {
  const { user, isLoading, upgradePro, addTestResult } = useAuth();
  const navigate = useNavigate();
  const [lastResult, setLastResult] = useState<QuizResult | null>(null);

  if (isLoading) return <LoadingScreen />;

  const handleQuizSubmit = (answers: Record<string, string>) => {
    const score = questions.reduce((acc, q) => {
      return answers[q.id] === q.correctOptionId ? acc + 1 : acc;
    }, 0);

    const result: QuizResult = {
      score,
      total: questions.length,
      stats: {
        algorithms: 70 + Math.floor(Math.random() * 30),
        react: 60 + Math.floor(Math.random() * 40),
        async: 40 + Math.floor(Math.random() * 60),
        apis: 80 + Math.floor(Math.random() * 20),
        testing: 50 + Math.floor(Math.random() * 50),
      },
    };

    setLastResult(result);
    addTestResult(score, questions.length);
    navigate('/results');
  };

  return (
    <Routes>
      <Route
        path="/"
        element={
          user?.characterClass ? <Navigate to="/dashboard" replace /> : <LandingPage />
        }
      />
      <Route
        path="/onboarding"
        element={
          !user ? <Navigate to="/" replace /> :
          user.characterClass ? <Navigate to="/dashboard" replace /> :
          <OnboardingFlow />
        }
      />
      <Route
        path="/dashboard"
        element={
          !user?.characterClass ? <Navigate to="/" replace /> :
          <Dashboard onStartAssessment={() => navigate('/quiz')} />
        }
      />
      <Route
        path="/quiz"
        element={
          !user?.characterClass ? <Navigate to="/" replace /> :
          <Quiz
            questions={questions}
            onSubmit={handleQuizSubmit}
            onExit={() => navigate('/dashboard')}
          />
        }
      />
      <Route
        path="/results"
        element={
          !lastResult ? <Navigate to="/dashboard" replace /> :
          <Results
            result={lastResult}
            isPro={user?.isPro || false}
            onReturn={() => {
              setLastResult(null);
              navigate('/dashboard');
            }}
            onUpgrade={upgradePro}
          />
        }
      />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </BrowserRouter>
  );
};

export default App;
