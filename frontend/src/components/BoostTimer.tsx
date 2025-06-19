import React from "react";

type BoostTimerProps = {
  isActive: boolean;
  secondsLeft: number;
  onBoost: () => Promise<boolean>;
  loading: boolean;
};

const BoostTimer: React.FC<BoostTimerProps> = ({ isActive, secondsLeft, onBoost, loading }) => {
  const [success, setSuccess] = React.useState<null | boolean>(null);

  const handleBoost = async () => {
    setSuccess(null);
    const ok = await onBoost();
    setSuccess(ok);
    if (ok) setTimeout(() => setSuccess(null), 1200);
  };

  return (
    <div className="flex flex-col items-center gap-2">
      {isActive ? (
        <div className="text-blue-600 font-semibold text-lg">
          🚀 Boost active! <span className="ml-2">{secondsLeft}s left</span>
        </div>
      ) : (
        <button
          className="bg-gradient-to-r from-blue-500 to-blue-400 text-white px-6 py-2 rounded-full font-bold shadow hover:from-blue-600 hover:to-blue-500 transition disabled:opacity-50"
          onClick={handleBoost}
          disabled={loading}
        >
          {loading ? "Activating..." : "Activate Boost"}
        </button>
      )}
      {success && <div className="text-green-600 text-sm">Boost activated!</div>}
      {success === false && <div className="text-red-500 text-sm">Failed to activate boost.</div>}
    </div>
  );
};

export default BoostTimer;
