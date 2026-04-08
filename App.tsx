
import React, { useState, useEffect } from 'react';
import { AuthProvider, useAuth } from './context/AuthContext';
import { ThemeProvider } from './context/ThemeProvider';
import { LandingPage } from './components/LandingPage';
import { Dashboard } from './components/Dashboard';
import { Quiz } from './components/Quiz';
import { Results } from './components/Results';
import { CharacterSelection } from './components/CharacterSelection';
import { questions } from './data/questions';
import { QuizResult, CharacterClass } from './types';

type View = 'landing' | 'auth' | 'character_select' | 'dashboard' | 'quiz' | 'results';

const AppContent: React.FC = () => {
  const { user, isLoading, login, initializeCharacter, addTestResult, upgradePro } = useAuth();
  const [view, setView] = useState<View>('landing');
  const [lastResult, setLastResult] = useState<QuizResult | null>(null);

  useEffect(() => {
    if (!isLoading) {
      if (user) {
        if (!user.characterClass) {
          setView('character_select');
        } else if (view === 'landing' || view === 'character_select') {
          setView('dashboard');
        }
      } else {
        setView('landing');
      }
    }
  }, [user, isLoading, view]);

  const handleStartQuiz = () => setView('quiz');

  const handleCharacterSelect = (charClass: CharacterClass) => {
    initializeCharacter(charClass);
    setView('dashboard');
  };

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
        testing: 50 + Math.floor(Math.random() * 50)
      }
    };

    setLastResult(result);
    addTestResult(score, questions.length);
    setView('results');
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-white dark:bg-black flex items-center justify-center font-mono">
        <div className="space-y-4 text-center">
          <div className="w-8 h-8 border-2 border-accent border-t-transparent animate-spin mx-auto" />
          <p className="text-zinc-500 uppercase tracking-widest text-[10px]">Synchronizing_Protocol...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="antialiased">
      {view === 'landing' && (
        <LandingPage onStart={login} />
      )}

      {view === 'character_select' && (
        <CharacterSelection onSelect={handleCharacterSelect} />
      )}

      {view === 'dashboard' && (
        <Dashboard onStartAssessment={handleStartQuiz} />
      )}
      
      {view === 'quiz' && (
        <Quiz
          questions={questions}
          onSubmit={handleQuizSubmit}
          onExit={() => setView('dashboard')}
        />
      )}

      {view === 'results' && lastResult && (
        <Results 
          result={lastResult} 
          isPro={user?.isPro || false}
          onReturn={() => setView('dashboard')}
          onUpgrade={upgradePro}
        />
      )}
    </div>
  );
};

const App: React.FC = () => {
  return (
    <ThemeProvider>
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </ThemeProvider>
  );
};

export default App;
