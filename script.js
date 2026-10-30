
// Contract configuration
const CONTRACT_ADDRESS = "0x5FbDB2315678afecb367f032d93F642f64180aa3";

// ABI: available functions
const ABI = [
    "function createProposal(string,string,uint256)",
    "function vote(uint256)",
    "function getAllProposals() view returns (tuple(uint256 proposalId,string title,string description,uint256 deadline,uint256 voteCount,address creator)[])",
    "function hasVoted(uint256,address) view returns (bool)"
];

let provider;
let signer;
let contract;

// Connect MetaMask wallet

async function connectWallet() {
    try {
        provider = new ethers.JsonRpcProvider("http://127.0.0.1:8545");

        const accounts = await provider.listAccounts();

        signer = await provider.getSigner(0);

        const address = await signer.getAddress();

        document.getElementById("walletAddress").innerText =
            "Connected: " + address;

        contract = new ethers.Contract(
            CONTRACT_ADDRESS,
            ABI,
            signer
        );

        alert("Local wallet connected!");

        loadProposals();

    } catch (error) {
        console.error(error);
        alert("Connection failed. Is your Hardhat node running?");
    }
}


// Create a proposal
async function createProposal(event) {
    event.preventDefault();

    if (!contract) {
        alert("Connect your wallet first!");
        return;
    }

    const title = document.getElementById("title").value;
    const description = document.getElementById("description").value;

    const durationMinutes = Number(
        document.getElementById("duration").value
    );

    const durationSeconds = durationMinutes * 60;

    try {
        const transaction = await contract.createProposal(
            title,
            description,
            durationSeconds
        );

        await transaction.wait();

        alert("Proposal created successfully!");

        document.getElementById("proposalForm").reset();

        loadProposals();

    } catch (error) {
        console.error(error);
        alert("Could not create proposal.");
    }
}

// Retrieve and display proposals
async function loadProposals() {
    if (!contract) return;

    try {
        const proposals = await contract.getAllProposals();

        const container = document.getElementById("proposalsList");

        container.innerHTML = "";

        proposals.forEach((proposal) => {
            const card = document.createElement("div");

            card.className = "proposal-card";

            const heading = document.createElement("h3");
            heading.textContent = proposal.title;

            const description = document.createElement("p");
            description.textContent = proposal.description;

            const votes = document.createElement("p");
            votes.textContent = "Votes: " + proposal.voteCount;

            const deadline = document.createElement("p");
            deadline.textContent =
                "Deadline: " +
                new Date(Number(proposal.deadline) * 1000).toLocaleString();

            const voteButton = document.createElement("button");
            voteButton.textContent = "Vote";

            voteButton.addEventListener("click", () => {
                castVote(Number(proposal.proposalId));
            });

            card.append(heading, description, votes, deadline, voteButton);

            container.appendChild(card);
        });

    } catch (error) {
        console.error(error);
        alert("Could not load proposals.");
    }
}

// Cast a vote
async function castVote(proposalId) {
    if (!contract) return;

    try {
        const transaction = await contract.vote(proposalId);

        await transaction.wait();

        alert("Vote submitted successfully!");

        loadProposals();

    } catch (error) {
        console.error(error);
        alert("Voting failed. You may have already voted or the deadline may have passed.");
    }
}

// Connect button
document.getElementById("connectWallet")
    .addEventListener("click", connectWallet);

// Proposal form
document.getElementById("proposalForm")
    .addEventListener("submit", createProposal);
