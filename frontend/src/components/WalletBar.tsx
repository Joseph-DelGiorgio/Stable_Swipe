import React from "react";
import { ConnectButton } from "@suiet/wallet-kit";
import logo from "../assets/logo.svg";
import { useUser } from "../UserContext";

const shorten = (addr: string) => addr.slice(0, 6) + "..." + addr.slice(-4);

const WalletBar: React.FC = () => {
  const { address, usdcBalance } = useUser();
  return (
    <div className="w-full flex items-center justify-between bg-white/80 backdrop-blur rounded-xl shadow px-4 py-2 mb-4 border border-blue-100">
      <div className="flex items-center gap-2">
        <img src={logo} alt="StableSwipe Logo" className="w-8 h-8 mr-2" />
        <span className="font-bold text-blue-700 text-lg hidden sm:inline">StableSwipe</span>
      </div>
      <div className="flex items-center gap-4">
        <span className="text-gray-700 text-sm font-mono">
          {address ? shorten(address) : "Not connected"}
        </span>
        <span className="bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-xs font-semibold border border-blue-200">
          {address ? usdcBalance + " USDC" : "0.00 USDC"}
        </span>
        <ConnectButton className="ml-2" />
      </div>
    </div>
  );
};

export default WalletBar;
