export type Domain = 'Frontend' | 'Backend' | 'Fullstack' | 'DevOps' | 'Mobile' | 'Data' | 'Database';
export type Stack = Domain;
export type Category = 'algorithms' | 'react' | 'async' | 'apis' | 'testing';
export type SkillLevel = 'Beginner' | 'Intermediate' | 'Senior' | 'Junior';

export type CharacterClass = 'UIWarrior' | 'LogicMage' | 'Debugger';

export interface CharacterStats {
  str: number;
  int: number;
  dex: number;
}

export interface InventoryItem {
  id: string;
  name: string;
  cost: number;
  effect: string;
  statBonus?: Partial<CharacterStats>;
}

export interface User {
  id: string;
  fullName: string;
  email: string;
  domain: Domain;
  level: number;
  skillLevel: SkillLevel;
  xp: number;
  gold: number;
  isPro: boolean;
  bestScore: number;
  totalTests: number;
  testHistory: TestAttempt[];
  characterClass: CharacterClass;
  stats: CharacterStats;
  inventory: string[];
  avatarName: string;
  biggestFear: string;
  goalToBuild: string;
}

export interface TestAttempt {
  id: string;
  score: number;
  total: number;
  date: string;
  domain: Domain;
  xpEarned: number;
  goldEarned: number;
}

export interface Question {
  id: string;
  text: string;
  codeSnippet?: string;
  options: { id: string; text: string }[];
  correctOptionId: string;
  stack: Stack;
  category: Category;
}

export interface QuizState {
  answers: Record<string, string>;
  currentQuestionIndex: number;
  isFinished: boolean;
}

export interface CategoryResult {
  category: Category;
  correct: number;
  total: number;
  percentage: number;
  status: 'Weak' | 'Average' | 'Strong';
}

export interface QuizResult {
  score: number;
  total: number;
  totalScore?: number;
  totalQuestions?: number;
  categoryResults?: CategoryResult[];
  stats: {
    algorithms: number;
    react: number;
    async: number;
    apis: number;
    testing: number;
  };
}
