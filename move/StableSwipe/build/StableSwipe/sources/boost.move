module stableswipe::boost {
    use sui::object::{Self, UID};
    use sui::tx_context::{Self, TxContext};
    use sui::coin::{Self, Coin};
    use sui::transfer;
    use sui::clock;
    use sui::event;

    /// Boost status object
    struct BoostStatus has key {
        id: UID,
        user: address,
        expires_at: u64,
    }

    /// Event emitted on boost activation
    struct BoostActivated has copy, drop {
        user: address,
        until: u64,
    }

    /// For Devnet/Testnet/Mainnet, use Coin<0x2::usdc::USDC>
    public entry fun activate_boost<T>(
        payment: Coin<T>, ctx: &mut TxContext
    ) {
        let now = 0u64; // Placeholder, set from frontend or use epoch if needed
        let boost_time = 3600;
        let status = BoostStatus {
            id: sui::object::new(ctx),
            user: sui::tx_context::sender(ctx),
            expires_at: now + boost_time,
        };
        sui::transfer::transfer(status, sui::tx_context::sender(ctx));
        transfer::public_transfer(payment, sui::tx_context::sender(ctx)); // Replace with treasury address
        event::emit(BoostActivated { user: sui::tx_context::sender(ctx), until: now + boost_time });
    }
}
