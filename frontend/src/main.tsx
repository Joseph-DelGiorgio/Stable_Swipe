import React from "react";
import ReactDOM from "react-dom/client";
import './index.css'
import App from './App.tsx'
import { WalletProvider } from "@suiet/wallet-kit";
import "@suiet/wallet-kit/style.css";

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <WalletProvider>
      <App />
    </WalletProvider>
  </React.StrictMode>,
)
