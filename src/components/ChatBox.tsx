import React, { useState } from "react";

type Message = {
  sender: string;
  text: string;
};

type ChatBoxProps = {
  messages: Message[];
  onSend: (msg: string) => void;
  isLocked: boolean;
  onUnlock: () => void;
};

const ChatBox: React.FC<ChatBoxProps> = ({ messages, onSend, isLocked, onUnlock }) => {
  const [input, setInput] = useState("");

  const handleSend = () => {
    if (input.trim()) {
      onSend(input);
      setInput("");
    }
  };

  if (isLocked) {
    return (
      <div className="flex flex-col items-center">
        <div className="mb-4 text-gray-500">Chat is locked.</div>
        <button className="bg-blue-600 text-white px-4 py-2 rounded" onClick={onUnlock}>
          Unlock for 0.5 USDC
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-80">
      <div className="flex-1 overflow-y-auto mb-2 bg-gray-50 rounded p-2">
        {messages.map((msg, idx) => (
          <div key={idx} className={`mb-1 ${msg.sender === "me" ? "text-right" : "text-left"}`}>
            <span className="inline-block px-2 py-1 rounded bg-blue-100 text-blue-900">
              {msg.text}
            </span>
          </div>
        ))}
      </div>
      <div className="flex gap-2">
        <input
          className="flex-1 border rounded px-2 py-1"
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={e => e.key === "Enter" && handleSend()}
          placeholder="Type a message..."
        />
        <button className="bg-blue-600 text-white px-4 py-1 rounded" onClick={handleSend}>
          Send
        </button>
      </div>
    </div>
  );
};

export default ChatBox; 