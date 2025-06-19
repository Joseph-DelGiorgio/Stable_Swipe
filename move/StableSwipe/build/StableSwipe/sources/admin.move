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
        config: &mut Config, min_tip: u64, unlock_price: u64, boost_price: u64
    ) {
        config.min_tip = min_tip;
        config.unlock_price = unlock_price;
        config.boost_price = boost_price;
    }
}
