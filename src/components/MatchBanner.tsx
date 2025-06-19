import React from "react";

type MatchBannerProps = {
  name: string;
  onClose: () => void;
};

const MatchBanner: React.FC<MatchBannerProps> = ({ name, onClose }) => {
  return (
    <div className="fixed top-8 left-1/2 transform -translate-x-1/2 bg-pink-500 text-white px-6 py-3 rounded-xl shadow-lg flex items-center gap-4 z-50">
      <span className="font-bold">You matched with {name}!</span>
      <button className="ml-4 bg-white text-pink-500 px-3 py-1 rounded" onClick={onClose}>
        Close
      </button>
    </div>
  );
};

export default MatchBanner; 