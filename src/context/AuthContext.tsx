import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, Domain, SkillLevel, TestAttempt, CharacterClass, CharacterStats } from '../types';

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  createUser: (data: {
    fullName: string;
    email: string;
    domain: Domain;
    level: SkillLevel;
    characterClass: CharacterClass;
    avatarName: string;
    biggestFear: string;
    goalToBuild: string;
  }) => void;
  updateUser: (data: Partial<User>) => void;
  addTestResult: (score: number, total: number) => void;
  purchaseItem: (itemId: string, cost: number, bonus?: Partial<CharacterStats>) => boolean;
  upgradePro: () => void;
  logout: () => void;
}

const INITIAL_STATS: Record<CharacterClass, CharacterStats> = {
  UIWarrior: { str: 50, int: 40, dex: 80 },
  LogicMage: { str: 40, int: 90, dex: 40 },
  Debugger: { str: 80, int: 50, dex: 50 },
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const stored = localStorage.getItem('gitconfidence_user');
    if (stored) {
      setUser(JSON.parse(stored));
    }
    setIsLoading(false);
  }, []);

  const createUser = (data: {
    fullName: string;
    email: string;
    domain: Domain;
    level: SkillLevel;
    characterClass: CharacterClass;
    avatarName: string;
    biggestFear: string;
    goalToBuild: string;
  }) => {
    const newUser: User = {
      id: Math.random().toString(36).substr(2, 9),
      fullName: data.fullName,
      email: data.email,
      domain: data.domain,
      skillLevel: data.level,
      level: 1,
      isPro: false,
      bestScore: 0,
      totalTests: 0,
      testHistory: [],
      xp: 0,
      gold: 10,
      avatarName: data.avatarName,
      characterClass: data.characterClass,
      biggestFear: data.biggestFear,
      goalToBuild: data.goalToBuild,
      stats: INITIAL_STATS[data.characterClass],
      inventory: [],
    };
    setUser(newUser);
    localStorage.setItem('gitconfidence_user', JSON.stringify(newUser));
  };

  const addTestResult = (score: number, total: number) => {
    if (!user) return;

    const percentage = score / total;
    const xpEarned = Math.round(50 + (percentage * 150));
    const goldEarned = percentage >= 0.8 ? 20 : 5;

    let newXp = user.xp + xpEarned;
    let newLevel = user.level;
    let newStats = { ...user.stats };

    if (newXp >= 1000) {
      newLevel += Math.floor(newXp / 1000);
      newXp = newXp % 1000;
      newStats.str += 10;
      newStats.int += 10;
      newStats.dex += 10;
    }

    const newAttempt: TestAttempt = {
      id: Date.now().toString(),
      score,
      total,
      date: new Date().toISOString(),
      domain: user.domain,
      xpEarned,
      goldEarned,
    };

    const updated = {
      ...user,
      xp: newXp,
      level: newLevel,
      stats: newStats,
      gold: user.gold + goldEarned,
      bestScore: Math.max(user.bestScore, score),
      totalTests: user.totalTests + 1,
      testHistory: [newAttempt, ...user.testHistory],
    };

    setUser(updated);
    localStorage.setItem('gitconfidence_user', JSON.stringify(updated));
  };

  const purchaseItem = (itemId: string, cost: number, bonus?: Partial<CharacterStats>): boolean => {
    if (!user || user.gold < cost) return false;

    const newStats = { ...user.stats };
    if (bonus) {
      if (bonus.str) newStats.str += bonus.str;
      if (bonus.int) newStats.int += bonus.int;
      if (bonus.dex) newStats.dex += bonus.dex;
    }

    const updated = {
      ...user,
      gold: user.gold - cost,
      stats: newStats,
      inventory: [...user.inventory, itemId],
    };

    setUser(updated);
    localStorage.setItem('gitconfidence_user', JSON.stringify(updated));
    return true;
  };

  const updateUser = (data: Partial<User>) => {
    if (!user) return;
    const updated = { ...user, ...data };
    setUser(updated);
    localStorage.setItem('gitconfidence_user', JSON.stringify(updated));
  };

  const upgradePro = () => {
    if (!user) return;
    updateUser({ isPro: true });
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('gitconfidence_user');
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        createUser,
        updateUser,
        addTestResult,
        purchaseItem,
        upgradePro,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) throw new Error('useAuth must be used within an AuthProvider');
  return context;
};
