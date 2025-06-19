import { getFullnodeUrl, SuiClient } from '@mysten/sui';

export const suiClient = new SuiClient({ url: getFullnodeUrl('devnet') }); // Use 'testnet' or 'mainnet' as needed

// Example: Call Move contract (create_profile)
export async function createProfile({
  signer, // Ephemeral keypair or wallet
  packageId, // Move package address
  username,
  age,
  gender,
  bio,
  imageUri
}: {
  signer: any,
  packageId: string,
  username: string,
  age: number,
  gender: number,
  bio: string,
  imageUri: string
}) {
  // You may need to construct a TransactionBlock for more complex calls
  return suiClient.call('sui_moveCall', [
    signer.getAddress(),
    packageId,
    'profile',
    'create_profile',
    [],
    [username, age, gender, bio, imageUri],
    { gasBudget: 10000000 }
  ]);
} 