import React from 'react';
import { motion } from 'framer-motion';
import { NotesList } from '../components/Notes/NotesList';

export const Notes: React.FC = () => {
  return (
    <motion.div
      className="space-y-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div>
        <h1 className="text-3xl font-bold text-white mb-2">Notes</h1>
        <p className="text-white/70">
          Manage your AI-enhanced notes and extracted tasks.
        </p>
      </div>

      <NotesList />
    </motion.div>
  );
};