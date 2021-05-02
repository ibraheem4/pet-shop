// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/access/Ownable.sol";

contract Adoption is Ownable {
    address[16] public animalAdopters;
    string private nickname;

    event AdoptedAnimal(uint256 animalId);

    function adoptAnimal(uint256 animalId) public returns (uint256) {
        require(animalId >= 0 && animalId <= 15);

        animalAdopters[animalId] = msg.sender;

        emit AdoptedAnimal(animalId);

        return animalId;
    }

    function getAnimalAdopters() public view returns (address[16] memory) {
        return animalAdopters;
    }

    event ClaimedAnimal(uint256 animalId);

    function claimAnimal(uint256 animalId) public onlyOwner returns (uint256) {
        require(animalId >= 0 && animalId <= 15);

        animalAdopters[animalId] = this.owner();

        emit ClaimedAnimal(animalId);

        return animalId;
    }

    event ReturnedAnimal(uint256 animalId);

    function returnAnimal(uint256 animalId) public returns (uint256) {
        require(animalId >= 0 && animalId <= 15);

        // If the animal has been adopted by msg.sender, the animal can be returned
        if (animalAdopters[animalId] == msg.sender) {
            // "Return" an animal by setting the address of it's adopter back to 0
            animalAdopters[animalId] = address(0);
        }

        emit ReturnedAnimal(animalId);

        return animalId;
    }

    event NicknamedAnimal(string newNickname);

    // The onlyOwner modifier restricts who can call the setNickname function
    function setNickname(string memory newNickname) public onlyOwner {
        nickname = newNickname;
        emit NicknamedAnimal(newNickname);
    }

    function getNickname() public view returns (string memory) {
        return nickname;
    }
}
