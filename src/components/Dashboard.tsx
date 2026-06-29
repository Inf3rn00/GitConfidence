import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { Button } from './ui/Button';
import { 
  Activity, 
  Terminal, 
  Plus, 
  Shield,
  ExternalLink,
  Coins,
  TrendingUp,
  Package,
  ShoppingCart,
  Palette, Binary, BugPlay
} from 'lucide-react';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';

const CLASS_ICONS: Record<string, any> = {
  UIWarrior: Palette,
  LogicMage: Binary,
  Debugger: BugPlay
};

const SHOP_ITEMS = [
  { id: 'speed_potion', name: 'Speed Potion', cost: 25, effect: '+15 DEX', bonus: { dex: 15 } },
  { id: 'theory_book', name: 'Theory Book', cost: 30, effect: '+20 INT', bonus: { int: 20 } },
  { id: 'react_mastery', name: 'React Mastery', cost: 100, effect: '+30 INT, React Badge', bonus: { int: 30 } },
  { id: 'algo_bootcamp', name: 'Algo Bootcamp', cost: 150, effect: '+40 STR, Algo Badge', bonus: { str: 40 } },
];

interface DashboardProps {
  onStartAssessment: () => void;
}

export const Dashboard: React.FC<DashboardProps> = ({ onStartAssessment }) => {
  const { user, logout, upgradePro, purchaseItem } = useAuth();
  const [showShop, setShowShop] = useState(false);

  if (!user) return null;

  const xpProgress = (user.xp / 1000) * 100;
  const CharIcon = CLASS_ICONS[user.characterClass] || Terminal;

  const handlePurchase = (item: typeof SHOP_ITEMS[0]) => {
    if (purchaseItem(item.id, item.cost, item.bonus)) {
      alert(`Acquired ${item.name}!`);
    } else {
      alert("Insufficient funds.");
    }
  };

  return (
    <div className="min-h-screen bg-white dark:bg-black text-black dark:text-white font-sans selection:bg-accent">
      <nav className="h-16 border-b border-zinc-200 dark:border-zinc-800 flex items-center justify-between px-8 sticky top-0 bg-white/80 dark:bg-black/80 backdrop-blur-md z-50">
        <div className="flex items-center gap-8">
          <div className="font-mono font-bold text-base italic tracking-tighter">GITCONFIDENCE // HUB</div>
          <div className="h-4 w-px bg-zinc-200 dark:bg-zinc-800"></div>
          <div className="flex gap-10 font-mono text-[11px] uppercase font-bold text-zinc-400 tracking-[0.2em]">
            <button className={`${!showShop ? 'text-black dark:text-white' : 'hover:text-black dark:hover:text-white transition-colors'}`} onClick={() => setShowShop(false)}>Overview</button>
            <button className={`${showShop ? 'text-black dark:text-white' : 'hover:text-black dark:hover:text-white transition-colors'}`} onClick={() => setShowShop(true)}>Store_Inventory</button>
          </div>
        </div>
        <div className="flex items-center gap-10">
           <div className="flex items-center gap-2 font-mono text-[12px] font-bold text-accent tracking-widest">
              <Coins size={16} />
              <span>{user.gold} GOLD</span>
           </div>
           <Button variant="ghost" size="sm" onClick={logout}>Sign_Out</Button>
        </div>
      </nav>

      <div className="max-w-[1440px] mx-auto grid grid-cols-1 lg:grid-cols-12 min-h-[calc(100vh-64px)]">
        
        {/* CHARACTER PROFILE */}
        <aside className="lg:col-span-3 border-r border-zinc-200 dark:border-zinc-800 p-12 space-y-12 bg-zinc-50/20 dark:bg-zinc-900/10">
          <div className="space-y-10">
            <div className="w-32 h-32 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 flex items-center justify-center relative shadow-sm">
              <CharIcon size={64} className="text-accent" />
              <div className="absolute -bottom-2 -right-2 bg-black dark:bg-white text-white dark:text-black font-mono text-[12px] font-bold px-2.5 py-1.5 border border-zinc-200 dark:border-zinc-800">
                LVL {user.level}
              </div>
            </div>
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter uppercase italic leading-none">{user.fullName}</h2>
              <p className="font-mono text-[12px] text-zinc-400 font-bold uppercase tracking-[0.25em]">{user.characterClass}</p>
            </div>
            
            <div className="space-y-4">
              <div className="flex justify-between font-mono text-[11px] font-bold text-zinc-500 tracking-widest">
                <span>XP // PROGRESS</span>
                <span className="text-black dark:text-white">{user.xp} / 1000</span>
              </div>
              <div className="h-1.5 bg-zinc-100 dark:bg-zinc-800 w-full">
                <div className="h-full bg-accent transition-all duration-700 ease-out" style={{ width: `${xpProgress}%` }}></div>
              </div>
              <p className="text-[11px] font-mono text-zinc-400 italic font-medium">Next synchronization in {1000 - user.xp} XP</p>
            </div>
          </div>

          <div className="space-y-8 pt-8">
            <h4 className="font-mono text-[11px] font-bold text-zinc-400 uppercase tracking-[0.2em] border-b border-zinc-200 dark:border-zinc-800 pb-4">Primary_Stats</h4>
            <div className="space-y-10">
              {[
                { label: 'STR', val: user.stats.str, desc: 'Problem Solving' },
                { label: 'INT', val: user.stats.int, desc: 'Theoretical Depth' },
                { label: 'DEX', val: user.stats.dex, desc: 'Execution Speed' }
              ].map(stat => (
                <div key={stat.label} className="group">
                  <div className="flex justify-between items-end mb-4">
                    <span className="font-mono text-[12px] font-bold tracking-widest text-zinc-500">{stat.label}</span>
                    <span className="font-mono text-xl font-bold italic text-accent">{stat.val}</span>
                  </div>
                  <div className="h-0.5 bg-zinc-100 dark:bg-zinc-900 w-full relative">
                    <div className="h-full bg-black dark:bg-white transition-all duration-1000" style={{ width: `${Math.min(stat.val, 100)}%` }}></div>
                  </div>
                  <p className="text-[10px] font-mono text-zinc-400 mt-2.5 uppercase tracking-widest font-bold opacity-70 group-hover:opacity-100 transition-opacity">{stat.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </aside>

        {/* MAIN WORKSPACE */}
        <main className="lg:col-span-9 p-16 space-y-16">
          {showShop ? (
            <div className="space-y-12 animate-in fade-in duration-500">
              <header className="flex justify-between items-end border-b border-zinc-100 dark:border-zinc-900 pb-8">
                <div className="space-y-3">
                  <h3 className="text-[12px] font-mono font-bold uppercase tracking-[0.4em] text-accent flex items-center gap-2">
                    <ShoppingCart size={16} /> Archetype_Market
                  </h3>
                  <p className="text-[15px] text-zinc-600 dark:text-zinc-400 font-sans max-w-sm prose-readable leading-relaxed">Enhance your professional parameters through technical asset acquisition.</p>
                </div>
              </header>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-zinc-200 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-800">
                {SHOP_ITEMS.map(item => (
                  <div key={item.id} className="bg-white dark:bg-black p-12 flex justify-between items-center group hover:bg-zinc-50 dark:hover:bg-zinc-900/20 transition-colors">
                    <div className="space-y-4">
                      <h4 className="font-bold text-lg uppercase tracking-tight">{item.name}</h4>
                      <p className="text-[12px] font-mono text-zinc-500 uppercase font-bold tracking-widest leading-relaxed">{item.effect}</p>
                    </div>
                    <div className="flex items-center gap-8">
                      <span className="font-mono text-base font-bold text-accent italic">{item.cost} G</span>
                      <Button variant="outline" size="sm" onClick={() => handlePurchase(item)} className="px-8">ACQUIRE</Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="space-y-20">
              <header className="flex justify-between items-end">
                <div className="space-y-3">
                  <h3 className="text-[12px] font-mono font-bold uppercase tracking-[0.4em] text-zinc-400">Terminal_Overview</h3>
                  <p className="text-3xl font-bold tracking-tighter uppercase italic leading-tight">Welcome back, Architect.</p>
                </div>
                <Button variant="primary" onClick={onStartAssessment} className="gap-2 px-10 h-12">
                  Initiate_Diagnostic <Plus size={16} />
                </Button>
              </header>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
                <div className="md:col-span-2 space-y-10">
                  <h4 className="text-[12px] font-mono font-bold text-zinc-400 uppercase tracking-widest flex items-center gap-2 border-b border-zinc-100 dark:border-zinc-900 pb-5">
                    <TrendingUp size={16} /> Session_History_Logs
                  </h4>
                  <div className="border border-zinc-200 dark:border-zinc-800 overflow-hidden shadow-sm">
                    <table className="w-full text-left font-mono text-[12px]">
                      <thead>
                        <tr className="bg-zinc-50 dark:bg-zinc-900 border-b border-zinc-200 dark:border-zinc-800 uppercase text-zinc-500">
                          <th className="p-5 font-bold tracking-widest">Protocol</th>
                          <th className="p-5 font-bold tracking-widest">Precision</th>
                          <th className="p-5 font-bold tracking-widest">Yield</th>
                          <th className="p-5 font-bold tracking-widest">Timestamp</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-zinc-100 dark:divide-zinc-900">
                        {user.testHistory.length > 0 ? user.testHistory.map(test => (
                          <tr key={test.id} className="hover:bg-zinc-50/50 dark:hover:bg-zinc-900/30 transition-colors">
                            <td className="p-5 font-bold uppercase text-zinc-700 dark:text-zinc-300">{test.domain}</td>
                            <td className="p-5 text-accent font-bold italic text-base">{test.score}/{test.total}</td>
                            <td className="p-5 text-zinc-500">+{test.xpEarned} XP <span className="mx-2 text-zinc-300 dark:text-zinc-800">|</span> +{test.goldEarned} G</td>
                            <td className="p-5 text-zinc-400">{new Date(test.date).toLocaleDateString()}</td>
                          </tr>
                        )) : (
                          <tr><td colSpan={4} className="p-20 text-center italic text-zinc-400 text-base">Empty log. Diagnostic engine ready for first sequence.</td></tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>

                <div className="space-y-10">
                   <h4 className="text-[12px] font-mono font-bold text-zinc-400 uppercase tracking-widest flex items-center gap-2 border-b border-zinc-100 dark:border-zinc-900 pb-5">
                    <Package size={16} /> Asset_Storage
                  </h4>
                  <div className="grid grid-cols-1 gap-5">
                    {user.inventory.length > 0 ? user.inventory.map((id, i) => (
                      <div key={i} className="p-6 border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900/40 font-mono text-[12px] uppercase font-bold tracking-widest flex items-center gap-4">
                        <div className="w-2 h-2 bg-accent"></div>
                        {id.replace('_', ' ')}
                      </div>
                    )) : (
                      <div className="p-10 border border-dashed border-zinc-200 dark:border-zinc-800 text-center bg-zinc-50/10">
                        <p className="text-[12px] font-mono text-zinc-400 italic font-medium leading-relaxed">No technical assets acquired via market protocols.</p>
                      </div>
                    )}
                  </div>
                  <Button variant="outline" fullWidth size="lg" onClick={() => setShowShop(true)} className="mt-6">BROWSE_MARKET</Button>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};