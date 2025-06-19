import React from "react";
// import { requestSuiFromFaucet, getZkLoginAddressFromClaims, generateNonce, generateRandomness, jwtToAddress, getZkLoginSignature } from "@mysten/sui/zklogin";

// TODO: Replace with your Google OAuth Client ID
const GOOGLE_CLIENT_ID = "YOUR_GOOGLE_CLIENT_ID";

// Helper to open Google OAuth and get id_token
async function googleOAuth(): Promise<string | null> {
  return new Promise((resolve) => {
    const popup = window.open(
      `https://accounts.google.com/o/oauth2/v2/auth?client_id=${GOOGLE_CLIENT_ID}&redirect_uri=${window.location.origin}&response_type=token&scope=openid%20email`,
      "zklogin-google",
      "width=500,height=600"
    );
    if (!popup) return resolve(null);
    const interval = setInterval(() => {
      try {
        if (!popup.location.hash) return;
        const params = new URLSearchParams(popup.location.hash.substring(1));
        const id_token = params.get("id_token");
        if (id_token) {
          clearInterval(interval);
          popup.close();
          resolve(id_token);
        }
      } catch (e) {}
      if (popup.closed) {
        clearInterval(interval);
        resolve(null);
      }
    }, 500);
  });
}

type ZkLoginButtonProps = {
  onAuthenticated: (address: string) => void;
};

const ZkLoginButton: React.FC<ZkLoginButtonProps> = ({ onAuthenticated }) => {
  const handleLogin = async () => {
    // 1. Google OAuth
    const id_token = await googleOAuth();
    if (!id_token) {
      alert("Google login failed");
      return;
    }
    // 2. TODO: Generate zkLogin proof and get Sui address
    // const address = await getZkLoginAddressFromClaims(...)
    // For now, use a placeholder address
    const address = "0xZKLOGIN_REAL_ADDRESS";
    onAuthenticated(address);
  };

  return (
    <button
      className="bg-blue-600 text-white px-6 py-3 rounded-lg shadow hover:bg-blue-700 transition"
      onClick={handleLogin}
    >
      Sign in with Google (zkLogin)
    </button>
  );
};

export default ZkLoginButton; 