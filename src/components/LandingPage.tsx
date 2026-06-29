import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import {
  ArrowRight,
  ChevronDown,
  Palette,
  Binary,
  BugPlay,
  Code2,
  Layout,
  Braces,
  Workflow,
  Zap,
  Repeat,
  Award,
  Cpu,
  Terminal,
  MousePointerClick,
  Sparkles,
  Route,
  Box,
} from 'lucide-react';

const CHARACTER_CLASSES = [
  {
    id: 'UIWarrior',
    name: 'UI Warrior',
    icon: Palette,
    tagline: 'You make pixels dance and users weep.',
    color: 'text-accent',
    stats: 'STR 50 | INT 40 | DEX 80',
    focus: 'Frontend craft — React, CSS, animation',
  },
  {
    id: 'LogicMage',
    name: 'Logic Mage',
    icon: Binary,
    tagline: 'You see the architecture behind the interface.',
    color: 'text-accent',
    stats: 'STR 40 | INT 90 | DEX 40',
    focus: 'Problem solving — algorithms, state, data flow',
  },
  {
    id: 'Debugger',
    name: 'Debugger',
    icon: BugPlay,
    tagline: 'You find the bug before it finds you.',
    color: 'text-accent',
    stats: 'STR 80 | INT 50 | DEX 50',
    focus: 'Systems thinking — performance, edge cases, tooling',
  },
];

const CATEGORIES = [
  { icon: Layout, label: 'React Architecture' },
  { icon: Braces, label: 'TypeScript Patterns' },
  { icon: Workflow, label: 'Async JavaScript' },
  { icon: Palette, label: 'CSS Systems' },
  { icon: Zap, label: 'Performance Optimization' },
  { icon: BugPlay, label: 'Debugging Scenarios' },
];

const STATS = [
  { value: '1000+', label: 'Problems Solved' },
  { value: '500+', label: 'Active Developers' },
  { value: '50K+', label: 'XP Earned' },
  { value: '12', label: 'Skill Categories' },
];

export const LandingPage: React.FC = () => {
  const navigate = useNavigate();
  const [scrolled, setScrolled] = useState(false);
  const [terminalLines, setTerminalLines] = useState<string[]>([]);
  const [terminalIndex, setTerminalIndex] = useState(0);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const lines = [
      '> SCANNING_SKILL_MATRIX...',
      '> DETECTING_STRENGTHS...',
      '> CONFIRMED: 7/10 domains above threshold',
      '> IDENTIFYING_GROWTH_AREAS...',
      '> RESULT: Imposter Syndrome = false positive.',
      '> DIAGNOSTIC_COMPLETE.',
    ];
    if (terminalIndex < lines.length) {
      const timer = setTimeout(() => {
        setTerminalLines((prev) => [...prev, lines[terminalIndex]]);
        setTerminalIndex((prev) => prev + 1);
      }, 800);
      return () => clearTimeout(timer);
    }
  }, [terminalIndex]);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  const staggerItem = (i: number) => ({
    initial: { opacity: 0, y: 24 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: '-80px' },
    transition: { delay: i * 0.1, duration: 0.5, ease: 'easeOut' },
  });

  return (
    <div className="min-h-screen bg-black text-white selection:bg-accent selection:text-white">

      {/* NAVBAR */}
      <motion.nav
        className={`fixed top-0 left-0 right-0 z-50 transition-colors duration-200 ${
          scrolled
            ? 'bg-black/90 backdrop-blur border-b border-zinc-800'
            : 'bg-transparent'
        }`}
      >
        <div className="max-w-[1440px] mx-auto px-6 lg:px-12 h-16 flex items-center justify-between">
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="font-mono font-bold text-sm tracking-tighter italic hover:text-accent transition-colors"
          >
             GitConfidence 
          </button>
          <div className="hidden md:flex items-center gap-10">
            {['FEATURES', 'HOW_IT_WORKS', 'CLASSES'].map((link) => (
              <button
                key={link}
                onClick={() => scrollTo(link.toLowerCase().replace(/_/g, '-'))}
                className="font-mono text-[11px] font-bold uppercase tracking-[0.15em] text-zinc-500 hover:text-black dark:hover:text-white transition-colors"
              >
                {link.replace(/_/g, ' ')}
              </button>
            ))}
            <button
              onClick={() => navigate('/onboarding')}
              className="font-mono text-[11px] font-bold uppercase tracking-[0.1em] bg-white text-black px-5 h-9 flex items-center hover:opacity-80 transition-opacity"
            >
              START_JOURNEY <ArrowRight size={12} className="ml-2" />
            </button>
          </div>
        </div>
      </motion.nav>

      {/* HERO */}
      <section
        id="features"
        className="min-h-screen flex items-center border-b border-zinc-800 pt-16"
      >
        <div className="max-w-[1440px] mx-auto w-full grid grid-cols-1 lg:grid-cols-12">
          <div className="lg:col-span-7 p-8 lg:p-20 lg:border-r border-zinc-800 flex flex-col justify-center min-h-[70vh]">
            <motion.div
              initial={{ opacity: 1, y: 0 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: 'easeOut' }}
              className="space-y-8"
            >
              <div className="inline-flex items-center gap-2 px-3 h-7 border border-accent/30 bg-accent/5 font-mono text-[10px] text-accent font-bold uppercase tracking-[0.15em]">
                <Cpu size={10} /> For Frontend Developers
              </div>
              <h1 className="text-6xl lg:text-8xl font-bold tracking-tighter leading-none uppercase">
                Imposter<br />
                Syndrome<br />
                <span className="text-zinc-700">is a data</span>
                <br />
                Problem.
              </h1>
              <p className="max-w-lg font-sans text-lg text-zinc-400 leading-relaxed">
                GitConfidence turns imposter syndrome into a game. Pick your class,
                solve real-world problem sets, and watch your avatar evolve.
                Confidence through evidence.
              </p>
              <div className="flex flex-wrap gap-4">
                <button
                  onClick={() => navigate('/onboarding')}
                  className="font-mono text-[11px] font-bold uppercase tracking-[0.1em] bg-white text-black px-6 h-11 flex items-center hover:opacity-80 transition-opacity"
                >
                  START_YOUR_JOURNEY <ArrowRight size={14} className="ml-2" />
                </button>
                <button
                  onClick={() => scrollTo('how-it-works')}
                  className="font-mono text-[11px] font-bold uppercase tracking-[0.1em] px-6 h-11 flex items-center border border-zinc-700 text-zinc-500 hover:text-black dark:hover:text-white hover:border-zinc-500 dark:hover:border-zinc-500 transition-colors"
                >
                  SEE_HOW_IT_WORKS <ChevronDown size={14} className="ml-2" />
                </button>
              </div>
            </motion.div>
          </div>

          <div className="lg:col-span-5 p-8 lg:p-20 flex items-center justify-center bg-zinc-900/20 min-h-[70vh]">
            <motion.div
              initial={{ opacity: 1, scale: 1 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, delay: 0.3, ease: 'easeOut' }}
              className="w-full max-w-sm border border-zinc-700 bg-black font-mono text-xs"
            >
              <div className="flex items-center gap-2 px-4 h-8 border-b border-zinc-800 bg-zinc-50 dark:bg-zinc-900">
                <div className="w-2.5 h-2.5 rounded-full bg-red-500" />
                <div className="w-2.5 h-2.5 rounded-full bg-yellow-500" />
                <div className="w-2.5 h-2.5 rounded-full bg-green-500" />
                <span className="ml-2 text-[10px] text-zinc-400 uppercase tracking-wider">diagnostic_shell.exe</span>
              </div>
              <div className="p-5 space-y-2 min-h-[240px]">
                {terminalLines.map((line, i) => (
                  <motion.p
                    key={i}
                    initial={{ opacity: 0, x: -8 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.2 }}
                    className={`text-xs leading-relaxed ${
                      line.startsWith('> RESULT') || line.startsWith('> DIAGNOSTIC')
                        ? 'text-accent font-bold'
                        : line.startsWith('> CONFIRMED')
                          ? 'text-green-500'
                          : 'text-zinc-500 dark:text-zinc-400'
                    }`}
                  >
                    {line}
                  </motion.p>
                ))}
                <span className="inline-block w-2 h-4 bg-accent animate-pulse" />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section id="how-it-works" className="border-b border-zinc-800">
        <div className="max-w-[1440px] mx-auto px-8 lg:px-20 py-20 lg:py-28">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-16"
          >
            <span className="font-mono text-[11px] font-bold uppercase tracking-[0.2em] text-zinc-400">
              01. THE_CORE_LOOP
            </span>
            <h2 className="text-4xl lg:text-5xl font-bold tracking-tighter uppercase mt-4">
              How It Works
            </h2>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-px bg-zinc-800 border border-zinc-800">
            {[
              {
                step: '01',
                icon: MousePointerClick,
                title: 'Choose Your Class',
                desc: 'Pick UI Warrior, Logic Mage, or Debugger. Each class has unique stats and a tailored problem track.',
              },
              {
                step: '02',
                icon: Code2,
                title: 'Get Your Brief',
                desc: 'A real-world scenario matched to your level and class. No fluff — just the problem and the context.',
              },
              {
                step: '03',
                icon: Terminal,
                title: 'Solve in Studio',
                desc: 'Split-screen dev environment: problem on the left, code editor on the right. Optional preview pane.',
              },
              {
                step: '04',
                icon: Award,
                title: 'Level Up',
                desc: 'Earn XP, unlock loot, evolve your avatar. Every problem solved is a data point in your growth map.',
              },
            ].map((item, i) => (
              <motion.div
                key={i}
                {...staggerItem(i)}
                className="p-10 lg:p-12 bg-black group hover:bg-zinc-50 dark:hover:bg-zinc-900/30 transition-colors"
              >
                <item.icon size={28} className="text-accent mb-6 group-hover:scale-110 transition-transform" />
                <div className="font-mono text-[11px] text-zinc-400 mb-4 font-bold tracking-[0.2em]">{item.step}</div>
                <h3 className="font-bold text-lg mb-3 tracking-tighter uppercase">{item.title}</h3>
                <p className="text-[14px] text-zinc-400 leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* THE GAME LOOP */}
      <section className="border-b border-zinc-800 bg-zinc-900/20">
        <div className="max-w-[1440px] mx-auto px-8 lg:px-20 py-20 lg:py-28">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-8"
            >
              <span className="font-mono text-[11px] font-bold uppercase tracking-[0.2em] text-zinc-400">
                02. THE_PROGRESSION_SYSTEM
              </span>
              <h2 className="text-4xl lg:text-5xl font-bold tracking-tighter uppercase">
                Solve.<br />
                Earn.<br />
                Evolve.
              </h2>
              <p className="text-zinc-400 leading-relaxed text-lg max-w-md">
                Every problem you solve generates data. Your avatar grows, your stats
                improve, and the imposter syndrome shrinks — because now you have proof.
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="border border-zinc-800 bg-black p-8 lg:p-12">
                <div className="space-y-6">
                  {[
                    { icon: Code2, label: 'Solve a Problem', color: 'text-accent' },
                    { icon: Zap, label: 'Earn XP & Gold', color: 'text-yellow-500' },
                    { icon: Repeat, label: 'Level Up Your Class', color: 'text-green-500' },
                    { icon: Sparkles, label: 'Avatar Evolves', color: 'text-purple-500' },
                    { icon: Route, label: 'Harder Problems Unlock', color: 'text-orange-500' },
                    { icon: ArrowRight, label: 'Repeat → Confidence Compounds', color: 'text-accent' },
                  ].map((item, i) => (
                    <div key={i} className="flex items-center gap-4 group">
                      <div className="w-10 h-10 flex items-center justify-center border border-zinc-800 bg-zinc-50 dark:bg-zinc-900">
                        <item.icon size={16} className={item.color} />
                      </div>
                      <div className="flex-1">
                        <div className="h-2 bg-zinc-100 dark:bg-zinc-900 border border-zinc-800">
                          <motion.div
                            initial={{ width: 0 }}
                            whileInView={{ width: `${70 + i * 5}%` }}
                            viewport={{ once: true }}
                            transition={{ duration: 1, delay: i * 0.2, ease: 'easeOut' }}
                            className="h-full bg-accent"
                          />
                        </div>
                      </div>
                      <span className="font-mono text-[10px] uppercase tracking-wider text-zinc-500 w-32 text-right">
                        {item.label}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* FOR FRONTEND DEVELOPERS */}
      <section className="border-b border-zinc-800">
        <div className="max-w-[1440px] mx-auto px-8 lg:px-20 py-20 lg:py-28">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-16"
          >
            <span className="font-mono text-[11px] font-bold uppercase tracking-[0.2em] text-zinc-400">
              03. DOMAIN_LOCK
            </span>
            <h2 className="text-4xl lg:text-5xl font-bold tracking-tighter uppercase mt-4">
              Built for Frontend Devs
            </h2>
            <p className="text-zinc-500 mt-4 max-w-xl font-sans">
              Our problem sets cover the full frontend spectrum. Backend, DevOps, and Mobile
              drop in Season 2.
            </p>
          </motion.div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-zinc-800 border border-zinc-800">
            {CATEGORIES.map((cat, i) => (
              <motion.div
                key={i}
                {...staggerItem(i)}
                className="p-10 lg:p-12 bg-black group hover:bg-zinc-50 dark:hover:bg-zinc-900/30 transition-colors"
              >
                <cat.icon size={24} className="text-accent mb-4 group-hover:scale-110 transition-transform" />
                <h3 className="font-bold text-base tracking-tighter uppercase">{cat.label}</h3>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CLASSES */}
      <section id="classes" className="border-b border-zinc-800 bg-zinc-900/20">
        <div className="max-w-[1440px] mx-auto px-8 lg:px-20 py-20 lg:py-28">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-16"
          >
            <span className="font-mono text-[11px] font-bold uppercase tracking-[0.2em] text-zinc-400">
              04. CHOOSE_YOUR_CLASS
            </span>
            <h2 className="text-4xl lg:text-5xl font-bold tracking-tighter uppercase mt-4">
              Your Archetype
            </h2>
            <p className="text-zinc-500 mt-4 max-w-xl font-sans">
              Each class has a unique stat profile and problem track. Pick the one
              that matches your style.
            </p>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-zinc-800 border border-zinc-800">
            {CHARACTER_CLASSES.map((cls, i) => (
              <motion.div
                key={cls.id}
                {...staggerItem(i)}
                className="p-10 lg:p-12 bg-black group hover:bg-zinc-50 dark:hover:bg-zinc-900/30 transition-colors"
              >
                <cls.icon size={32} className="text-accent mb-6 group-hover:scale-110 transition-transform" />
                <h3 className="text-2xl font-bold tracking-tighter uppercase italic mb-2">{cls.name}</h3>
                <p className="text-[13px] text-zinc-500 dark:text-zinc-400 font-sans leading-relaxed mb-6">
                  {cls.tagline}
                </p>
                <div className="p-4 bg-zinc-50 dark:bg-zinc-900 border border-zinc-800 font-mono text-[10px] font-bold tracking-tighter mb-4">
                  {cls.stats}
                </div>
                <p className="text-[12px] text-zinc-500 font-mono uppercase tracking-wider">{cls.focus}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* STATS */}
      <section className="border-b border-zinc-800">
        <div className="max-w-[1440px] mx-auto grid grid-cols-1 lg:grid-cols-2">
          <div className="p-12 lg:p-24 border-r border-zinc-800">
            <h2 className="text-4xl font-bold tracking-tighter uppercase mb-12">By the Numbers</h2>
            <p className="text-zinc-400 leading-relaxed font-sans max-w-md">
              Every data point is a developer who moved from doubt to evidence.
            </p>
          </div>
          <div className="p-12 lg:p-24 flex items-center">
            <div className="grid grid-cols-2 gap-px bg-zinc-800 border border-zinc-800 w-full">
              {STATS.map((stat, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1, duration: 0.4 }}
                  className="p-8 lg:p-10 bg-black"
                >
                  <div className="text-4xl lg:text-5xl font-mono font-bold mb-2 italic tracking-tighter">
                    {stat.value}
                  </div>
                  <div className="text-[11px] font-mono uppercase font-bold text-zinc-400 tracking-[0.2em]">
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* MANIFESTO */}
      <section className="bg-black text-white py-24 lg:py-48 px-8">
        <div className="max-w-4xl mx-auto space-y-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex items-center gap-4"
          >
            <div className="w-12 h-px bg-zinc-700" />
            <span className="font-mono text-[11px] uppercase tracking-[0.6em] text-zinc-500 font-bold">
              MANIFESTO_SESSION
            </span>
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.15 }}
            className="text-5xl lg:text-8xl font-bold tracking-tighter leading-[0.9] uppercase italic"
          >
            Truth resides in the stack trace, not the internal monologue.
          </motion.h2>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="grid md:grid-cols-2 gap-20 text-zinc-300 font-sans text-xl"
          >
            <p className="max-w-md opacity-80 hover:opacity-100 transition-opacity duration-500 leading-relaxed">
              Imposter syndrome isn't an emotional flaw—it's an information
              asymmetry. When you lack clear, objective data on your technical
              capabilities, your mind fills the void with insecurity.
            </p>
            <p className="max-w-md opacity-80 hover:opacity-100 transition-opacity duration-500 leading-relaxed">
              GitConfidence provides the architecture for truth. By breaking down
              software engineering into measurable, atomic categories, we allow you
              to move from feeling &quot;not good enough&quot; to knowing exactly where you
              stand.
            </p>
          </motion.div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="border-t border-zinc-800 py-24 lg:py-32 px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-3xl mx-auto text-center space-y-8"
        >
          <h2 className="text-5xl lg:text-7xl font-bold tracking-tighter uppercase italic leading-[0.95]">
            Your first problem is waiting.
          </h2>
          <p className="text-zinc-500 font-sans text-lg max-w-lg mx-auto">
            No email required. Create your character, get your first problem set free.
          </p>
          <button
            onClick={() => navigate('/onboarding')}
            className="inline-flex items-center gap-3 font-mono text-[12px] font-bold uppercase tracking-[0.1em] bg-white text-black px-8 h-14 hover:opacity-80 transition-opacity"
          >
            BEGIN_YOUR_QUEST <ArrowRight size={16} />
          </button>
        </motion.div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-zinc-800 p-8 lg:p-12">
        <div className="max-w-[1440px] mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="font-mono font-bold text-base italic tracking-tighter">▓ GitConfidence ▓</div>
          <div className="flex gap-12 font-mono text-[11px] font-bold uppercase text-zinc-500 tracking-[0.15em]">
            <a href="#" className="hover:text-black dark:hover:text-white transition-colors">
              DOCS
            </a>
            <a href="#" className="hover:text-black dark:hover:text-white transition-colors">
              STATUS
            </a>
            <a href="#" className="hover:text-black dark:hover:text-white transition-colors">
              PRIVACY
            </a>
          </div>
          <div className="font-mono text-[11px] text-zinc-400 font-medium">
            &copy; 2024 GitConfidence. Confidence through evidence.
          </div>
        </div>
      </footer>
    </div>
  );
};
