import React, { useState } from "react";
import WalletBar from "../components/WalletBar";
import ChatBox from "../components/ChatBox";
import { useUser } from "../UserContext";

const MatchPage: React.FC = () => {
  const { matches } = useUser();
  const [selectedMatchId, setSelectedMatchId] = useState<string | null>(null);
  const selectedMatch = matches.find((m) => m.id === selectedMatchId) || null;

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <WalletBar />
      <div className="flex flex-row flex-1 w-full max-w-5xl mx-auto">
        {/* Sidebar with matched users */}
        <aside className="w-1/4 min-w-[120px] bg-white border-r p-4 flex flex-col gap-2 rounded-l-xl shadow h-[32rem] mt-8">
          <h3 className="text-lg font-semibold mb-2">Matches</h3>
          {matches.length === 0 ? (
            <div className="text-gray-400 text-sm">No matches yet.</div>
          ) : (
            matches.map((m) => (
              <button
                key={m.id}
                className={`flex items-center gap-2 px-3 py-2 rounded-lg text-left transition border
                  ${selectedMatchId === m.id ? "bg-blue-100 border-blue-400" : "hover:bg-blue-50 border-transparent"}`}
                onClick={() => setSelectedMatchId(m.id)}
              >
                <div className="w-8 h-8 bg-blue-200 rounded-full flex items-center justify-center font-bold text-blue-700">
                  {m.name[0]}
                </div>
                <span className="truncate">{m.name}</span>
              </button>
            ))
          )}
        </aside>
        {/* ChatBox for selected match */}
        <main className="flex-1 flex flex-col items-center justify-center mt-8">
          <div className="bg-white rounded-xl shadow p-0 w-full max-w-lg">
            <h2 className="text-2xl font-semibold mb-4 px-8 pt-8">Chat</h2>
            <ChatBox match={selectedMatch} />
          </div>
        </main>
      </div>
    </div>
  );
};

export default MatchPage;
