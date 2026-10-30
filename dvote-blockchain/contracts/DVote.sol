
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.34;

contract DVote {

    struct Proposal {
        uint proposalId;
        string title;
        string description;
        uint deadline;
        uint voteCount;
        address creator;
    }

    Proposal[] private proposals;

    uint public nextProposalId = 1;

    mapping(uint => mapping(address => bool)) public hasVoted;

    event ProposalCreated(
        uint proposalId,
        string title,
        address creator,
        uint deadline
    );

    event VoteCast(
        uint proposalId,
        address voter
    );

    function createProposal(
        string memory _title,
        string memory _description,
        uint _durationInSeconds
    ) external {

        require(bytes(_title).length > 0, "Title required");
        require(_durationInSeconds > 0, "Invalid duration");

        uint deadline = block.timestamp + _durationInSeconds;

        proposals.push(Proposal({
            proposalId: nextProposalId,
            title: _title,
            description: _description,
            deadline: deadline,
            voteCount: 0,
            creator: msg.sender
        }));

        emit ProposalCreated(
            nextProposalId,
            _title,
            msg.sender,
            deadline
        );

        nextProposalId++;
    }

    function vote(uint _proposalId) external {

        require(
            _proposalId > 0 && _proposalId <= proposals.length,
            "Proposal does not exist"
        );

        Proposal storage proposal = proposals[_proposalId - 1];

        require(
            block.timestamp <= proposal.deadline,
            "Voting period has ended"
        );

        require(
            !hasVoted[_proposalId][msg.sender],
            "Already voted"
        );

        proposal.voteCount++;

        hasVoted[_proposalId][msg.sender] = true;

        emit VoteCast(_proposalId, msg.sender);
    }

    function getAllProposals()
        external
        view
        returns (Proposal[] memory)
    {
        return proposals;
    }

}
