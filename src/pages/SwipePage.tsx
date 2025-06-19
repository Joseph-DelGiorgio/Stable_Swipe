import React, { useState } from "react";
import WalletBar from "../components/WalletBar";
import SwipeCard from "../components/SwipeCard";
import BoostTimer from "../components/BoostTimer";
import MatchBanner from "../components/MatchBanner";
import { useUser } from "../UserContext";

const dummyProfile = {
  id: "1",
  name: "Alice",
  age: 27,
  bio: "Loves hiking, coffee, and web3.",
  imageUri: "https://randomuser.me/api/portraits/women/44.jpg",
};

const SwipePage: React.FC = () => {
  const [showMatch, setShowMatch] = useState(false);
  const [boostExpiry, setBoostExpiry] = useState<number | null>(null);
  const { address, usdcBalance } = useUser();

  const handleSwipeLeft = () => {
    // TODO: Call on-chain swipe
  };
  const handleSwipeRight = () => {
    setShowMatch(true); // Simulate a match
  };
  const handleSuperLike = () => {
    setBoostExpiry(Math.floor(Date.now() / 1000) + 3600); // 1 hour boost
  };
  const handleTip = () => {
    // TODO: Open TipModal
  };

  return (
    <div className="flex flex-col items-center min-h-screen bg-white">
      {address && <WalletBar address={address} usdcBalance={usdcBalance} />}
      <div className="mt-8 w-full max-w-md">
        <SwipeCard
          profile={dummyProfile}
          onSwipeLeft={handleSwipeLeft}
          onSwipeRight={handleSwipeRight}
          onSuperLike={handleSuperLike}
          onTip={handleTip}
        />
        {boostExpiry && <BoostTimer expiresAt={boostExpiry} />}
      </div>
      {showMatch && (
        <MatchBanner name={dummyProfile.name} onClose={() => setShowMatch(false)} />
      )}
    </div>
  );
};

export default SwipePage; 