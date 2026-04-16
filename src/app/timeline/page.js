'use client';
import { useState } from 'react';
import { useInteractions } from '../providers';
import { Phone, MessageCircle, Video } from 'lucide-react';

export default function Timeline() {
  const { timeline, filteredTimeline } = useInteractions();
  const [filter, setFilter] = useState('all');

  const entries = filteredTimeline(filter);

  const getIcon = (type) => {
    if (type === 'call') return Phone;
    if (type === 'text') return MessageCircle;
    return Video;
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      <h1 className="text-4xl font-semibold mb-8">Timeline</h1>

      {/* Filter */}
      <div className="flex gap-2 bg-white p-2 rounded-3xl w-fit mb-10">
        {['all', 'call', 'text', 'video'].map(f => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-8 py-3 rounded-3xl text-sm font-medium transition ${filter === f ? 'bg-blue-600 text-white' : 'hover:bg-gray-100'}`}
          >
            {f === 'all' ? 'All' : f.charAt(0).toUpperCase() + f.slice(1)}
          </button>
        ))}
      </div>

      <div className="space-y-6">
        {entries.length === 0 ? (
          <p className="text-center py-12 text-gray-400 text-xl">No interactions yet. Start checking in!</p>
        ) : (
          entries.map(entry => {
            const Icon = getIcon(entry.type);
            return (
              <div key={entry.id} className="bg-white rounded-3xl p-7 flex gap-6">
                <div className="bg-blue-100 text-blue-600 w-14 h-14 rounded-2xl flex items-center justify-center flex-shrink-0">
                  <Icon size={32} />
                </div>
                <div className="flex-1">
                  <div className="flex justify-between">
                    <h4 className="font-semibold text-xl">{entry.title}</h4>
                    <span className="text-gray-400">{entry.date}</span>
                  </div>
                  <p className="text-gray-500">with {entry.friendName}</p>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}