'use client';
import { useParams } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { Calendar, Edit } from 'lucide-react';
import { friends } from '../../data/friends';
import { useInteractions } from '../../providers';

export default function FriendDetail() {
  const { id } = useParams();
  const friend = friends.find(f => f.id === parseInt(id));
  const { addInteraction } = useInteractions();

  if (!friend) {
    return <div className="text-center py-20 text-3xl">Friend not found</div>;
  }

  const statusStyle = {
    overdue: 'bg-red-500 text-white',
    'almost due': 'bg-yellow-500 text-white',
    'on-track': 'bg-green-500 text-white',
  };

  const handleCheckIn = (type) => {
    addInteraction(type, friend.name);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 md:py-12">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
        
        {/* Left Column - Friend Info */}
        <div className="bg-white rounded-3xl shadow p-6 md:p-10">
          <div className="flex justify-center">
            <Image 
              src={friend.picture} 
              alt={friend.name} 
              width={280} 
              height={280} 
              className="rounded-3xl object-cover shadow-md"
              unoptimized={true}                    // ← এটা খুব জরুরি
              onError={(e) => {
                e.currentTarget.src = "https://picsum.photos/id/64/280/280";
              }}
            />
          </div>

          <h1 className="text-3xl md:text-4xl font-bold text-center mt-6">{friend.name}</h1>
          
          <div className={`mx-auto w-fit mt-3 px-6 py-2 rounded-3xl text-sm font-bold ${statusStyle[friend.status]}`}>
            {friend.status.toUpperCase()}
          </div>

          <div className="flex flex-wrap gap-3 justify-center my-8">
            {friend.tags.map(tag => (
              <span key={tag} className="bg-gray-100 px-5 py-2 rounded-3xl text-sm">
                {tag}
              </span>
            ))}
          </div>

          <p className="text-gray-600 text-center mb-8 leading-relaxed px-2">
            {friend.bio}
          </p>

          <div className="text-center mb-10">
            <span className="font-medium">Email: </span>
            <a href={`mailto:${friend.email}`} className="text-blue-600 hover:underline">
              {friend.email}
            </a>
          </div>

          {/* Action Buttons */}
          <div className="grid grid-cols-3 gap-4">
            <button className="flex flex-col items-center gap-3 bg-gray-100 hover:bg-gray-200 py-6 rounded-3xl transition text-sm">
              <Calendar size={28} />
              Snooze 2 Weeks
            </button>
            <button className="flex flex-col items-center gap-3 bg-gray-100 hover:bg-gray-200 py-6 rounded-3xl transition text-sm">
              📦 Archive
            </button>
            <button className="flex flex-col items-center gap-3 bg-gray-100 hover:bg-gray-200 py-6 rounded-3xl transition text-red-600 text-sm">
              🗑️ Delete
            </button>
          </div>
        </div>

        {/* Right Column */}
        <div className="space-y-6 md:space-y-8">
          {/* Stats Cards */}
          <div className="grid grid-cols-3 gap-4">
            <div className="bg-white rounded-3xl p-6 text-center shadow">
              <div className="text-4xl md:text-5xl font-bold">{friend.days_since_contact}</div>
              <div className="text-xs text-gray-500 mt-1">DAYS SINCE</div>
            </div>
            <div className="bg-white rounded-3xl p-6 text-center shadow">
              <div className="text-4xl md:text-5xl font-bold">{friend.goal}</div>
              <div className="text-xs text-gray-500 mt-1">GOAL</div>
            </div>
            <div className="bg-white rounded-3xl p-6 text-center shadow">
              <div className="text-3xl md:text-4xl font-bold">{friend.next_due_date}</div>
              <div className="text-xs text-gray-500 mt-1">NEXT DUE</div>
            </div>
          </div>

          {/* Relationship Goal */}
          <div className="bg-white rounded-3xl p-6 md:p-8 shadow">
            <div className="flex justify-between items-center mb-6">
              <h3 className="font-semibold text-xl md:text-2xl">Relationship Goal</h3>
              <button className="flex items-center gap-2 text-blue-600 text-sm">
                <Edit size={18} /> Edit
              </button>
            </div>
            <div className="bg-gray-100 rounded-3xl p-6 flex justify-between items-center">
              <span className="text-base">Contact every</span>
              <span className="font-bold text-4xl">{friend.goal} days</span>
            </div>
          </div>

          {/* Quick Check-In */}
          <div className="bg-white rounded-3xl p-6 md:p-8 shadow">
            <h3 className="text-xl md:text-2xl font-semibold mb-6">Quick Check-In</h3>
            <div className="grid grid-cols-3 gap-6 md:gap-8">
              <button 
                onClick={() => handleCheckIn('call')} 
                className="flex flex-col items-center hover:scale-110 transition"
              >
                <Image src="/call.png" alt="Call" width={80} height={80} />
                <span className="mt-3 font-medium text-sm">Call</span>
              </button>

              <button 
                onClick={() => handleCheckIn('text')} 
                className="flex flex-col items-center hover:scale-110 transition"
              >
                <Image src="/text.png" alt="Text" width={80} height={80} />
                <span className="mt-3 font-medium text-sm">Text</span>
              </button>

              <button 
                onClick={() => handleCheckIn('video')} 
                className="flex flex-col items-center hover:scale-110 transition"
              >
                <Image src="/video.png" alt="Video" width={80} height={80} />
                <span className="mt-3 font-medium text-sm">Video</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}