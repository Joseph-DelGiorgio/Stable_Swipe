import React, { useState, type FormEvent } from "react";

type TipModalProps = {
  open: boolean;
  onClose: () => void;
  onSend: (amount: number) => Promise<boolean>;
  recipient: { id: string; name: string } | null;
};

const TipModal: React.FC<TipModalProps> = ({ open, onClose, onSend, recipient }) => {
  const [amount, setAmount] = useState(1);
  const [sending, setSending] = useState(false);
  const [success, setSuccess] = useState<null | boolean>(null);
  const [error, setError] = useState<string | null>(null);

  if (!open || !recipient) return null;

  const handleSend = async (e: FormEvent) => {
    e.preventDefault();
    setSending(true);
    setError(null);
    setSuccess(null);
    try {
      // Mock send
      const ok = await onSend(amount);
      setSuccess(ok);
      if (ok) setTimeout(onClose, 1200);
    } catch (err) {
      setError("Failed to send tip. Try again.");
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="bg-white rounded-xl shadow-xl p-6 w-full max-w-xs relative animate-fade-in">
        <button
          className="absolute top-2 right-2 text-gray-400 hover:text-gray-700 text-xl"
          onClick={onClose}
          disabled={sending}
        >
          ×
        </button>
        <h3 className="text-lg font-semibold mb-2 text-center">Tip {recipient.name}</h3>
        <form onSubmit={handleSend} className="flex flex-col gap-4">
          <input
            type="number"
            min={1}
            max={100}
            step={1}
            value={amount}
            onChange={(e) => setAmount(Number(e.target.value))}
            className="w-full px-4 py-2 rounded-lg border text-center text-lg focus:outline-none focus:ring-2 focus:ring-blue-300"
            disabled={sending}
          />
          <div className="flex gap-2">
            <button
              type="button"
              className="flex-1 bg-gray-200 text-gray-700 rounded-lg py-2 font-semibold hover:bg-gray-300"
              onClick={onClose}
              disabled={sending}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 bg-blue-500 text-white rounded-lg py-2 font-semibold hover:bg-blue-600 disabled:opacity-50"
              disabled={sending || amount < 1}
            >
              {sending ? "Sending..." : `Send ${amount} USDC`}
            </button>
          </div>
          {success && <div className="text-green-600 text-center">Tip sent!</div>}
          {success === false && <div className="text-red-500 text-center">Failed to send tip.</div>}
          {error && <div className="text-red-500 text-center">{error}</div>}
        </form>
      </div>
    </div>
  );
};

export default TipModal;
