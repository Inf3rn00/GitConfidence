import React, { useState } from 'react';
import { Button } from './ui/Button';
import { Domain, SkillLevel } from '../../types';
import { ArrowRight, ChevronDown, Check, Info } from 'lucide-react';

interface LandingPageProps {
  onStart: (data: { fullName: string; email: string; domain: Domain; level: SkillLevel }) => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({ onStart }) => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    domain: 'Frontend' as Domain,
    level: 'Intermediate' as SkillLevel
  });

  return (
    <div className="min-h-screen bg-white dark:bg-black text-black dark:text-white selection:bg-accent selection:text-white">
      {/* 1. HERO SECTION */}
      <section className="border-b border-zinc-200 dark:border-zinc-800">
        <div className="max-w-[1440px] mx-auto grid grid-cols-1 lg:grid-cols-12">
          <div className="lg:col-span-7 p-8 lg:p-20 border-r border-zinc-200 dark:border-zinc-800 flex flex-col justify-between min-h-[70vh]">
            <div>
              <div className="flex items-center gap-2 mb-12 text-[11px] font-mono font-bold uppercase tracking-[0.25em] text-accent">
                <span className="w-2 h-2 bg-accent inline-block"></span>
                DevSkill Diagnostics v1.0.4
              </div>
              <h1 className="text-6xl lg:text-9xl font-bold tracking-tighter leading-[0.85] mb-8 uppercase">
                Imposter<br/>Syndrome<br/><span className="text-zinc-300 dark:text-zinc-700">is a data</span><br/>Problem.
              </h1>
            </div>
            <p className="max-w-md font-sans text-xl text-zinc-600 dark:text-zinc-300 leading-relaxed font-medium prose-readable">
              A high-precision scoring engine for software engineers. Quantify your technical depth across five architectural domains.
            </p>
          </div>
          <div className="lg:col-span-5 p-8 lg:p-20 flex flex-col justify-center bg-zinc-50 dark:bg-zinc-900/50">
            <div className="max-w-sm mx-auto w-full space-y-12">
              <div className="space-y-4">
                <h2 className="font-mono text-[11px] font-bold uppercase tracking-[0.2em] text-zinc-400">00. INITIALIZE_SESSION</h2>
                <div className="space-y-4">
                  <div className="space-y-1">
                    <label className="text-[10px] uppercase font-bold text-zinc-400 font-mono tracking-tighter">Identity.name</label>
                    <input 
                      className="w-full h-10 px-0 bg-transparent border-b border-zinc-300 dark:border-zinc-700 text-sm focus:outline-none focus:border-accent transition-colors font-mono"
                      placeholder="Jane Doe"
                      value={formData.fullName}
                      onChange={e => setFormData({ ...formData, fullName: e.target.value })}
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] uppercase font-bold text-zinc-400 font-mono tracking-tighter">Identity.email</label>
                    <input 
                      className="w-full h-10 px-0 bg-transparent border-b border-zinc-300 dark:border-zinc-700 text-sm focus:outline-none focus:border-accent transition-colors font-mono"
                      placeholder="jane@devskill.io"
                      value={formData.email}
                      onChange={e => setFormData({ ...formData, email: e.target.value })}
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-8">
                    <div className="space-y-1">
                      <label className="text-[10px] uppercase font-bold text-zinc-400 font-mono tracking-tighter">Domain</label>
                      <select 
                        className="w-full h-10 px-0 bg-transparent border-b border-zinc-300 dark:border-zinc-700 text-sm focus:outline-none focus:border-accent appearance-none font-mono"
                        value={formData.domain}
                        onChange={e => setFormData({ ...formData, domain: e.target.value as Domain })}
                      >
                        {['Frontend', 'Backend', 'Fullstack', 'DevOps', 'Mobile'].map(d => <option key={d} value={d} className="bg-white dark:bg-black">{d}</option>)}
                      </select>
                    </div>
                    <div className="space-y-1">
                      <label className="text-[10px] uppercase font-bold text-zinc-400 font-mono tracking-tighter">Level</label>
                      <select 
                        className="w-full h-10 px-0 bg-transparent border-b border-zinc-300 dark:border-zinc-700 text-sm focus:outline-none focus:border-accent appearance-none font-mono"
                        value={formData.level}
                        onChange={e => setFormData({ ...formData, level: e.target.value as SkillLevel })}
                      >
                        {['Beginner', 'Intermediate', 'Senior'].map(l => <option key={l} value={l} className="bg-white dark:bg-black">{l}</option>)}
                      </select>
                    </div>
                  </div>
                </div>
              </div>
              <Button 
                variant="primary" 
                fullWidth 
                size="lg"
                disabled={!formData.fullName || !formData.email}
                onClick={() => onStart(formData)}
              >
                EXECUTE_DIAGNOSTIC_V1 <ArrowRight size={14} className="ml-2" />
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* 2. THE LOGIC (BREAKDOWN) */}
      <section className="border-b border-zinc-200 dark:border-zinc-800">
        <div className="max-w-[1440px] mx-auto grid grid-cols-1 md:grid-cols-4">
          {[
            { id: '01', title: 'ALGORITHMS', desc: 'Space complexity and optimization patterns across large datasets.' },
            { id: '02', title: 'REACT_CORE', desc: 'Virtual DOM reconciliation and optimized state management hooks.' },
            { id: '03', title: 'ASYNC_PROCOCOLS', desc: 'Event loop mechanics, concurrency models, and non-blocking I/O.' },
            { id: '04', title: 'API_ARCHITECTURE', desc: 'REST, GraphQL, and strictly typed interface implementation standards.' },
          ].map((item, i) => (
            <div key={i} className={`p-12 border-zinc-200 dark:border-zinc-800 ${i !== 3 ? 'md:border-r' : ''}`}>
              <div className="font-mono text-[11px] text-zinc-400 mb-8 font-bold tracking-[0.2em]">{item.id}</div>
              <h3 className="font-bold text-xl mb-4 tracking-tighter uppercase">{item.title}</h3>
              <p className="text-[14px] text-zinc-600 dark:text-zinc-400 leading-relaxed font-medium prose-readable">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 3. WHO IT IS FOR (USE CASES) */}
      <section className="border-b border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900/20">
        <div className="max-w-[1440px] mx-auto grid grid-cols-1 lg:grid-cols-2">
          <div className="p-12 lg:p-24 border-r border-zinc-200 dark:border-zinc-800">
            <h2 className="text-4xl font-bold tracking-tighter uppercase mb-12">Strategic Applications</h2>
            <div className="space-y-12">
              <div className="flex gap-8 max-w-lg">
                <div className="flex-shrink-0 w-10 h-10 bg-black dark:bg-white text-white dark:text-black flex items-center justify-center font-mono font-bold text-sm italic">A</div>
                <div className="space-y-3">
                  <h4 className="font-bold uppercase text-base tracking-tight">Individual Contributors</h4>
                  <p className="text-[15px] text-zinc-600 dark:text-zinc-400 leading-relaxed prose-readable">Benchmark your skills against global industry standards to eliminate internal doubt and map a precise growth trajectory.</p>
                </div>
              </div>
              <div className="flex gap-8 max-w-lg">
                <div className="flex-shrink-0 w-10 h-10 bg-black dark:bg-white text-white dark:text-black flex items-center justify-center font-mono font-bold text-sm italic">B</div>
                <div className="space-y-3">
                  <h4 className="font-bold uppercase text-base tracking-tight">Engineering Leads</h4>
                  <p className="text-[15px] text-zinc-600 dark:text-zinc-400 leading-relaxed prose-readable">Standardize technical assessments for your team without the interference of biased interviewing or inconsistent metrics.</p>
                </div>
              </div>
            </div>
          </div>
          <div className="p-12 lg:p-24 flex items-center">
            <div className="grid grid-cols-2 gap-px bg-zinc-200 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-800 w-full">
              {[
                { val: '94%', label: 'Accuracy Rating' },
                { val: '15M', label: 'Data Points' },
                { val: '100+', label: 'Skill Archetypes' },
                { val: '2s', label: 'Analysis Speed' }
              ].map((stat, i) => (
                <div key={i} className="p-10 bg-white dark:bg-black">
                  <div className="text-5xl font-mono font-bold mb-2 italic tracking-tighter">{stat.val}</div>
                  <div className="text-[11px] font-mono uppercase font-bold text-zinc-400 tracking-[0.2em]">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 4. THE MANIFESTO */}
      <section className="bg-black text-white py-24 lg:py-48 px-8">
        <div className="max-w-4xl mx-auto space-y-16">
          <div className="flex items-center gap-4">
            <div className="w-12 h-px bg-zinc-700"></div>
            <span className="font-mono text-[11px] uppercase tracking-[0.6em] text-zinc-500 font-bold">MANIFESTO_SESSION</span>
          </div>
          <h2 className="text-5xl lg:text-8xl font-bold tracking-tighter leading-[0.9] uppercase italic">
            Truth resides in the stack trace, not the internal monologue.
          </h2>
          <div className="grid md:grid-cols-2 gap-20 text-zinc-300 font-sans text-xl prose-readable">
            <p className="max-w-md opacity-80 hover:opacity-100 transition-opacity duration-500">
              Imposter syndrome isn't an emotional flaw—it's an information asymmetry. When you lack clear, objective data on your technical capabilities, your mind fills the void with insecurity. 
            </p>
            <p className="max-w-md opacity-80 hover:opacity-100 transition-opacity duration-500">
              DevSkill provides the architecture for truth. By breaking down software engineering into measurable, atomic categories, we allow you to move from feeling "not good enough" to knowing exactly where you stand.
            </p>
          </div>
          <div className="pt-12">
            <Button variant="outline" size="lg" className="border-zinc-700 text-zinc-500 hover:text-white" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
              BACK_TO_TOP
            </Button>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-zinc-200 dark:border-zinc-800 p-12">
        <div className="max-w-[1440px] mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="font-mono font-bold text-base italic tracking-tighter">DEVSKILL_SYSTEMS</div>
          <div className="flex gap-12 font-mono text-[11px] font-bold uppercase text-zinc-500 tracking-[0.15em]">
            <a href="#" className="hover:text-black dark:hover:text-white transition-colors">API_DOCS</a>
            <a href="#" className="hover:text-black dark:hover:text-white transition-colors">SYSTEM_STATUS</a>
            <a href="#" className="hover:text-black dark:hover:text-white transition-colors">PRIVACY_ENCRYPTION</a>
          </div>
          <div className="font-mono text-[11px] text-zinc-400 font-medium">© 2024 DEVSKILL. ARCHITECTED BY SYSTEMS_CORP</div>
        </div>
      </footer>
    </div>
  );
};