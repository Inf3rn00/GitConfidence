import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { Button } from '../ui/Button';
import { Card } from '../ui/Card';
import { Domain, SkillLevel } from '../../types';
import { ArrowLeft, Terminal, Shield } from 'lucide-react';

interface AuthViewProps {
  onBack: () => void;
}

export const AuthView: React.FC<AuthViewProps> = ({ onBack }) => {
  const { login } = useAuth();
  const [isLoading, setIsLoading] = useState(false);

  // Form State
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    domain: 'Frontend' as Domain,
    level: 'Intermediate' as SkillLevel
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.fullName || !formData.email) return;
    setIsLoading(true);
    try {
      await login(formData);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white dark:bg-black flex items-center justify-center p-8 selection:bg-accent selection:text-white">
      <div className="max-w-xl w-full grid grid-cols-1 gap-px bg-zinc-200 dark:border-zinc-800 border border-zinc-200 dark:border-zinc-800">
        <div className="bg-white dark:bg-black p-8 border-b border-zinc-200 dark:border-zinc-800 flex justify-between items-center">
           <div className="flex items-center gap-3">
             <Terminal size={14} className="text-accent" />
             <span className="font-mono text-[10px] font-bold uppercase tracking-widest">Protocol // Auth</span>
           </div>
           <button onClick={onBack} className="text-zinc-400 hover:text-black dark:hover:text-white"><ArrowLeft size={16}/></button>
        </div>
        
        <form onSubmit={handleSubmit} className="bg-white dark:bg-black p-8 lg:p-12 space-y-10">
           <div className="space-y-2">
             <h2 className="text-4xl font-bold tracking-tighter uppercase italic">Initialize Identity</h2>
             <p className="text-sm text-zinc-500 font-sans">Set your professional parameters to synchronize with the assessment engine.</p>
           </div>

           <div className="space-y-6">
              <div className="space-y-1">
                <label className="text-[10px] uppercase font-bold text-zinc-400 font-mono tracking-tighter">Identity.name</label>
                <input 
                  required
                  className="w-full h-10 px-0 bg-transparent border-b border-zinc-300 dark:border-zinc-700 text-sm focus:outline-none focus:border-accent transition-colors font-mono"
                  placeholder="Full Name"
                  value={formData.fullName}
                  onChange={e => setFormData({ ...formData, fullName: e.target.value })}
                />
              </div>
              <div className="space-y-1">
                <label className="text-[10px] uppercase font-bold text-zinc-400 font-mono tracking-tighter">Identity.email</label>
                <input 
                  type="email"
                  required
                  className="w-full h-10 px-0 bg-transparent border-b border-zinc-300 dark:border-zinc-700 text-sm focus:outline-none focus:border-accent transition-colors font-mono"
                  placeholder="Primary Email"
                  value={formData.email}
                  onChange={e => setFormData({ ...formData, email: e.target.value })}
                />
              </div>
              <div className="grid grid-cols-2 gap-12">
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

           <Button variant="primary" fullWidth size="lg" disabled={isLoading} type="submit" className="gap-2">
             {isLoading ? 'Processing_Request...' : 'Authorize_Session_Access'} <Shield size={14}/>
           </Button>
        </form>
      </div>
    </div>
  );
};