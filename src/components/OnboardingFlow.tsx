import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import { Domain, SkillLevel, CharacterClass } from '../types';
import { Palette, Binary, BugPlay, ArrowRight, ArrowLeft, Sparkles, Cpu } from 'lucide-react';

const CLASSES: { id: CharacterClass; name: string; icon: any; tagline: string; stats: string }[] = [
  { id: 'UIWarrior', name: 'UI Warrior', icon: Palette, tagline: 'Pixel-perfect. Animation-obsessed. UX-driven.', stats: 'STR 50 | INT 40 | DEX 80' },
  { id: 'LogicMage', name: 'Logic Mage', icon: Binary, tagline: 'Architecture-first. State-minded. Pattern-seeker.', stats: 'STR 40 | INT 90 | DEX 40' },
  { id: 'Debugger', name: 'Debugger', icon: BugPlay, tagline: 'Edge-case hunter. Performance analyst. Tool builder.', stats: 'STR 80 | INT 50 | DEX 50' },
];

const FEARS = [
  'Breaking production',
  'Not knowing enough',
  'Being too slow',
  'Not belonging',
];

const STEP_LABELS = ['IDENTITY', 'AVATAR', 'SCANNER'];

const stepVariants = {
  enter: { opacity: 0, x: 40 },
  center: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: -40 },
};

export const OnboardingFlow: React.FC = () => {
  const navigate = useNavigate();
  const { createUser } = useAuth();
  const [step, setStep] = useState(0);
  const [direction, setDirection] = useState(1);

  const [form, setForm] = useState({
    fullName: '',
    email: '',
    domain: 'Frontend' as Domain,
    skillLevel: 'Intermediate' as SkillLevel,
    avatarName: '',
    characterClass: null as CharacterClass | null,
    biggestFear: '',
    goalToBuild: '',
  });

  const goNext = () => {
    if (step === 0 && (!form.fullName || !form.email)) return;
    if (step === 1 && !form.avatarName) return;
    if (step === 2 && !form.biggestFear) return;
    setDirection(1);
    if (step < 2) {
      setStep(step + 1);
    } else {
      handleComplete();
    }
  };

  const goBack = () => {
    setDirection(-1);
    setStep(Math.max(0, step - 1));
  };

  const handleComplete = () => {
    if (!form.characterClass) return;
    createUser({
      fullName: form.fullName,
      email: form.email,
      domain: form.domain,
      level: form.skillLevel,
      characterClass: form.characterClass,
      avatarName: form.avatarName,
      biggestFear: form.biggestFear,
      goalToBuild: form.goalToBuild,
    });
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen bg-white dark:bg-black text-black dark:text-white flex items-center justify-center p-8">
      <div className="max-w-2xl w-full">
        {/* STEP INDICATOR */}
        <div className="flex items-center gap-4 mb-12">
          {STEP_LABELS.map((label, i) => (
            <div key={i} className="flex items-center gap-4 flex-1 last:flex-none">
              <div className="flex items-center gap-3">
                <div
                  className={`w-8 h-8 flex items-center justify-center font-mono text-[11px] font-bold border transition-colors ${
                    i <= step
                      ? 'bg-black dark:bg-white text-white dark:text-black border-black dark:border-white'
                      : 'bg-transparent text-zinc-500 border-zinc-300 dark:border-zinc-700'
                  }`}
                >
                  {String(i + 1).padStart(2, '0')}
                </div>
                <span
                  className={`font-mono text-[10px] font-bold uppercase tracking-[0.15em] ${
                    i <= step ? 'text-black dark:text-white' : 'text-zinc-500'
                  }`}
                >
                  {label}
                </span>
              </div>
              {i < STEP_LABELS.length - 1 && (
                <div className="flex-1 h-px bg-zinc-300 dark:bg-zinc-700" />
              )}
            </div>
          ))}
        </div>

        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={step}
            custom={direction}
            variants={stepVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.25, ease: 'easeInOut' }}
          >
            {step === 0 && (
              <div className="space-y-10">
                <div className="space-y-3">
                  <div className="flex items-center gap-2 font-mono text-[11px] text-accent font-bold uppercase tracking-[0.15em]">
                    <Cpu size={14} /> INITIALIZE_PROTOCOL
                  </div>
                  <h2 className="text-4xl font-bold tracking-tighter uppercase italic">Identify Yourself</h2>
                  <p className="text-zinc-500 font-sans text-sm">Enter your details to begin. Your data stays local.</p>
                </div>

                <div className="space-y-6">
                  <div className="grid grid-cols-2 gap-6">
                    <div className="space-y-1.5">
                      <label className="text-[10px] uppercase font-bold text-zinc-400 font-mono tracking-tighter">
                        Identity.name
                      </label>
                      <input
                        className="w-full h-10 px-3 bg-transparent border border-zinc-300 dark:border-zinc-700 text-sm focus:outline-none focus:border-accent transition-colors font-mono"
                        placeholder="Jane Doe"
                        value={form.fullName}
                        onChange={(e) => setForm({ ...form, fullName: e.target.value })}
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-[10px] uppercase font-bold text-zinc-400 font-mono tracking-tighter">
                        Identity.email
                      </label>
                      <input
                        className="w-full h-10 px-3 bg-transparent border border-zinc-300 dark:border-zinc-700 text-sm focus:outline-none focus:border-accent transition-colors font-mono"
                        placeholder="jane@dev.io"
                        value={form.email}
                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-6">
                    <div className="space-y-1.5">
                      <label className="text-[10px] uppercase font-bold text-zinc-400 font-mono tracking-tighter">
                        Domain
                      </label>
                      <select
                        className="w-full h-10 px-3 bg-transparent border border-zinc-300 dark:border-zinc-700 text-sm focus:outline-none focus:border-accent appearance-none font-mono"
                        value={form.domain}
                        onChange={(e) => setForm({ ...form, domain: e.target.value as Domain })}
                      >
                        {['Frontend'].map((d) => (
                          <option key={d} value={d} className="bg-white dark:bg-black">
                            {d}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-[10px] uppercase font-bold text-zinc-400 font-mono tracking-tighter">
                        Level
                      </label>
                      <select
                        className="w-full h-10 px-3 bg-transparent border border-zinc-300 dark:border-zinc-700 text-sm focus:outline-none focus:border-accent appearance-none font-mono"
                        value={form.skillLevel}
                        onChange={(e) => setForm({ ...form, skillLevel: e.target.value as SkillLevel })}
                      >
                        {['Beginner', 'Intermediate', 'Senior'].map((l) => (
                          <option key={l} value={l} className="bg-white dark:bg-black">
                            {l}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {step === 1 && (
              <div className="space-y-10">
                <div className="space-y-3">
                  <div className="flex items-center gap-2 font-mono text-[11px] text-accent font-bold uppercase tracking-[0.15em]">
                    <Sparkles size={14} /> AVATAR_INITIALIZATION
                  </div>
                  <h2 className="text-4xl font-bold tracking-tighter uppercase italic">Create Your Character</h2>
                  <p className="text-zinc-500 font-sans text-sm">Name your avatar and choose your class.</p>
                </div>

                <div className="space-y-1.5">
                  <label className="text-[10px] uppercase font-bold text-zinc-400 font-mono tracking-tighter">
                    Avatar.name
                  </label>
                  <input
                    className="w-full h-10 px-3 bg-transparent border border-zinc-300 dark:border-zinc-700 text-sm focus:outline-none focus:border-accent transition-colors font-mono"
                    placeholder="CodeKnight"
                    value={form.avatarName}
                    onChange={(e) => setForm({ ...form, avatarName: e.target.value })}
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-px bg-zinc-200 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-800">
                  {CLASSES.map((cls) => (
                    <button
                      key={cls.id}
                      onClick={() => setForm({ ...form, characterClass: cls.id })}
                      className={`p-6 text-left bg-white dark:bg-black transition-colors group hover:bg-zinc-50 dark:hover:bg-zinc-900/30 ${
                        form.characterClass === cls.id
                          ? 'ring-1 ring-accent bg-zinc-50 dark:bg-zinc-900'
                          : ''
                      }`}
                    >
                      <cls.icon
                        size={24}
                        className={`mb-4 transition-transform group-hover:scale-110 ${
                          form.characterClass === cls.id ? 'text-accent' : 'text-zinc-400'
                        }`}
                      />
                      <h3 className="font-bold text-base uppercase italic mb-1">{cls.name}</h3>
                      <p className="text-[11px] text-zinc-500 font-sans leading-relaxed mb-3">{cls.tagline}</p>
                      <div className="font-mono text-[10px] font-bold tracking-tighter text-zinc-400">{cls.stats}</div>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {step === 2 && (
              <div className="space-y-10">
                <div className="space-y-3">
                  <div className="flex items-center gap-2 font-mono text-[11px] text-accent font-bold uppercase tracking-[0.15em]">
                    <Cpu size={14} /> DIAGNOSTIC_SCAN
                  </div>
                  <h2 className="text-4xl font-bold tracking-tighter uppercase italic">The Scanner</h2>
                  <p className="text-zinc-500 font-sans text-sm">Three quick questions to personalise your problem set.</p>
                </div>

                <div className="space-y-8">
                  <div className="space-y-2">
                    <label className="text-[12px] uppercase font-bold text-zinc-400 font-mono tracking-tighter block">
                      Q1. Your current skill level
                    </label>
                    <div className="grid grid-cols-3 gap-2">
                      {['Beginner', 'Intermediate', 'Senior'].map((level) => (
                        <button
                          key={level}
                          onClick={() => setForm({ ...form, skillLevel: level as SkillLevel })}
                          className={`h-10 font-mono text-[11px] font-bold uppercase tracking-[0.05em] border transition-colors ${
                            form.skillLevel === level
                              ? 'bg-black dark:bg-white text-white dark:text-black border-black dark:border-white'
                              : 'bg-transparent text-zinc-500 border-zinc-300 dark:border-zinc-700 hover:border-zinc-500'
                          }`}
                        >
                          {level}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-[12px] uppercase font-bold text-zinc-400 font-mono tracking-tighter block">
                      Q2. Your biggest fear as a developer
                    </label>
                    <div className="grid grid-cols-2 gap-2">
                      {FEARS.map((fear) => (
                        <button
                          key={fear}
                          onClick={() => setForm({ ...form, biggestFear: fear })}
                          className={`h-12 px-4 font-mono text-[11px] font-bold uppercase tracking-[0.05em] border transition-colors text-left ${
                            form.biggestFear === fear
                              ? 'bg-black dark:bg-white text-white dark:text-black border-black dark:border-white'
                              : 'bg-transparent text-zinc-500 border-zinc-300 dark:border-zinc-700 hover:border-zinc-500'
                          }`}
                        >
                          {fear}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-[12px] uppercase font-bold text-zinc-400 font-mono tracking-tighter block">
                      Q3. One thing you want to build confidently
                    </label>
                    <textarea
                      className="w-full h-24 px-3 py-3 bg-transparent border border-zinc-300 dark:border-zinc-700 text-sm focus:outline-none focus:border-accent transition-colors font-mono resize-none"
                      placeholder="A full-stack SaaS app..."
                      value={form.goalToBuild}
                      onChange={(e) => setForm({ ...form, goalToBuild: e.target.value })}
                    />
                  </div>
                </div>
              </div>
            )}
          </motion.div>
        </AnimatePresence>

        {/* NAVIGATION */}
        <div className="flex justify-between items-center mt-12">
          <button
            onClick={step === 0 ? () => navigate('/') : goBack}
            className="font-mono text-[11px] font-bold uppercase tracking-[0.1em] flex items-center gap-2 text-zinc-500 hover:text-black dark:hover:text-white transition-colors"
          >
            <ArrowLeft size={14} />
            {step === 0 ? 'EXIT' : 'BACK'}
          </button>

          <button
            onClick={goNext}
            className="font-mono text-[11px] font-bold uppercase tracking-[0.1em] bg-black dark:bg-white text-white dark:text-black px-6 h-11 flex items-center gap-2 hover:opacity-80 transition-opacity"
          >
            {step === 2 ? 'COMPLETE_SETUP' : 'CONTINUE'}
            <ArrowRight size={14} />
          </button>
        </div>
      </div>
    </div>
  );
};
