import React from 'react';
import { motion } from 'framer-motion';
import { Icon } from '../../utils/icons';
import { HOW_IT_WORKS_STEPS } from '../../data/site';

const staggerItem = (i: number) => ({
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-80px' },
  transition: { delay: i * 0.1, duration: 0.5, ease: 'easeOut' },
});

export const HowItWorks: React.FC = () => {
  return (
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
          {HOW_IT_WORKS_STEPS.map((item, i) => (
            <motion.div
              key={i}
              {...staggerItem(i)}
              className="p-10 lg:p-12 bg-black group hover:bg-zinc-50 dark:hover:bg-zinc-900/30 transition-colors"
            >
              <Icon name={item.icon} size={28} className="text-white mb-6 group-hover:scale-110 transition-transform" />
              <div className="font-mono text-[11px] text-zinc-400 mb-4 font-bold tracking-[0.2em]">{item.step}</div>
              <h3 className="font-bold text-lg mb-3 tracking-tighter uppercase">{item.title}</h3>
              <p className="text-[14px] text-zinc-400 leading-relaxed">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
