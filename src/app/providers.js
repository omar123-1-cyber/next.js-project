'use client';
import { createContext, useContext, useState, useEffect } from 'react';

const InteractionContext = createContext();

export function InteractionProvider({ children }) {
  const [timeline, setTimeline] = useState([]);
  const [toast, setToast] = useState(null);

  // Load from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('timeline');
    if (saved) setTimeline(JSON.parse(saved));
  }, []);

  // Save to localStorage
  useEffect(() => {
    localStorage.setItem('timeline', JSON.stringify(timeline));
  }, [timeline]);

  const addInteraction = (type, friendName) => {
    const newEntry = {
      id: Date.now(),
      date: new Date().toISOString().split('T')[0],
      type,
      friendName,
      title: `${type.charAt(0).toUpperCase() + type.slice(1)} with ${friendName}`
    };
    setTimeline(prev => [newEntry, ...prev]);

    setToast({ message: `✅ ${newEntry.title} logged successfully!` });
    setTimeout(() => setToast(null), 3000);
  };

  const filteredTimeline = (filter) => {
    if (filter === 'all') return timeline;
    return timeline.filter(e => e.type === filter);
  };

  return (
    <InteractionContext.Provider value={{ timeline, addInteraction, filteredTimeline }}>
      {children}
      {toast && (
        <div className="fixed bottom-6 right-6 bg-green-600 text-white px-6 py-4 rounded-2xl shadow-2xl flex items-center gap-3 z-50">
          {toast.message}
        </div>
      )}
    </InteractionContext.Provider>
  );
}

export const useInteractions = () => useContext(InteractionContext);