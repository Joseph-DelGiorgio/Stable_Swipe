module stableswipe::nft_badge {
    use sui::tx_context::{Self, TxContext};
    use sui::event;
    use sui::object::{Self, UID};
    use sui::string::String;
    // TODO: Import NFT minting module

    /// Event emitted on badge mint
    struct BadgeMinted has copy, drop {
        token_id: UID,
        user: address,
    }

    /// Mint a verified badge NFT (stub)
    public entry fun mint_verified_badge(ctx: &mut TxContext) {
        // TODO: Call NFT minting logic
        let token_id = object::new(ctx);
        event::emit(BadgeMinted { token_id, user: tx_context::sender(ctx) });
    }
}
