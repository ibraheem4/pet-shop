// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.8.0;

contract Adoption {
  address[16] public adopters;

  function adopt(uint animalId) public returns (uint) {
    require(animalId >= 0 && animalId <= 15);

    adopters[animalId] = msg.sender;

    return animalId;
  }

  function getAdopters() public view returns (address[16] memory) {
    return adopters;
  }
}

