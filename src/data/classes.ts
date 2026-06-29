import { CharacterClass } from '../types';

export interface CharacterClassData {
  id: CharacterClass;
  name: string;
  icon: string;
  tagline: string;
  color: string;
  stats: string;
  focus: string;
}

export const CHARACTER_CLASSES: CharacterClassData[] = [
  {
    id: 'UIWarrior',
    name: 'UI Warrior',
    icon: 'Palette',
    tagline: 'You make pixels dance and users weep.',
    color: 'text-accent',
    stats: 'STR 50 | INT 40 | DEX 80',
    focus: 'Frontend craft — React, CSS, animation',
  },
  {
    id: 'LogicMage',
    name: 'Logic Mage',
    icon: 'Binary',
    tagline: 'You see the architecture behind the interface.',
    color: 'text-accent',
    stats: 'STR 40 | INT 90 | DEX 40',
    focus: 'Problem solving — algorithms, state, data flow',
  },
  {
    id: 'Debugger',
    name: 'Debugger',
    icon: 'BugPlay',
    tagline: 'You find the bug before it finds you.',
    color: 'text-accent',
    stats: 'STR 80 | INT 50 | DEX 50',
    focus: 'Systems thinking — performance, edge cases, tooling',
  },
];

export const CLASS_ICON_MAP: Record<string, string> = {
  UIWarrior: 'Palette',
  LogicMage: 'Binary',
  Debugger: 'BugPlay',
};
