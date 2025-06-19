import React, { useState } from "react";

type TipModalProps = {
  open: boolean;
  onClose: () => void;
  onSendTip: (amount: string, message: string) => void;
  recipient: string;
};

const TipModal: React.FC<TipModalProps> = ({ open, onClose, onSendTip, recipient }) => {
  const [amount, setAmount] = useState("");
  const [message, setMessage] = useState("");

  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-80 shadow-lg flex flex-col">
        <h3 className="text-lg font-semibold mb-2">Send Tip to {recipient.slice(0, 6)}...{recipient.slice(-4)}</h3>
        <input
          className="border rounded px-2 py-1 mb-2"
          type="number"
          min="0.01"
          step="0.01"
          placeholder="Amount (USDC)"
          value={amount}
          onChange={e => setAmount(e.target.value)}
        />
        <input
          className="border rounded px-2 py-1 mb-2"
          type="text"
          maxLength={100}
          placeholder="Message (optional)"
          value={message}
          onChange={e => setMessage(e.target.value)}
        />
        <div className="flex gap-2 mt-2">
          <button className="bg-blue-600 text-white px-4 py-1 rounded" onClick={() => onSendTip(amount, message)}>
            Send Tip
          </button>
          <button className="bg-gray-300 px-4 py-1 rounded" onClick={onClose}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default TipModal; 