'use client';
import { ReactNode } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

export function PageWrapper({ children }: { children: ReactNode }) {
  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: 20 }}
        className={'h-full'}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}
