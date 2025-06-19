import React from "react";

const MatchPage: React.FC = () => {
  return (
    <div className="flex flex-row min-h-screen bg-gray-50">
      {/* TODO: Sidebar with matched users */}
      <aside className="w-1/4 bg-white border-r p-4">Matched Users</aside>
      {/* TODO: ChatBox for selected match */}
      <main className="flex-1 flex flex-col items-center justify-center">
        <div className="bg-white rounded-xl shadow p-8 w-full max-w-lg">
          <h2 className="text-2xl font-semibold mb-4">Chat</h2>
          {/* TODO: Render ChatBox here */}
          <div className="text-gray-400">Select a match to start chatting.</div>
        </div>
      </main>
    </div>
  );
};

export default MatchPage;
