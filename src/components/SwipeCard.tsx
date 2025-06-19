import React from "react";

type Profile = {
  id: string;
  name: string;
  age: number;
  bio: string;
  imageUri: string;
};

type SwipeCardProps = {
  profile: Profile;
  onSwipeLeft: () => void;
  onSwipeRight: () => void;
  onSuperLike: () => void;
  onTip: () => void;
};

const SwipeCard: React.FC<SwipeCardProps> = ({ profile, onSwipeLeft, onSwipeRight, onSuperLike, onTip }) => {
  return (
    <div className="bg-white rounded-xl shadow p-6 flex flex-col items-center">
      <img src={profile.imageUri} alt={profile.name} className="w-32 h-32 rounded-full object-cover mb-4" />
      <h2 className="text-2xl font-semibold mb-1">{profile.name}, {profile.age}</h2>
      <p className="mb-2 text-gray-600">{profile.bio}</p>
      <div className="flex gap-4 mt-4">
        <button className="bg-red-500 text-white px-4 py-2 rounded-full" onClick={onSwipeLeft}>❌</button>
        <button className="bg-green-500 text-white px-4 py-2 rounded-full" onClick={onSwipeRight}>❤️</button>
        <button className="bg-yellow-400 text-white px-4 py-2 rounded-full" onClick={onSuperLike}>⭐</button>
        <button className="bg-blue-500 text-white px-4 py-2 rounded-full" onClick={onTip}>💸</button>
      </div>
    </div>
  );
};

export default SwipeCard; 