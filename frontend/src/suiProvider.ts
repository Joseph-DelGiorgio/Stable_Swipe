import { getFullnodeUrl, SuiClient } from '@mysten/sui';

// Use Sui testnet for all contract calls
export const suiClient = new SuiClient({ url: getFullnodeUrl('testnet') });

// Default Move package ID for StableSwipe on testnet
export const STABLESWIPE_PACKAGE_ID = '0x53b23307df35fedec2294ccc80c171abfaee71978f22f8da559c2ab054bdf4a4';

// Example: Call Move contract (create_profile)
export async function createProfile({
  signer, // Ephemeral keypair or wallet
  packageId = STABLESWIPE_PACKAGE_ID, // Move package address
  username,
  age,
  gender,
  bio,
  imageUri
}: {
  signer: any,
  packageId?: string,
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