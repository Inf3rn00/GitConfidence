import React from 'react';
import { motion } from 'framer-motion';

export const Manifesto: React.FC = () => {
  return (
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
  );
};
