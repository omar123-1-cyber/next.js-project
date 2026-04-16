'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { UserPlus, Users, AlertCircle, MessageSquare, Clock } from 'lucide-react';
import { friends } from './data/friends';
import FriendCard from '../components/FriendCard';

export default function Home() {
  const [loading, setLoading] = useState(true);
  const [displayFriends, setDisplayFriends] = useState([]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDisplayFriends(friends);
      setLoading(false);
    }, 1100);
    return () => clearTimeout(timer);
  }, []);

  const total = friends.length;
  const overdue = friends.filter(f => f.status === 'overdue').length;
  const avgDays = Math.round(friends.reduce((sum, f) => sum + f.days_since_contact, 0) / total);

  const summary = [
    { title: 'Total Friends', value: total, icon: Users, color: 'blue' },
    { title: 'Overdue', value: overdue, icon: AlertCircle, color: 'red' },
    { title: 'Interactions', value: 42, icon: MessageSquare, color: 'emerald' },
    { title: 'Avg Days', value: avgDays, icon: Clock, color: 'purple' },
  ];

  return (
    <>
      {/* Banner Section */}
      <div className="bg-gradient-to-br from-blue-600 to-indigo-700 text-white py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 text-center">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-4">KeenKeeper</h1>
          <p className="text-xl md:text-3xl mb-10">Keep Your Friendships Alive</p>
          
          <Link
            href="#"
            className="inline-flex items-center gap-3 bg-white text-blue-700 px-8 py-4 rounded-3xl text-lg font-semibold hover:shadow-2xl transition"
          >
            <UserPlus size={28} />
            Add a Friend
          </Link>

          {/* Summary Cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mt-16">
            {summary.map((item, i) => {
              const Icon = item.icon;
              return (
                <div key={i} className="bg-white/10 backdrop-blur-xl rounded-3xl p-6 text-left">
                  <Icon className="w-8 h-8 md:w-9 md:h-9 mb-4" />
                  <div className="text-3xl md:text-5xl font-bold">{item.value}</div>
                  <div className="text-base md:text-lg opacity-80 mt-1">{item.title}</div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Friends Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 md:py-16">
        <h2 className="text-3xl md:text-4xl font-semibold mb-8">Your Friends</h2>

        {loading ? (
          <div className="flex justify-center py-20">
            <div className="animate-spin w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
            {displayFriends.map(friend => (
              <FriendCard key={friend.id} friend={friend} />
            ))}
          </div>
        )}
      </div>
    </>
  );
}