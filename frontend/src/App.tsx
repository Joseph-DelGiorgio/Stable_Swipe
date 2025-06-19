import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, useNavigate } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import SwipePage from "./pages/SwipePage";
import MatchPage from "./pages/MatchPage";
import ProfilePage from "./pages/ProfilePage";
import SettingsPage from "./pages/SettingsPage";
import { UserProvider, useUser } from "./UserContext";
import './App.css'
import { jwtToAddress } from "@mysten/zklogin";

// Helper: Google OAuth URL
const GOOGLE_CLIENT_ID = "YOUR_GOOGLE_CLIENT_ID"; // TODO: Replace with your real client ID
const REDIRECT_URI = window.location.origin + "/auth/callback";
const GOOGLE_AUTH_URL = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${GOOGLE_CLIENT_ID}&redirect_uri=${encodeURIComponent(REDIRECT_URI)}&response_type=token&scope=openid%20email%20profile`;

function AppRoutes() {
  const navigate = useNavigate();
  const { setAddress } = useUser();
  const [notification, setNotification] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  // Step 1: zkLogin handler
  const handleZkLogin = async () => {
    setLoading(true);
    try {
      // 1. Open Google OAuth in a popup
      const popup = window.open(GOOGLE_AUTH_URL, "zklogin-google", "width=500,height=600");
      if (!popup) throw new Error("Popup blocked. Please allow popups.");
      // 2. Wait for redirect with JWT (polling)
      let jwt = "";
      await new Promise<void>((resolve, reject) => {
        const interval = setInterval(() => {
          try {
            if (!popup || popup.closed) throw new Error("Popup closed");
            const hash = popup.location.hash;
            if (hash && hash.includes("id_token")) {
              const params = new URLSearchParams(hash.substring(1));
              jwt = params.get("id_token") || "";
              popup.close();
              clearInterval(interval);
              resolve();
            }
          } catch {
            // Ignore cross-origin errors until redirect
          }
        }, 500);
        setTimeout(() => {
          clearInterval(interval);
          reject(new Error("Login timed out"));
        }, 60_000);
      });
      if (!jwt) throw new Error("Failed to get JWT from Google");
      // 3. Get zkLogin salt from backend (replace with your endpoint)
      const saltRes = await fetch("/api/zklogin-salt?provider=google&jwt=" + encodeURIComponent(jwt));
      if (!saltRes.ok) throw new Error("Failed to fetch zkLogin salt");
      const { salt } = await saltRes.json();
      // 4. Generate Sui address from JWT and salt
      const address = jwtToAddress(jwt, salt);
      setAddress(address);
      setLoading(false);
      navigate("/swipe");
    } catch (err: unknown) {
      const errorMsg = err instanceof Error ? err.message : "zkLogin failed";
      setNotification(errorMsg);
      setLoading(false);
    }
  };

  return (
    <>
      {notification && (
        <div className="toast" onClick={() => setNotification(null)}>
          {notification}
        </div>
      )}
      <Routes>
        <Route path="/" element={<LandingPage onZkLogin={handleZkLogin} loading={loading} />} />
        <Route path="/swipe" element={<SwipePage />} />
        <Route path="/match" element={<MatchPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/settings" element={<SettingsPage />} />
      </Routes>
    </>
  );
}

function App() {
  return (
    <UserProvider>
      <Router>
        <AppRoutes />
      </Router>
    </UserProvider>
  );
}

export default App;
