import React from "react";

type WalletBarProps = {
  address: string;
  usdcBalance: string;
};

const WalletBar: React.FC<WalletBarProps> = ({ address, usdcBalance }) => {
  return (
    <div className="fixed top-4 right-4 bg-white shadow px-4 py-2 rounded flex items-center gap-4 z-50">
      <span className="font-mono text-xs text-gray-600">{address.slice(0, 6)}...{address.slice(-4)}</span>
      <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs">{usdcBalance} USDC</span>
    </div>
  );
};

export default WalletBar; 