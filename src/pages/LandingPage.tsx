import React from "react";
import { useNavigate } from "react-router-dom";
import ZkLoginButton from "../components/ZkLoginButton";
import { useUser } from "../UserContext";

const LandingPage: React.FC = () => {
  const navigate = useNavigate();
  const { setAddress } = useUser();

  const handleAuthenticated = (address: string) => {
    setAddress(address);
    navigate("/swipe");
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-blue-100 to-purple-200">
      <h1 className="text-4xl font-bold mb-6">StableSwipe</h1>
      <p className="mb-8 text-lg">Web3 Dating, Powered by Sui & zkLogin</p>
      <ZkLoginButton onAuthenticated={handleAuthenticated} />
    </div>
  );
};

export default LandingPage; 