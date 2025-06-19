import React, { useState } from "react";
import ChatBox from "../components/ChatBox";
import { useUser } from "../UserContext";

const dummyMessages = [
  { sender: "me", text: "Hi!" },
  { sender: "Alice", text: "Hey there!" },
];

const MatchPage: React.FC = () => {
  const { matches, setMatches } = useUser();
  const [selectedMatchId, setSelectedMatchId] = useState(matches[0]?.id || "");
  const [isLocked, setIsLocked] = useState(true);
  const [messages, setMessages] = useState(dummyMessages);

  const selectedMatch = matches.find((m) => m.id === selectedMatchId) || matches[0];

  const handleSend = (msg: string) => {
    setMessages([...messages, { sender: "me", text: msg }]);
  };
  const handleUnlock = () => {
    setIsLocked(false);
  };

  return (
    <div className="flex flex-row min-h-screen bg-gray-50">
      <aside className="w-1/4 bg-white border-r p-4">
        <div className="font-bold mb-2">Matched Users</div>
        <ul>
          {matches.map((m) => (
            <li
              key={m.id}
              className={`cursor-pointer p-2 rounded ${selectedMatch?.id === m.id ? "bg-blue-100" : ""}`}
              onClick={() => setSelectedMatchId(m.id)}
            >
              {m.name}
            </li>
          ))}
        </ul>
      </aside>
      <main className="flex-1 flex flex-col items-center justify-center">
        <div className="bg-white rounded-xl shadow p-8 w-full max-w-lg">
          <h2 className="text-2xl font-semibold mb-4">Chat with {selectedMatch?.name || "-"}</h2>
          <ChatBox
            messages={messages}
            onSend={handleSend}
            isLocked={isLocked}
            onUnlock={handleUnlock}
          />
        </div>
      </main>
    </div>
  );
};

export default MatchPage; 