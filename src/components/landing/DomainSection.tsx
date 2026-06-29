import React from 'react';
import { motion } from 'framer-motion';
import { Icon } from '../../utils/icons';
import { CATEGORIES } from '../../data/site';

const staggerItem = (i: number) => ({
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-80px' },
  transition: { delay: i * 0.1, duration: 0.5, ease: 'easeOut' },
});

export const DomainSection: React.FC = () => {
  return (
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
              <Icon name={cat.icon} size={24} className="text-white mb-4 group-hover:scale-110 transition-transform" />
              <h3 className="font-bold text-base tracking-tighter uppercase">{cat.label}</h3>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
