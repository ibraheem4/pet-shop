// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/access/Ownable.sol";

contract Adoption is Ownable {
    address[16] public animalAdopters;

    function adoptAnimal(uint256 animalId) public returns (uint256) {
        require(animalId >= 0 && animalId <= 15);

        animalAdopters[animalId] = msg.sender;

        return animalId;
    }

    function getAnimalAdopters() public view returns (address[16] memory) {
        return animalAdopters;
    }

    // TODO: Test this function
    function claimAnimal(uint256 animalId) public onlyOwner returns (uint256) {
        require(animalId >= 0 && animalId <= 15);

        animalAdopters[animalId] = this.owner();

        return animalId;
    }

    function returnAnimal(uint256 animalId) public returns (uint256) {
        require(animalId >= 0 && animalId <= 15);

        // If the animal has been adopted by msg.sender, the animal can be returned
        if (animalAdopters[animalId] == msg.sender) {
            // "Return" an animal by setting the address of it's adopter back to 0
            animalAdopters[animalId] = address(0);
        }

        return animalId;
    }
}
