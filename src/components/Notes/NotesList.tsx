import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FileText, 
  Brain, 
  Clock, 
  CheckSquare, 
  Star,
  Mic,
  Edit3,
  Trash2,
  Plus
} from 'lucide-react';
import { useAppStore } from '../../store/useAppStore';
import { Note } from '../../types';
import toast from 'react-hot-toast';

export const NotesList: React.FC = () => {
  const { notes, deleteNote, updateNote, incrementAiUsage } = useAppStore();
  const [expandedNote, setExpandedNote] = useState<string | null>(null);

  const handleAiSummarize = (note: Note) => {
    if (incrementAiUsage()) {
      const aiSummary = `AI Summary: ${note.content.slice(0, 100)}... Key insights extracted with priority tasks identified.`;
      const aiTasks = [
        {
          id: Date.now().toString() + '1',
          text: 'Follow up on main topic',
          priority: 'high' as const,
          completed: false,
          aiScore: 92,
          estimatedTime: '30 minutes'
        },
        {
          id: Date.now().toString() + '2', 
          text: 'Research additional resources',
          priority: 'medium' as const,
          completed: false,
          aiScore: 78,
          estimatedTime: '1 hour'
        }
      ];

      updateNote(note.id, {
        summary: aiSummary,
        tasks: [...note.tasks, ...aiTasks],
        isAiProcessed: true
      });

      toast.success('AI analysis complete!');
    }
  };

  const toggleTask = (noteId: string, taskId: string) => {
    const note = notes.find(n => n.id === noteId);
    if (note) {
      const updatedTasks = note.tasks.map(task =>
        task.id === taskId ? { ...task, completed: !task.completed } : task
      );
      updateNote(noteId, { tasks: updatedTasks });
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'text-red-400 bg-red-500/20';
      case 'medium': return 'text-yellow-400 bg-yellow-500/20';
      case 'low': return 'text-green-400 bg-green-500/20';
      default: return 'text-gray-400 bg-gray-500/20';
    }
  };

  if (notes.length === 0) {
    return (
      <div className="card text-center py-12">
        <FileText className="w-16 h-16 text-white/30 mx-auto mb-4" />
        <h3 className="text-xl font-bold text-white mb-2">No notes yet</h3>
        <p className="text-white/70 mb-6">Create your first note to get started with AI-powered productivity</p>
        <button className="button-primary">
          <Plus className="w-4 h-4 mr-2" />
          Create Note
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-white">Your Notes</h2>
        <div className="text-white/70">
          {notes.length} note{notes.length !== 1 ? 's' : ''}
        </div>
      </div>

      <AnimatePresence>
        {notes.map((note, index) => (
          <motion.div
            key={note.id}
            className="card hover:bg-white/15"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ delay: index * 0.1 }}
            layout
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <div className="flex items-center space-x-3 mb-2">
                  <h3 className="text-lg font-semibold text-white">{note.title}</h3>
                  <div className="flex items-center space-x-2">
                    {note.transcriptionSource === 'voice' && (
                      <div className="p-1 rounded-full bg-purple-500/20">
                        <Mic className="w-3 h-3 text-purple-400" />
                      </div>
                    )}
                    {note.isAiProcessed && (
                      <div className="p-1 rounded-full bg-emerald-500/20">
                        <Brain className="w-3 h-3 text-emerald-400" />
                      </div>
                    )}
                  </div>
                </div>
                
                <div className="flex items-center space-x-4 text-sm text-white/60 mb-3">
                  <div className="flex items-center space-x-1">
                    <Clock className="w-4 h-4" />
                    <span>{new Date(note.createdAt).toLocaleDateString()}</span>
                  </div>
                  {note.tasks.length > 0 && (
                    <div className="flex items-center space-x-1">
                      <CheckSquare className="w-4 h-4" />
                      <span>{note.tasks.filter(t => t.completed).length}/{note.tasks.length} tasks</span>
                    </div>
                  )}
                </div>

                {note.summary && (
                  <div className="p-3 bg-emerald-500/10 border border-emerald-500/20 rounded-lg mb-3">
                    <div className="flex items-center space-x-2 mb-1">
                      <Brain className="w-4 h-4 text-emerald-400" />
                      <span className="text-sm font-medium text-emerald-400">AI Summary</span>
                    </div>
                    <p className="text-white/80 text-sm">{note.summary}</p>
                  </div>
                )}

                <p className="text-white/70 text-sm line-clamp-3">
                  {note.content}
                </p>
              </div>

              <div className="flex items-center space-x-2 ml-4">
                {!note.isAiProcessed && (
                  <button
                    onClick={() => handleAiSummarize(note)}
                    className="p-2 rounded-lg bg-purple-500/20 hover:bg-purple-500/30 text-purple-400 transition-colors"
                    title="AI Analyze"
                  >
                    <Brain className="w-4 h-4" />
                  </button>
                )}
                <button
                  onClick={() => setExpandedNote(expandedNote === note.id ? null : note.id)}
                  className="p-2 rounded-lg hover:bg-white/10 text-white/70 transition-colors"
                >
                  <Edit3 className="w-4 h-4" />
                </button>
                <button
                  onClick={() => {
                    deleteNote(note.id);
                    toast.success('Note deleted');
                  }}
                  className="p-2 rounded-lg hover:bg-red-500/20 text-red-400 transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Tasks */}
            {note.tasks.length > 0 && (
              <div className="space-y-2">
                <h4 className="text-sm font-medium text-white/80 flex items-center space-x-2">
                  <CheckSquare className="w-4 h-4" />
                  <span>Extracted Tasks</span>
                </h4>
                
                {note.tasks.map((task) => (
                  <div
                    key={task.id}
                    className={`flex items-center space-x-3 p-2 rounded-lg transition-all ${
                      task.completed ? 'bg-green-500/10' : 'bg-white/5'
                    }`}
                  >
                    <button
                      onClick={() => toggleTask(note.id, task.id)}
                      className={`w-4 h-4 rounded border-2 flex items-center justify-center transition-colors ${
                        task.completed 
                          ? 'bg-green-500 border-green-500' 
                          : 'border-white/30 hover:border-white/50'
                      }`}
                    >
                      {task.completed && <CheckSquare className="w-3 h-3 text-white" />}
                    </button>
                    
                    <div className="flex-1">
                      <p className={`text-sm ${task.completed ? 'line-through text-white/50' : 'text-white/80'}`}>
                        {task.text}
                      </p>
                      {task.aiScore && (
                        <div className="flex items-center space-x-2 mt-1">
                          <span className={`px-2 py-1 rounded text-xs ${getPriorityColor(task.priority)}`}>
                            {task.priority}
                          </span>
                          <div className="flex items-center space-x-1 text-xs text-white/60">
                            <Star className="w-3 h-3" />
                            <span>AI Score: {task.aiScore}/100</span>
                          </div>
                          {task.estimatedTime && (
                            <span className="text-xs text-white/60">
                              Est: {task.estimatedTime}
                            </span>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Expanded content */}
            <AnimatePresence>
              {expandedNote === note.id && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="mt-4 pt-4 border-t border-white/20"
                >
                  <div className="space-y-3">
                    <div>
                      <label className="block text-sm font-medium text-white/80 mb-2">
                        Full Content
                      </label>
                      <textarea
                        value={note.content}
                        onChange={(e) => updateNote(note.id, { content: e.target.value })}
                        className="w-full p-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none"
                        rows={4}
                      />
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};