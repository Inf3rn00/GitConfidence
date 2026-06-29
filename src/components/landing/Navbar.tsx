import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { NAV_LINKS } from '../../data/site';

interface NavbarProps {
  scrolled: boolean;
  scrollTo: (id: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ scrolled, scrollTo }) => {
  const navigate = useNavigate();

  return (
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
          className="font-mono font-bold text-sm tracking-tighter italic hover:text-white transition-colors"
        >
           GitConfidence 
        </button>
        <div className="hidden md:flex items-center gap-10">
          {NAV_LINKS.map((link) => (
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
  );
};
