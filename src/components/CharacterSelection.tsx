import React from 'react';
import { Button } from './ui/Button';
import { CharacterClass } from '../types';
import { Palette, Binary, BugPlay } from 'lucide-react';

const CHARACTERS: { id: CharacterClass; name: string; icon: any; tagline: string; focus: string; stats: string }[] = [
  {
    id: 'UIWarrior',
    name: 'UI Warrior',
    icon: Palette,
    tagline: 'You make pixels dance and users weep.',
    focus: 'Frontend craft — React, CSS, animation',
    stats: 'STR 50 | INT 40 | DEX 80',
  },
  {
    id: 'LogicMage',
    name: 'Logic Mage',
    icon: Binary,
    tagline: 'You see the architecture behind the interface.',
    focus: 'Problem solving — algorithms, state, data flow',
    stats: 'STR 40 | INT 90 | DEX 40',
  },
  {
    id: 'Debugger',
    name: 'Debugger',
    icon: BugPlay,
    tagline: 'You find the bug before it finds you.',
    focus: 'Systems thinking — performance, edge cases, tooling',
    stats: 'STR 80 | INT 50 | DEX 50',
  },
];

interface Props {
  onSelect: (charClass: CharacterClass) => void;
}

export const CharacterSelection: React.FC<Props> = ({ onSelect }) => {
  return (
    <div className="min-h-screen bg-white dark:bg-black p-8 flex items-center justify-center">
      <div className="max-w-4xl w-full space-y-12">
        <div className="text-center space-y-4">
          <h2 className="text-4xl font-bold tracking-tighter uppercase italic">Choose Your Class</h2>
          <p className="font-mono text-[10px] uppercase text-zinc-500 tracking-widest">
            Protocol // Pick_Your_Archetype
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-zinc-200 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-800">
          {CHARACTERS.map((char) => (
            <div
              key={char.id}
              className="bg-white dark:bg-black p-8 space-y-6 hover:bg-zinc-50 dark:hover:bg-zinc-900/30 transition-colors group"
            >
              <div className="flex justify-between items-start">
                <char.icon size={28} className="text-accent group-hover:scale-110 transition-transform" />
                <span className="font-mono text-[10px] text-zinc-400 font-bold uppercase">FRONTEND</span>
              </div>
              <div>
                <h3 className="text-xl font-bold uppercase italic">{char.name}</h3>
                <p className="text-xs text-zinc-500 dark:text-zinc-400 font-sans mt-2 leading-relaxed">
                  {char.tagline}
                </p>
              </div>
              <p className="text-[10px] text-zinc-500 font-mono uppercase tracking-wider">{char.focus}</p>
              <div className="p-4 bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 font-mono text-[10px] font-bold tracking-tighter">
                {char.stats}
              </div>
              <Button variant="primary" fullWidth onClick={() => onSelect(char.id)}>
                SELECT_CLASS
              </Button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
