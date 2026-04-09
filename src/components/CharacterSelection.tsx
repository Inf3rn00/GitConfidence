import React from 'react';
import { Button } from './ui/Button';
import { Card } from './ui/Card';
import { CharacterClass } from '../types';
import { Hammer, Zap, Wand2, Axe, CircleDot, BookOpen } from 'lucide-react';

const CHARACTERS: { id: CharacterClass; name: string; icon: any; domain: string; desc: string; stats: string }[] = [
  { id: 'CyberSmith', name: 'CyberSmith', icon: Hammer, domain: 'Fullstack', desc: 'Precision & Durability', stats: 'STR 60 | INT 40 | DEX 50' },
  { id: 'NeonNinja', name: 'NeonNinja', icon: Zap, domain: 'Frontend', desc: 'Swift Visual Interaction', stats: 'STR 40 | INT 70 | DEX 80' },
  { id: 'QuantumMage', name: 'QuantumMage', icon: Wand2, domain: 'Backend', desc: 'Arcane Logic & Architecture', stats: 'STR 30 | INT 90 | DEX 40' },
  { id: 'ByteBerserker', name: 'ByteBerserker', icon: Axe, domain: 'DevOps', desc: 'Infrastructure Strength', stats: 'STR 80 | INT 50 | DEX 60' },
  { id: 'CircuitSorcerer', name: 'CircuitSorcerer', icon: CircleDot, domain: 'Mobile', desc: 'Seamless Connectivity', stats: 'STR 50 | INT 60 | DEX 70' },
  { id: 'DataDruid', name: 'DataDruid', icon: BookOpen, domain: 'Data Science', desc: 'Prophetic Data Insight', stats: 'STR 40 | INT 80 | DEX 50' },
];

interface Props {
  onSelect: (charClass: CharacterClass) => void;
}

export const CharacterSelection: React.FC<Props> = ({ onSelect }) => {
  return (
    <div className="min-h-screen bg-white dark:bg-black p-8 flex items-center justify-center">
      <div className="max-w-5xl w-full space-y-12">
        <div className="text-center space-y-4">
          <h2 className="text-4xl font-bold tracking-tighter uppercase italic">Select Your Avatar</h2>
          <p className="font-mono text-[10px] uppercase text-zinc-500 tracking-widest">Protocol // Choose_Your_Archetype</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-zinc-200 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-800">
          {CHARACTERS.map((char) => (
            <div key={char.id} className="bg-white dark:bg-black p-8 space-y-6 hover:bg-zinc-50 dark:hover:bg-zinc-900/30 transition-colors group">
              <div className="flex justify-between items-start">
                <char.icon size={24} className="text-accent group-hover:scale-110 transition-transform" />
                <span className="font-mono text-[10px] text-zinc-400 font-bold uppercase">{char.domain}</span>
              </div>
              <div>
                <h3 className="text-xl font-bold uppercase italic">{char.name}</h3>
                <p className="text-[10px] text-zinc-500 font-mono mt-1">{char.desc}</p>
              </div>
              <div className="p-4 bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 font-mono text-[10px] font-bold tracking-tighter">
                {char.stats}
              </div>
              <Button variant="primary" fullWidth onClick={() => onSelect(char.id)}>Initialize_Archetype</Button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};