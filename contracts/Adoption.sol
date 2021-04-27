// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.8.0;

contract Adoption {
  address[16] public adopters;

  function adoptAnimal(uint animalId) public returns (uint) {
    require(animalId >= 0 && animalId <= 15);

    adopters[animalId] = msg.sender;

    return animalId;
  }

  function getAdopters() public view returns (address[16] memory) {
    return adopters;
  }

	function returnAnimal(uint animalId) public returns (uint) {
 	  require(animalId >= 0 && animalId <= 15);

 	  if (adopters[animalId] == msg.sender) {
 	  	adopters[animalId] = address(0);
 	  }

 	  return animalId;
 	}
}

