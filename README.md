# dVote – Decentralised Voting Application

A blockchain-based voting application built using Solidity, Hardhat and JavaScript. dVote allows users to create proposals, cast votes and view voting results through a simple web interface.

## Features

- **Create Proposals:** Create proposals with a title, description and voting duration.
- **Cast Votes:** Users can vote on active proposals.
- **Duplicate Vote Prevention:** Each wallet address can vote only once per proposal.
- **Voting Deadlines:** Proposals automatically stop accepting votes after their deadline.
- **Live Vote Counts:** View proposal details and updated voting results.
- **Blockchain Integration:** Voting operations are handled by a Solidity smart contract.

## Tech Stack

| Technology | Purpose |
|---|---|
| Solidity | Smart contract development |
| Hardhat 3 | Local blockchain and contract deployment |
| JavaScript | Frontend logic and blockchain interaction |
| HTML & CSS | User interface |
| Ethers.js | Communication between frontend and smart contract |
| Node.js & npm | Development environment |

## Project Structure

```text
dVote/
│
├── index.html
├── style.css
├── script.js
│
└── dvote-blockchain/
    ├── contracts/
    │   └── DVote.sol
    ├── scripts/
    │   └── deploy.ts
    ├── test/
    ├── hardhat.config.ts
    ├── package.json
    └── package-lock.json
```

## Getting Started

### Prerequisites

- Node.js and npm
- Visual Studio Code (recommended)
- Live Server extension for VS Code

### 1. Clone the repository

```bash
git clone https://github.com/dev-112/dVote.git
cd dVote
```

### 2. Install dependencies

```bash
cd dvote-blockchain
npm install
```

### 3. Start the local blockchain

```bash
npx hardhat node
```

Keep this terminal running.

### 4. Deploy the smart contract

Open another terminal inside `dvote-blockchain` and execute:

```bash
npx hardhat run scripts/deploy.ts --network localhost
```

Copy the deployed contract address displayed in the terminal.

### 5. Configure the frontend

Open `script.js` and replace the contract address:

```javascript
const CONTRACT_ADDRESS = "YOUR_DEPLOYED_CONTRACT_ADDRESS";
```

### 6. Run the application

Open the root `index.html` file using VS Code Live Server.

The application should now be able to interact with your locally deployed smart contract.

## How It Works

1. A user connects to the local blockchain through the frontend.
2. The user creates a proposal by providing its title, description and voting duration.
3. The smart contract stores the proposal and assigns it a unique ID.
4. Other users can cast votes on active proposals.
5. The contract checks whether the proposal exists, whether its deadline has passed and whether the wallet has already voted.
6. Successful votes update the proposal's vote count on the blockchain.
7. The frontend retrieves and displays the updated proposal information.

## Limitations

- The current implementation uses a local Hardhat blockchain for development and demonstration.
- Blockchain state is reset when the local Hardhat node is restarted.
- The application prevents duplicate votes by wallet address, not by individual identity. A person using multiple wallets could vote multiple times.
- The application has not been deployed to a public blockchain network.

## Future Scope

- Integration with MetaMask and public test networks.
- Improved frontend design and user experience.
- Individual proposal views and voting status indicators.
- Event-based updates for real-time voting information.
- Additional security mechanisms and identity verification.

---

**Developed as a learning project to explore Solidity, smart contracts, blockchain development and frontend integration.**
