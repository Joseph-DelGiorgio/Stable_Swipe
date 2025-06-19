import React from "react";

const SwipePage: React.FC = () => {
  return (
    <div className="flex flex-col items-center min-h-screen bg-white">
      {/* TODO: Add WalletBar here */}
      <div className="mt-8 w-full max-w-md">
        {/* TODO: Render SwipeCard components here */}
        <div className="bg-gray-100 rounded-xl shadow p-8 flex flex-col items-center">
          <div className="w-32 h-32 bg-gray-300 rounded-full mb-4" />
          <h2 className="text-2xl font-semibold mb-2">Profile Name</h2>
          <p className="mb-2">Age • Bio goes here...</p>
          <div className="flex gap-4 mt-4">
            <button className="bg-red-500 text-white px-4 py-2 rounded-full">❌</button>
            <button className="bg-green-500 text-white px-4 py-2 rounded-full">❤️</button>
            <button className="bg-yellow-400 text-white px-4 py-2 rounded-full">⭐</button>
            <button className="bg-blue-500 text-white px-4 py-2 rounded-full">💸</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SwipePage;
