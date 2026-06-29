import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

export const FinalCTA: React.FC = () => {
  const navigate = useNavigate();

  return (
    <>
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

      <footer className="border-t border-zinc-800 p-8 lg:p-12">
        <div className="max-w-[1440px] mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="font-mono font-bold text-base italic tracking-tighter">▓ GitConfidence ▓</div>
          <div className="flex gap-12 font-mono text-[11px] font-bold uppercase text-zinc-500 tracking-[0.15em]">
            <a href="#" className="hover:text-black dark:hover:text-white transition-colors">DOCS</a>
            <a href="#" className="hover:text-black dark:hover:text-white transition-colors">STATUS</a>
            <a href="#" className="hover:text-black dark:hover:text-white transition-colors">PRIVACY</a>
          </div>
          <div className="font-mono text-[11px] text-zinc-400 font-medium">
            &copy; 2024 GitConfidence. Confidence through evidence.
          </div>
        </div>
      </footer>
    </>
  );
};
