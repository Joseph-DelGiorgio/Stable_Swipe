import React from "react";

const LandingPage: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-blue-100 to-purple-200">
      <h1 className="text-4xl font-bold mb-6">StableSwipe</h1>
      <p className="mb-8 text-lg">Web3 Dating, Powered by Sui & zkLogin</p>
      {/* TODO: Add ZkLoginButton here */}
      <button className="bg-blue-600 text-white px-6 py-3 rounded-lg shadow hover:bg-blue-700 transition">Sign in with Google (zkLogin)</button>
    </div>
  );
};

export default LandingPage;
