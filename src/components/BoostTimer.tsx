import React, { useEffect, useState } from "react";

type BoostTimerProps = {
  expiresAt: number; // Unix timestamp (seconds)
};

const BoostTimer: React.FC<BoostTimerProps> = ({ expiresAt }) => {
  const [secondsLeft, setSecondsLeft] = useState(expiresAt - Math.floor(Date.now() / 1000));

  useEffect(() => {
    const interval = setInterval(() => {
      setSecondsLeft(expiresAt - Math.floor(Date.now() / 1000));
    }, 1000);
    return () => clearInterval(interval);
  }, [expiresAt]);

  if (secondsLeft <= 0) return null;

  const mins = Math.floor(secondsLeft / 60);
  const secs = secondsLeft % 60;

  return (
    <div className="bg-yellow-200 text-yellow-900 px-3 py-1 rounded-full text-sm font-semibold mt-2">
      Boost active: {mins}:{secs.toString().padStart(2, "0")} left
    </div>
  );
};

export default BoostTimer; 