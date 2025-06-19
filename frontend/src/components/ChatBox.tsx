import React, { useState, useRef, useEffect, type FormEvent } from "react";

type Message = {
  id: string;
  sender: "me" | "them";
  text: string;
  timestamp: number;
};

type ChatBoxProps = {
  match: { id: string; name: string } | null;
};

const mockMessages: Message[] = [
  { id: "1", sender: "them", text: "Hey there! 👋", timestamp: Date.now() - 60000 },
  { id: "2", sender: "me", text: "Hi! How's it going?", timestamp: Date.now() - 30000 },
];

const ChatBox: React.FC<ChatBoxProps> = ({ match }) => {
  const [messages, setMessages] = useState<Message[]>(mockMessages);
  const [input, setInput] = useState("");
  const [sending, setSending] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  if (!match) {
    return <div className="text-gray-400 text-center py-8">Select a match to start chatting.</div>;
  }

  const handleSend = (e: FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;
    setSending(true);
    setTimeout(() => {
      setMessages((msgs) => [
        ...msgs,
        {
          id: String(Date.now()),
          sender: "me",
          text: input,
          timestamp: Date.now(),
        },
      ]);
      setInput("");
      setSending(false);
    }, 400); // Simulate network
  };

  return (
    <div className="flex flex-col h-96 w-full max-w-lg">
      <div className="flex-1 overflow-y-auto px-2 py-2 bg-blue-50 rounded-t-xl">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex ${msg.sender === "me" ? "justify-end" : "justify-start"} mb-2`}
          >
            <div
              className={`px-4 py-2 rounded-2xl max-w-xs text-sm shadow 
                ${msg.sender === "me" ? "bg-blue-500 text-white" : "bg-white text-gray-800 border"}`}
            >
              {msg.text}
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>
      <form
        onSubmit={handleSend}
        className="flex items-center gap-2 p-2 bg-white rounded-b-xl border-t"
      >
        <input
          className="flex-1 px-4 py-2 rounded-full border focus:outline-none focus:ring-2 focus:ring-blue-300"
          type="text"
          placeholder={`Message ${match.name}...`}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          disabled={sending}
          maxLength={300}
        />
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded-full font-semibold disabled:opacity-50"
          disabled={sending || !input.trim()}
        >
          {sending ? "..." : "Send"}
        </button>
      </form>
    </div>
  );
};

export default ChatBox;
