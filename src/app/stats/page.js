'use client';
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { useInteractions } from '../providers';

export default function Stats() {
  const { timeline } = useInteractions();

  const count = timeline.reduce((acc, cur) => {
    acc[cur.type] = (acc[cur.type] || 0) + 1;
    return acc;
  }, { call: 0, text: 0, video: 0 });

  const data = [
    { name: 'Call', value: count.call, color: '#3b82f6' },
    { name: 'Text', value: count.text, color: '#10b981' },
    { name: 'Video', value: count.video, color: '#f59e0b' },
  ];

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      <h1 className="text-4xl font-semibold mb-10">Friendship Analytics</h1>
      <div className="bg-white rounded-3xl p-10 max-w-lg mx-auto">
        <ResponsiveContainer width="100%" height={420}>
          <PieChart>
            <Pie data={data} cx="50%" cy="50%" outerRadius={140} dataKey="value" label>
              {data.map((entry, i) => (
                <Cell key={i} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}