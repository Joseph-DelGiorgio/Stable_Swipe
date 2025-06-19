module stableswipe::admin {
    use sui::object::{Self, UID};
    use sui::tx_context::{Self, TxContext};

    /// Global config object for admin/treasury
    struct Config has key {
        id: UID,
        min_tip: u64,
        unlock_price: u64,
        boost_price: u64,
        treasury: address,
    }

    /// Update config prices (admin only)
    public entry fun update_prices(
        config_id: UID, min_tip: u64, unlock_price: u64, boost_price: u64, ctx: &mut TxContext
    ) {
        let c = borrow_global_mut<Config>(tx_context::sender(ctx), config_id);
        // TODO: Add admin check
        c.min_tip = min_tip;
        c.unlock_price = unlock_price;
        c.boost_price = boost_price;
    }
}
