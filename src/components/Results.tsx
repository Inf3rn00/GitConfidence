import React, { useEffect, useState } from 'react';
import { QuizResult } from '../types';
import { Card } from './ui/Card';
import { Button } from './ui/Button';
import { motion } from 'framer-motion';
import { Trophy, Share2, ArrowLeft, Crown, Target, Info, ShieldCheck, Lock } from 'lucide-react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import confetti from 'canvas-confetti';

interface ResultsProps {
  result: QuizResult;
  isPro: boolean;
  onReturn: () => void;
  onUpgrade: () => void;
}

export const Results: React.FC<ResultsProps> = ({ result, isPro, onReturn, onUpgrade }) => {
  const [showPaystack, setShowPaystack] = useState(false);
  const percentage = Math.round((result.score / result.total) * 100);
  
  useEffect(() => {
    if (percentage >= 80) {
      confetti({
        particleCount: 150,
        spread: 50,
        origin: { y: 0.6 },
        colors: ['#0066FF', '#000000', '#FFFFFF']
      });
    }
  }, [percentage]);

  const chartData = [
    { name: 'Algorithms', value: result.stats.algorithms },
    { name: 'React', value: result.stats.react },
    { name: 'Async', value: result.stats.async },
    { name: 'APIs', value: result.stats.apis },
    { name: 'Testing', value: result.stats.testing },
  ];

  const COLORS = ['#000000', '#0066FF', '#71717A', '#27272A', '#09090B'];

  const handleShare = () => {
    const text = `Diagnostic Complete: ${result.score}/${result.total} precision at GitConfidence.`;
    window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}`);
  };

  return (
    <div className="min-h-screen bg-white dark:bg-black text-black dark:text-white font-sans selection:bg-accent selection:text-white pb-24">
      {/* HUD HEADER */}
      <nav className="h-16 border-b border-zinc-200 dark:border-zinc-800 flex items-center justify-between px-8 mb-12">
        <div className="font-mono font-bold text-sm italic tracking-tighter">GITCONFIDENCE // ANALYSIS_REPORT</div>
        <Button variant="ghost" size="sm" onClick={onReturn} className="gap-2"><ArrowLeft size={14}/> Back_to_Hub</Button>
      </nav>

      <div className="max-w-[1440px] mx-auto px-8 grid grid-cols-1 lg:grid-cols-12 gap-px bg-zinc-200 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-800">
        
        {/* SCORE SUMMARY */}
        <div className="lg:col-span-4 bg-white dark:bg-black p-12 space-y-12">
          <div className="space-y-4">
             <div className="text-[10px] font-mono font-bold text-accent uppercase tracking-widest">Precision_Metric</div>
             <div className="text-9xl font-mono font-bold tracking-tighter italic">
               {result.score}<span className="text-3xl text-zinc-300 dark:text-zinc-700">/{result.total}</span>
             </div>
             <h2 className="text-3xl font-bold uppercase tracking-tighter italic">
               {percentage >= 80 ? 'ELITE_DIAGNOSTIC' : percentage >= 50 ? 'AVERAGE_BENCHMARK' : 'SUBOPTIMAL_FLOW'}
             </h2>
          </div>

          <div className="space-y-1">
             <h4 className="text-[10px] font-mono font-bold text-zinc-400 uppercase mb-4 tracking-widest">Fail_Log_0x00</h4>
             <div className="grid grid-cols-3 gap-px bg-zinc-200 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-800">
               {[1, 4, 7].map(num => (
                 <div key={num} className="bg-white dark:bg-black p-4 text-center">
                    <div className="text-[10px] font-mono font-bold text-red-600">Q_0{num}</div>
                    <div className="text-[9px] font-mono text-zinc-400">FAIL</div>
                 </div>
               ))}
             </div>
          </div>
        </div>

        {/* DATA RADAR */}
        <div className="lg:col-span-5 bg-white dark:bg-black p-12 space-y-12 border-x border-zinc-200 dark:border-zinc-800">
           <div className="flex justify-between items-center">
             <div className="text-[10px] font-mono font-bold text-zinc-400 uppercase tracking-widest">Archetype_Breakdown</div>
             <Target size={14} className="text-accent" />
           </div>

           <div className="h-64 relative">
             <ResponsiveContainer width="100%" height="100%">
               <PieChart>
                 <Pie
                   data={chartData}
                   cx="50%"
                   cy="50%"
                   innerRadius={60}
                   outerRadius={80}
                   paddingAngle={4}
                   dataKey="value"
                   stroke="none"
                 >
                   {chartData.map((entry, index) => (
                     <Cell key={`cell-${index}`} fill={index === 1 ? '#0066FF' : index === 0 ? '#000000' : '#A1A1AA'} />
                   ))}
                 </Pie>
                 <Tooltip 
                   contentStyle={{ background: '#000', border: 'none', borderRadius: '0', fontSize: '10px', fontFamily: 'JetBrains Mono' }}
                   itemStyle={{ color: '#fff' }}
                 />
               </PieChart>
             </ResponsiveContainer>
           </div>

           <div className="grid grid-cols-2 gap-8 font-mono text-[10px]">
             {chartData.map((item, i) => (
                <div key={item.name} className="flex justify-between border-b border-zinc-100 dark:border-zinc-900 pb-2">
                   <span className="text-zinc-400 uppercase">{item.name}</span>
                   <span className="font-bold">{item.value}%</span>
                </div>
             ))}
           </div>
        </div>

        {/* PRO CONVERSION */}
        <div className="lg:col-span-3 bg-zinc-50 dark:bg-zinc-900/40 p-12 space-y-12 flex flex-col justify-between">
           <div className="space-y-6">
              <Crown size={20} className="text-accent" />
              <h3 className="text-xl font-bold uppercase tracking-tighter leading-tight italic">Unlock Senior Intelligence Package</h3>
              <ul className="space-y-4 font-mono text-[11px] text-zinc-500">
                 <li className="flex gap-2"><div className="w-1 h-1 bg-accent mt-1.5"></div> AI Question Breakdown</li>
                 <li className="flex gap-2"><div className="w-1 h-1 bg-accent mt-1.5"></div> Custom Growth Roadmap</li>
                 <li className="flex gap-2"><div className="w-1 h-1 bg-accent mt-1.5"></div> Verified Dev Identity</li>
              </ul>
           </div>

           <div className="space-y-4">
              <Button variant="primary" fullWidth size="lg" onClick={() => setShowPaystack(true)}>Upgrade_Pro_₦2500</Button>
              <Button variant="ghost" fullWidth size="sm" onClick={handleShare} className="gap-2">Broadcast_Results <Share2 size={12}/></Button>
           </div>
        </div>

      </div>

      {/* Paystack Mock Modal */}
      {showPaystack && (
        <div className="fixed inset-0 z-100 flex items-center justify-center bg-black/95 backdrop-blur-sm p-8">
           <div className="max-w-md w-full border border-zinc-800 bg-black p-12 space-y-12 text-center">
              <div className="space-y-4">
                 <Lock className="mx-auto text-accent" size={32} />
                 <h2 className="text-2xl font-bold uppercase tracking-tighter font-mono italic">Secure_Payment_Protocol</h2>
                 <p className="text-[11px] text-zinc-500 font-mono italic">Initializing encrypted transaction with Paystack Gateway...</p>
                 <div className="h-0.5 w-full bg-zinc-900 mt-4 overflow-hidden">
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: '100%' }}
                      transition={{ duration: 2 }}
                      className="h-full bg-accent"
                    />
                 </div>
              </div>
              <Button variant="primary" fullWidth size="lg" onClick={() => { 
                onUpgrade(); 
                setShowPaystack(false); 
              }}>
                Confirm_Identity_Upgrade
              </Button>
           </div>
        </div>
      )}
    </div>
  );
};