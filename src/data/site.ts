export const NAV_LINKS = ['FEATURES', 'HOW_IT_WORKS', 'CLASSES'];

export const CATEGORIES = [
  { icon: 'Layout', label: 'React Architecture' },
  { icon: 'Braces', label: 'TypeScript Patterns' },
  { icon: 'Workflow', label: 'Async JavaScript' },
  { icon: 'Palette', label: 'CSS Systems' },
  { icon: 'Zap', label: 'Performance Optimization' },
  { icon: 'BugPlay', label: 'Debugging Scenarios' },
];

export const STATS_DATA = [
  { value: '1000+', label: 'Problems Solved' },
  { value: '500+', label: 'Active Developers' },
  { value: '50K+', label: 'XP Earned' },
  { value: '12', label: 'Skill Categories' },
];

export const HOW_IT_WORKS_STEPS = [
  { step: '01', icon: 'MousePointerClick', title: 'Choose Your Class', desc: 'Pick UI Warrior, Logic Mage, or Debugger. Each class has unique stats and a tailored problem track.' },
  { step: '02', icon: 'Code2', title: 'Get Your Brief', desc: 'A real-world scenario matched to your level and class. No fluff — just the problem and the context.' },
  { step: '03', icon: 'Terminal', title: 'Solve in Studio', desc: 'Split-screen dev environment: problem on the left, code editor on the right. Optional preview pane.' },
  { step: '04', icon: 'Award', title: 'Level Up', desc: 'Earn XP, unlock loot, evolve your avatar. Every problem solved is a data point in your growth map.' },
];

export const PROGRESSION_STEPS = [
  { icon: 'Code2', label: 'Solve a Problem', color: 'text-accent' },
  { icon: 'Zap', label: 'Earn XP & Gold', color: 'text-yellow-500' },
  { icon: 'Repeat', label: 'Level Up Your Class', color: 'text-green-500' },
  { icon: 'Sparkles', label: 'Avatar Evolves', color: 'text-purple-500' },
  { icon: 'Route', label: 'Harder Problems Unlock', color: 'text-orange-500' },
  { icon: 'ArrowRight', label: 'Repeat → Confidence Compounds', color: 'text-accent' },
];

export const FEARS = [
  'Breaking production',
  'Not knowing enough',
  'Being too slow',
  'Not belonging',
];

export const STEP_LABELS = ['IDENTITY', 'AVATAR', 'SCANNER'];

export const ONBOARDING_CLASSES = [
  { id: 'UIWarrior' as const, name: 'UI Warrior', icon: 'Palette', tagline: 'Pixel-perfect. Animation-obsessed. UX-driven.', stats: 'STR 50 | INT 40 | DEX 80' },
  { id: 'LogicMage' as const, name: 'Logic Mage', icon: 'Binary', tagline: 'Architecture-first. State-minded. Pattern-seeker.', stats: 'STR 40 | INT 90 | DEX 40' },
  { id: 'Debugger' as const, name: 'Debugger', icon: 'BugPlay', tagline: 'Edge-case hunter. Performance analyst. Tool builder.', stats: 'STR 80 | INT 50 | DEX 50' },
];
