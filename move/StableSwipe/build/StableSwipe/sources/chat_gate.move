module stableswipe::chat_gate {
    use sui::tx_context::{Self, TxContext};
    use sui::coin::{Self, Coin};
    use sui::transfer;

    /// For Devnet/Testnet/Mainnet, use Coin<0x2::usdc::USDC>
    public entry fun unlock_chat<T>(
        match_id: vector<u8>, payment: Coin<T>, ctx: &mut TxContext
    ) {
        // TODO: Implement chat unlock logic
        transfer::public_transfer(payment, sui::tx_context::sender(ctx)); // Replace with recipient or treasury
    }
}
