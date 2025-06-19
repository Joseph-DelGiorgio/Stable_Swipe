module stableswipe::profile {
    use sui::object::{Self, UID};
    use sui::tx_context::{Self, TxContext};
    use sui::clock;
    use sui::string::String;

    /// User profile object, uniquely owned by address (zkLogin compatible)
    struct UserProfile has key {
        id: UID,
        owner: address,
        username: String,
        age: u8,
        gender: u8,
        bio: String,
        image_uri: String,
        joined_at: u64,
    }

    /// Create a new user profile (one per address)
    /// zkLogin compatible: sender can be ephemeral/zkLogin address
    public entry fun create_profile(
        username: String, age: u8, gender: u8, bio: String, image_uri: String,
        ctx: &mut TxContext
    ) {
        let id = object::new(ctx);
        let profile = UserProfile {
            id,
            owner: tx_context::sender(ctx),
            username,
            age,
            gender,
            bio,
            image_uri,
            joined_at: clock::now_seconds(),
        };
        move_to(&tx_context::sender(ctx), profile);
    }

    /// Get a reference to a user profile by address
    public fun get_profile(owner: address): &UserProfile acquires UserProfile {
        borrow_global<UserProfile>(owner)
    }
}
