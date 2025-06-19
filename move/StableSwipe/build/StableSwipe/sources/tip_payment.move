module stableswipe::tip_payment {
    use sui::tx_context::{Self, TxContext};
    use sui::coin::{Self, Coin};
    use sui::transfer;

    /// Event emitted on tip
    struct TipSent has copy, drop {
        from: address,
        to: address,
        msg: vector<u8>,
    }

    /// For Devnet/Testnet/Mainnet, use Coin<0x2::usdc::USDC>
    public entry fun send_tip<T>(
        recipient: address,
        message: vector<u8>,
        payment: Coin<T>,
        ctx: &mut TxContext
    ) {
        transfer::public_transfer(payment, recipient);
        // Optionally emit an event here
    }
}
