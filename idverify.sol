pragma solidity ^0.8.0;

contract IdentityVerification {
    struct Identity {
        string name;
        string email;
        address verifier;
        bool verified;
    }

    mapping(address => Identity) public identities;

    event IdentityVerified(address indexed owner, string name, uint256 age, address verifier);

    modifier onlyOwner {
        require(identities[msg.sender].verified, "Identity not verified");
        _;
    }

    function verifyIdentity(address _owner, string memory _name, uint256 _age) public {
        require(msg.sender != _owner, "Cannot verify your own identity");
        require(!identities[_owner].verified, "Identity already verified");

        identities[_owner] = Identity(_name, _age, msg.sender, true);
        emit IdentityVerified(_owner, _name, _age, msg.sender);
    }

    function getIdentity() public view onlyOwner returns (string memory, uint256) {
        Identity memory identity = identities[msg.sender];
        return (identity.name, identity.age);
    }
}
