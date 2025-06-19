# StableSwipe

**Web3 Dating App on Sui Blockchain**

---

## Overview
StableSwipe is a next-generation decentralized dating app built on the Sui blockchain. It leverages zkLogin for seamless, privacy-preserving authentication, USDC for in-app payments, and a modular Move smart contract backend for innovative features like pay-to-chat, microtips, boosts, and NFT badges.

**Tech Stack:**
- Frontend: React + Vite + TailwindCSS + TypeScript
- Blockchain: Sui Move smart contracts (modular)
- Auth: zkLogin (Google OAuth)
- Payments: USDC on Sui

---

## Monorepo Structure

```
Stable_Swipe/
├── frontend/           # React app (Vite, Tailwind, TypeScript)
│   ├── src/
│   │   ├── components/ # UI components (WalletBar, SwipeCard, etc.)
│   │   ├── pages/      # Main app pages (Landing, Swipe, Match, etc.)
│   │   └── ...
│   └── ...
├── move/               # Sui Move smart contracts
│   └── StableSwipe/
│       ├── Move.toml
│       └── sources/
│           ├── profile/
│           ├── swipe_match/
│           ├── chat_gate/
│           ├── tip_payment/
│           ├── boost/
│           ├── nft_badge/
│           └── admin/
└── README.md           # This file
```

---

## Features
- **zkLogin Onboarding:** Passwordless, privacy-preserving login via Google OAuth
- **On-chain Profiles:** Create and update user profiles on Sui
- **Swipe & Match:** Like/dislike logic, mutual match detection
- **Pay-to-Chat:** Unlock chat with USDC microtransactions
- **Tips & Boosts:** Send USDC tips, pay to boost profile visibility
- **NFT Badges:** Mint profile badges for achievements
- **Admin Controls:** Configurable fees, treasury management

---

## Getting Started

### 1. Frontend (React)
```bash
cd frontend
npm install
npm run dev
```

### 2. Move Contracts (Sui)
```bash
cd move/StableSwipe
sui move build
sui move test
# Deploy to Sui Devnet/Testnet as needed
```

---

## Usage
- Visit the app in your browser (localhost:5173 by default)
- Sign in with Google (zkLogin)
- Create your profile, swipe, match, chat, tip, and boost!
- All actions are powered by Sui Move contracts and USDC payments

---

## Contributing
Pull requests and issues are welcome! See the code for modularity and extension points.

---

## License
MIT 