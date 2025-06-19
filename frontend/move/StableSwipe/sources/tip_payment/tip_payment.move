module stableswipe::tip_payment {
    use sui::tx_context::{Self, TxContext};
    use sui::coin::{Self, Coin};
    use sui::event;
    use sui::string::String;
    use USDC;

    /// Event emitted on tip
    struct TipSent has copy, drop {
        from: address,
        to: address,
        msg: String,
    }

    /// Send a USDC tip with optional message
    public entry fun send_tip(
        recipient: address,
        message: String,
        payment: Coin<USDC>,
        ctx: &mut TxContext
    ) {
        assert!(coin::value(&payment) >= 10_000, 0); // 0.01 USDC (6 decimals)
        // TODO: Transfer payment to recipient
        event::emit(TipSent { from: tx_context::sender(ctx), to: recipient, msg: message });
    }
}
