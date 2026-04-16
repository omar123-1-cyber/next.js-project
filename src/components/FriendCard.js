import Link from 'next/link';
import Image from 'next/image';

export default function FriendCard({ friend }) {
  const statusStyle = {
    overdue: 'bg-red-500 text-white',
    'almost due': 'bg-yellow-500 text-white',
    'on-track': 'bg-green-500 text-white',
  };

  return (
    <Link href={`/friends/${friend.id}`} className="block bg-white rounded-3xl overflow-hidden shadow hover:shadow-2xl transition group">
      <div className="relative">
        <Image 
          src={friend.picture} 
          alt={friend.name} 
          width={400} 
          height={240} 
          className="w-full h-52 sm:h-56 md:h-60 object-cover group-hover:scale-105 transition duration-300"
          unoptimized={true}
          onError={(e) => {
            e.currentTarget.src = "https://picsum.photos/id/64/400/240";
          }}
        />
        <div className={`absolute top-4 right-4 px-4 py-1 text-xs font-semibold rounded-3xl ${statusStyle[friend.status]}`}>
          {friend.status.toUpperCase()}
        </div>
      </div>

      <div className="p-5 sm:p-6">
        <h3 className="text-lg sm:text-xl font-semibold mb-2 line-clamp-1">{friend.name}</h3>
        
        <div className="flex items-center gap-2 text-gray-500 mb-4 text-sm">
          📅 <span>{friend.days_since_contact} days ago</span>
        </div>

        <div className="flex flex-wrap gap-2">
          {friend.tags.map((tag) => (
            <span key={tag} className="bg-gray-100 text-gray-600 text-xs px-3.5 py-1 rounded-3xl">
              {tag}
            </span>
          ))}
        </div>
      </div>
    </Link>
  );
}