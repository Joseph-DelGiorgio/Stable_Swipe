import React, { useState } from "react";
import BoostTimer from "../components/BoostTimer";

const SettingsPage: React.FC = () => {
  const [boostExpiry, setBoostExpiry] = useState<number | null>(null);

  const handleActivateBoost = () => {
    setBoostExpiry(Math.floor(Date.now() / 1000) + 3600); // 1 hour boost
  };

  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-50">
      <div className="w-full max-w-xl mt-12 bg-white rounded-xl shadow p-8">
        <h2 className="text-2xl font-semibold mb-6">Settings</h2>
        <div className="mb-4">Preferences and visibility settings coming soon.</div>
        <button className="bg-yellow-400 text-white px-4 py-2 rounded mb-2" onClick={handleActivateBoost}>
          Activate Boost (1 USDC)
        </button>
        {boostExpiry && <BoostTimer expiresAt={boostExpiry} />}
      </div>
    </div>
  );
};

export default SettingsPage; 