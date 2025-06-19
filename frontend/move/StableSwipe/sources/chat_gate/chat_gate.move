module stableswipe::chat_gate {
    use sui::tx_context::{Self, TxContext};
    use sui::coin::{Self, Coin};
    use sui::event;
    use stableswipe::swipe_match::{Self, Match};
    use USDC;

    /// Event emitted when chat is unlocked
    struct ChatUnlocked has copy, drop {
        match_id: UID,
        by: address,
    }

    /// Unlock chat for a match by paying USDC
    public entry fun unlock_chat(
        match_id: UID, payment: Coin<USDC>, ctx: &mut TxContext
    ) {
        // TODO: Replace with config value
        assert!(coin::value(&payment) >= 500_000, 0); // 0.5 USDC (6 decimals)
        let m = borrow_global_mut<Match>(tx_context::sender(ctx), match_id);
        assert!(!m.is_chat_unlocked, 1);
        // TODO: Transfer payment to treasury
        m.is_chat_unlocked = true;
        event::emit(ChatUnlocked { match_id, by: tx_context::sender(ctx) });
    }
}
