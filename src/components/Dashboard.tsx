import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { Button } from './ui/Button';
import { 
  Home,
  Target,
  TrendingUp,
  Award,
  Settings,
  Flame,
  Sparkles,
  Trophy,
  Lightbulb,
  ArrowRight,
  Palette, 
  Binary, 
  BugPlay
} from 'lucide-react';

const CLASS_ICONS: Record<string, any> = {
  UIWarrior: Palette,
  LogicMage: Binary,
  Debugger: BugPlay
};

interface DashboardProps {
  onStartAssessment: () => void;
}

export const Dashboard: React.FC<DashboardProps> = ({ onStartAssessment }) => {
  const { user, logout } = useAuth();
  const [activeNav, setActiveNav] = useState('overview');

  if (!user) return null;

  const xpProgress = (user.xp / 1000) * 100;
  const CharIcon = CLASS_ICONS[user.characterClass] || Palette;
  
  // Mock data for dashboard features
  const streakDays = 7;
  const weeklyLeaders = [
    { name: 'Alex Chen', xp: 2450 },
    { name: 'Sam Rivera', xp: 2180 },
    { name: user.fullName, xp: user.xp },
  ];
  
  const dailyTip = "Remember: Every senior developer was once a beginner. Your pace is valid.";
  const recentActivities = user.testHistory.slice(-3).reverse();

  return (
    <div className="min-h-screen bg-black text-white font-sans selection:bg-accent selection:text-white">
      
      {/* TOP NAVBAR */}
      <nav className="h-16 border-b border-zinc-800 flex items-center justify-between px-8 sticky top-0 bg-black/90 backdrop-blur z-50">
        <div className="flex items-center gap-8">
          <div className="font-mono font-bold text-sm italic tracking-tighter">GitConfidence</div>
          <div className="h-4 w-px bg-zinc-800"></div>
          <div className="flex gap-10 font-mono text-[11px] uppercase font-bold text-zinc-500 tracking-[0.15em]">
            <button 
              className={`${activeNav === 'overview' ? 'text-white' : 'hover:text-white transition-colors'}`}
              onClick={() => setActiveNav('overview')}
            >
              Overview
            </button>
            <button 
              className={`${activeNav === 'progress' ? 'text-white' : 'hover:text-white transition-colors'}`}
              onClick={() => setActiveNav('progress')}
            >
              Progress
            </button>
          </div>
        </div>
        <Button variant="ghost" size="sm" onClick={logout}>Sign_Out</Button>
      </nav>

      <div className="max-w-[1440px] mx-auto grid grid-cols-1 lg:grid-cols-12 min-h-[calc(100vh-64px)]">
        
        {/* LEFT SIDEBAR */}
        <aside className="lg:col-span-3 border-r border-zinc-800 p-12 space-y-12 bg-zinc-900/10">
          <div className="space-y-10">
            {/* Character Avatar */}
            <div className="w-32 h-32 bg-zinc-900 border border-zinc-800 flex items-center justify-center relative">
              <CharIcon size={64} className="text-white" strokeWidth={1.5} />
              <div className="absolute -bottom-2 -right-2 bg-white text-black font-mono text-[11px] font-bold px-2.5 py-1.5 border border-zinc-800 uppercase tracking-wider">
                LVL {user.level}
              </div>
            </div>
            
            {/* User Info */}
            <div className="space-y-2">
              <h2 className="text-2xl font-bold tracking-tighter uppercase leading-none">{user.fullName}</h2>
              <p className="font-mono text-[11px] text-zinc-500 font-bold uppercase tracking-[0.2em]">{user.characterClass}</p>
            </div>
            
            {/* XP Progress */}
            <div className="space-y-4">
              <div className="flex justify-between font-mono text-[11px] font-bold text-zinc-600 tracking-widest uppercase">
                <span>XP Progress</span>
                <span className="text-white">{user.xp} / 1000</span>
              </div>
              <div className="h-1.5 bg-zinc-900 w-full">
                <div 
                  className="h-full bg-accent transition-all duration-700 ease-out" 
                  style={{ width: `${xpProgress}%` }}
                ></div>
              </div>
              <p className="text-[11px] font-mono text-zinc-600 italic font-medium">
                {1000 - user.xp} XP until next level
              </p>
            </div>
          </div>

          {/* Character Stats */}
          <div className="space-y-8 pt-8">
            <h4 className="font-mono text-[11px] font-bold text-zinc-600 uppercase tracking-[0.2em] border-b border-zinc-800 pb-4">
              Character Stats
            </h4>
            <div className="space-y-10">
              {[
                { label: 'STR', val: user.stats.str, desc: 'Problem Solving' },
                { label: 'INT', val: user.stats.int, desc: 'Theoretical Depth' },
                { label: 'DEX', val: user.stats.dex, desc: 'Execution Speed' }
              ].map(stat => (
                <div key={stat.label} className="group">
                  <div className="flex justify-between items-end mb-4">
                    <span className="font-mono text-[11px] font-bold tracking-widest text-zinc-600 uppercase">
                      {stat.label}
                    </span>
                    <span className="font-mono text-xl font-bold text-accent">
                      {stat.val}
                    </span>
                  </div>
                  <div className="h-0.5 bg-zinc-900 w-full relative">
                    <div 
                      className="h-full bg-white transition-all duration-1000" 
                      style={{ width: `${Math.min(stat.val, 100)}%` }}
                    ></div>
                  </div>
                  <p className="text-[10px] font-mono text-zinc-600 mt-2.5 uppercase tracking-widest font-bold">
                    {stat.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="space-y-2 pt-8 border-t border-zinc-800">
            {[
              { id: 'overview', icon: Home, label: 'Overview' },
              { id: 'challenges', icon: Target, label: 'Challenges' },
              { id: 'achievements', icon: Award, label: 'Achievements' },
              { id: 'settings', icon: Settings, label: 'Settings' },
            ].map(item => {
              const Icon = item.icon;
              const isActive = activeNav === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveNav(item.id)}
                  className={`w-full flex items-center gap-3 px-4 py-2.5 font-mono text-[11px] uppercase font-bold tracking-[0.15em] transition-colors ${
                    isActive 
                      ? 'bg-zinc-900 text-white border-l-2 border-accent' 
                      : 'text-zinc-600 hover:text-white hover:bg-zinc-900/50'
                  }`}
                >
                  <Icon size={16} strokeWidth={1.5} />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>
        </aside>

        {/* MAIN CONTENT AREA */}
        <main className="lg:col-span-6 p-12 lg:p-20 space-y-16">
          
          {/* Welcome Header */}
          <header className="space-y-4 pb-12 border-b border-zinc-800">
            <div className="inline-flex items-center gap-2 px-3 h-7 border border-accent/30 bg-accent/5 font-mono text-[10px] text-accent font-bold uppercase tracking-[0.15em]">
              <Sparkles size={10} /> Dashboard
            </div>
            <h1 className="text-4xl lg:text-5xl font-bold tracking-tighter leading-none uppercase">
              Welcome back,<br />
              <span className="text-zinc-700">{user.fullName.split(' ')[0]}</span>
            </h1>
            <p className="font-sans text-base text-zinc-500 leading-relaxed max-w-xl">
              You're making steady progress. Every step forward counts. Your current focus: building confidence through evidence.
            </p>
          </header>

          {/* Today's Challenge Card */}
          <div className="border border-zinc-800 bg-zinc-900/20 p-10 space-y-8 hover:border-zinc-700 transition-colors">
            <div className="space-y-4">
              <div className="flex items-center gap-2 font-mono text-[11px] uppercase font-bold tracking-[0.15em] text-zinc-500">
                <Target size={14} strokeWidth={1.5} />
                Today's Challenge
              </div>
              <h2 className="text-2xl font-bold tracking-tight uppercase leading-tight">
                Debug a React Component
              </h2>
              <p className="font-sans text-sm text-zinc-500 leading-relaxed max-w-lg">
                A user reports that the shopping cart total isn't updating when they change quantities. 
                Review the code, identify the issue, and implement a fix. This mirrors real development work.
              </p>
            </div>
            
            <div className="flex items-center gap-4">
              <button
                onClick={onStartAssessment}
                className="font-mono text-[11px] font-bold uppercase tracking-[0.1em] bg-white text-black px-6 h-11 flex items-center hover:opacity-80 transition-opacity"
              >
                Start_Challenge <ArrowRight size={14} className="ml-2" />
              </button>
              <div className="flex items-center gap-4 font-mono text-[11px] text-zinc-600 uppercase tracking-wider">
                <span>+50 XP</span>
                <span className="text-zinc-800">|</span>
                <span>~15 min</span>
              </div>
            </div>
          </div>

          {/* Progress Cards Row */}
          <div className="grid grid-cols-2 gap-6">
            {/* Streak Counter */}
            <div className="border border-zinc-800 bg-zinc-900/20 p-8 space-y-6 hover:border-zinc-700 transition-colors">
              <div className="flex items-center justify-between">
                <span className="font-mono text-[11px] uppercase font-bold tracking-[0.15em] text-zinc-600">
                  Current Streak
                </span>
                <Flame className="text-white" size={20} strokeWidth={1.5} />
              </div>
              <div className="space-y-2">
                <div className="flex items-baseline gap-2">
                  <span className="text-5xl font-bold text-white">{streakDays}</span>
                  <span className="text-lg text-zinc-600 font-mono uppercase tracking-wider">days</span>
                </div>
                <p className="text-[11px] font-mono text-zinc-600 uppercase tracking-wider">
                  Keep the momentum
                </p>
              </div>
            </div>

            {/* Total Challenges */}
            <div className="border border-zinc-800 bg-zinc-900/20 p-8 space-y-6 hover:border-zinc-700 transition-colors">
              <div className="flex items-center justify-between">
                <span className="font-mono text-[11px] uppercase font-bold tracking-[0.15em] text-zinc-600">
                  Challenges
                </span>
                <TrendingUp className="text-white" size={20} strokeWidth={1.5} />
              </div>
              <div className="space-y-2">
                <div className="flex items-baseline gap-2">
                  <span className="text-5xl font-bold text-white">{user.totalTests}</span>
                  <span className="text-lg text-zinc-600 font-mono uppercase tracking-wider">done</span>
                </div>
                <p className="text-[11px] font-mono text-zinc-600 uppercase tracking-wider">
                  Evidence building
                </p>
              </div>
            </div>
          </div>

          {/* Recent Activity */}
          <div className="space-y-6">
            <h3 className="font-mono text-[11px] font-bold text-zinc-600 uppercase tracking-[0.2em] flex items-center gap-2 border-b border-zinc-800 pb-5">
              <TrendingUp size={14} /> Recent Activity
            </h3>
            <div className="border border-zinc-800 overflow-hidden">
              {recentActivities.length > 0 ? (
                <div className="divide-y divide-zinc-800">
                  {recentActivities.map(activity => (
                    <div 
                      key={activity.id} 
                      className="p-6 flex items-center justify-between hover:bg-zinc-900/30 transition-colors"
                    >
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 border border-zinc-800 bg-zinc-900 flex items-center justify-center">
                          <Target size={18} className="text-white" strokeWidth={1.5} />
                        </div>
                        <div>
                          <p className="font-mono text-[11px] font-bold text-white mb-1 uppercase tracking-wider">
                            {activity.domain}
                          </p>
                          <p className="text-[10px] font-mono text-zinc-600 uppercase tracking-widest">
                            {new Date(activity.date).toLocaleDateString('en-US', { 
                              month: 'short', 
                              day: 'numeric',
                              year: 'numeric'
                            })}
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-mono text-sm font-bold text-accent mb-1">+{activity.xpEarned} XP</p>
                        <p className="text-[10px] font-mono text-zinc-600 uppercase tracking-widest">
                          {activity.score}/{activity.total} correct
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="p-16 text-center">
                  <p className="font-mono text-[11px] text-zinc-600 uppercase tracking-wider mb-2">
                    No Activity Yet
                  </p>
                  <p className="text-[10px] font-mono text-zinc-700 uppercase tracking-widest">
                    Start your first challenge
                  </p>
                </div>
              )}
            </div>
          </div>
        </main>

        {/* RIGHT SIDEBAR */}
        <aside className="lg:col-span-3 border-l border-zinc-800 p-12 space-y-10 bg-zinc-900/10">
          
          {/* Weekly Leaderboard */}
          <div className="space-y-6">
            <div className="flex items-center gap-2 font-mono text-[11px] uppercase font-bold tracking-[0.15em] text-zinc-600 border-b border-zinc-800 pb-4">
              <Trophy size={14} strokeWidth={1.5} />
              This Week
            </div>
            <div className="space-y-4">
              {weeklyLeaders.map((leader, idx) => (
                <div key={idx} className="flex items-center justify-between p-4 border border-zinc-800 bg-zinc-900/20 hover:bg-zinc-900/40 transition-colors">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 border border-zinc-800 bg-zinc-900 flex items-center justify-center font-mono text-[10px] text-zinc-600 font-bold">
                      {idx + 1}
                    </div>
                    <div>
                      <p className="font-mono text-[10px] font-bold text-white uppercase tracking-wider truncate">
                        {leader.name}
                      </p>
                      <p className="text-[9px] font-mono text-zinc-600 uppercase tracking-widest">
                        {leader.xp} XP
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Daily Reminder */}
          <div className="border border-zinc-800 bg-zinc-900/20 p-6 space-y-4">
            <div className="flex items-center gap-2 font-mono text-[11px] uppercase font-bold tracking-[0.15em] text-zinc-600">
              <Lightbulb size={14} strokeWidth={1.5} />
              Daily Tip
            </div>
            <p className="font-sans text-xs text-zinc-500 leading-relaxed">
              {dailyTip}
            </p>
          </div>

          {/* Upgrade Section */}
          {!user.isPro && (
            <div className="border border-zinc-800 bg-zinc-900/20 p-6 space-y-4 hover:border-zinc-700 transition-colors">
              <div className="flex items-center gap-2 font-mono text-[11px] uppercase font-bold tracking-[0.15em] text-white">
                <Sparkles size={14} strokeWidth={1.5} />
                Upgrade
              </div>
              <p className="font-sans text-xs text-zinc-500 leading-relaxed">
                Unlock advanced scenarios, personalized paths, and detailed analytics.
              </p>
              <button className="w-full font-mono text-[11px] font-bold uppercase tracking-[0.1em] border border-zinc-700 text-zinc-500 px-4 h-9 flex items-center justify-center hover:text-white hover:border-zinc-500 transition-colors">
                Explore_Pro
              </button>
            </div>
          )}
        </aside>
      </div>
    </div>
  );
};
