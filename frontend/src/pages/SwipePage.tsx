import React, { useState } from "react";
import WalletBar from "../components/WalletBar";
import SwipeCard from "../components/SwipeCard";
import TipModal from "../components/TipModal";
import BoostTimer from "../components/BoostTimer";

const mockProfiles = [
  {
    name: "Jane Doe",
    age: 27,
    bio: "Web3 builder. Loves dogs, hiking, and DeFi.",
    imageUri: "https://randomuser.me/api/portraits/women/44.jpg",
    id: "user-1",
  },
  {
    name: "Alice Smith",
    age: 25,
    bio: "NFT artist. Coffee addict. Cat mom.",
    imageUri: "https://randomuser.me/api/portraits/women/65.jpg",
    id: "user-2",
  },
  {
    name: "Emily Chen",
    age: 29,
    bio: "DAO contributor. Yoga and sushi lover.",
    imageUri: "https://randomuser.me/api/portraits/women/32.jpg",
    id: "user-3",
  },
];

const SkeletonCard = () => (
  <div className="absolute w-full max-w-md top-0 left-0 z-40 animate-pulse">
    <div className="bg-white rounded-2xl overflow-hidden shadow-lg flex flex-col items-center p-4">
      <div className="w-40 h-40 bg-gray-200 rounded-full mb-4" />
      <div className="h-6 w-32 bg-gray-200 rounded mb-2" />
      <div className="h-4 w-48 bg-gray-100 rounded mb-3" />
      <div className="flex gap-4 mt-2 w-full justify-center">
        <div className="w-12 h-10 bg-gray-100 rounded-full" />
        <div className="w-12 h-10 bg-gray-100 rounded-full" />
        <div className="w-12 h-10 bg-gray-100 rounded-full" />
        <div className="w-12 h-10 bg-gray-100 rounded-full" />
      </div>
    </div>
  </div>
);

const SwipePage: React.FC = () => {
  const [tipOpen, setTipOpen] = useState(false);
  const [boostActive, setBoostActive] = useState(false);
  const [boostSeconds, setBoostSeconds] = useState(0);
  const [boostLoading, setBoostLoading] = useState(false);
  const stack = mockProfiles;
  const [topIndex, setTopIndex] = useState(0);
  const [loadingCard, setLoadingCard] = useState(false);
  const [notification, setNotification] = useState<string | null>(null);

  const handleSwipe = () => {
    setTopIndex((prev) => prev + 1);
  };

  const handleTip = () => setTipOpen(true);
  const handleSuperLike = () => handleSwipe();
  const handleBoost = async () => {
    setBoostLoading(true);
    setLoadingCard(true);
    try {
      await new Promise((r) => setTimeout(r, 1200));
      setBoostActive(true);
      setBoostSeconds(30);
      setNotification("Boost activated! 🚀");
    } catch {
      setNotification("Failed to activate boost.");
    } finally {
      setBoostLoading(false);
      setLoadingCard(false);
    }
    return true;
  };

  React.useEffect(() => {
    if (boostActive && boostSeconds > 0) {
      const timer = setTimeout(() => setBoostSeconds((s) => s - 1), 1000);
      return () => clearTimeout(timer);
    } else if (boostActive && boostSeconds === 0) {
      setBoostActive(false);
    }
  }, [boostActive, boostSeconds]);

  const current = stack[topIndex];
  const next = stack[topIndex + 1];
  const next2 = stack[topIndex + 2];

  return (
    <div className="flex flex-col items-center min-h-screen bg-white">
      <WalletBar />
      {notification && (
        <div className="toast" onClick={() => setNotification(null)}>
          {notification}
        </div>
      )}
      <div className="flex flex-col items-center w-full max-w-md mt-4 relative min-h-[480px]">
        <BoostTimer
          isActive={boostActive}
          secondsLeft={boostSeconds}
          onBoost={handleBoost}
          loading={boostLoading}
        />
        <div className="relative w-full h-[420px] mt-4">
          {loadingCard && <SkeletonCard />}
          {!loadingCard && next2 && (
            <SwipeCard
              key={next2.id}
              {...next2}
              onTip={handleTip}
              onSuperLike={handleSuperLike}
              onSwipe={handleSwipe}
              index={2}
            />
          )}
          {!loadingCard && next && (
            <SwipeCard
              key={next.id}
              {...next}
              onTip={handleTip}
              onSuperLike={handleSuperLike}
              onSwipe={handleSwipe}
              index={1}
            />
          )}
          {!loadingCard && current && (
            <SwipeCard
              key={current.id}
              {...current}
              onTip={handleTip}
              onSuperLike={handleSuperLike}
              onSwipe={handleSwipe}
              index={0}
            />
          )}
          {!loadingCard && !current && (
            <div className="absolute w-full h-full flex flex-col items-center justify-center text-gray-400 text-xl bg-white/80 rounded-2xl shadow">
              No more profiles. Check back later!
            </div>
          )}
        </div>
      </div>
      <TipModal
        open={tipOpen}
        onClose={() => setTipOpen(false)}
        onSend={async () => {
          setLoadingCard(true);
          try {
            await new Promise((r) => setTimeout(r, 1200));
            setNotification("Tip sent! 💸");
            setTipOpen(false);
            return true;
          } catch {
            setNotification("Failed to send tip.");
            return false;
          } finally {
            setLoadingCard(false);
          }
        }}
        recipient={current ? { id: current.id, name: current.name } : null}
      />
    </div>
  );
};

export default SwipePage;
