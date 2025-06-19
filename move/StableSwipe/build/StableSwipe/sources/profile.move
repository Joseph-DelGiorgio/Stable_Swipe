module stableswipe::profile {
    use sui::object::{Self, UID};
    use sui::tx_context::{Self, TxContext};
    use sui::transfer;

    /// User profile object, uniquely owned by address (zkLogin compatible)
    struct UserProfile has key {
        id: UID,
        owner: address,
        username: vector<u8>,
        age: u8,
        gender: u8,
        bio: vector<u8>,
        image_uri: vector<u8>,
    }

    /// Create a new user profile (one per address)
    /// zkLogin compatible: sender can be ephemeral/zkLogin address
    public entry fun create_profile(
        username: vector<u8>, age: u8, gender: u8, bio: vector<u8>, image_uri: vector<u8>,
        ctx: &mut TxContext
    ) {
        let profile = UserProfile {
            id: sui::object::new(ctx),
            owner: sui::tx_context::sender(ctx),
            username,
            age,
            gender,
            bio,
            image_uri,
        };
        sui::transfer::transfer(profile, sui::tx_context::sender(ctx));
    }
}
