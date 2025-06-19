module stableswipe::boost {
    use sui::object::{Self, UID};
    use sui::tx_context::{Self, TxContext};
    use sui::coin::{Self, Coin};
    use sui::clock;
    use sui::event;
    use USDC;

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

    /// Activate a boost for 1 hour by paying USDC
    public entry fun activate_boost(
        payment: Coin<USDC>, ctx: &mut TxContext
    ) {
        assert!(coin::value(&payment) >= 1_000_000, 0); // 1.0 USDC (6 decimals)
        let boost_time = 3600; // 1 hour
        let now = clock::now_seconds();
        move_to(
            &tx_context::sender(ctx),
            BoostStatus {
                id: object::new(ctx),
                user: tx_context::sender(ctx),
                expires_at: now + boost_time,
            }
        );
        // TODO: Transfer payment to treasury
        event::emit(BoostActivated { user: tx_context::sender(ctx), until: now + boost_time });
    }
}
