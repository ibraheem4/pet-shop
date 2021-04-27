// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/access/Ownable.sol";
import "truffle/Assert.sol";
import "truffle/DeployedAddresses.sol";
import "../contracts/Adoption.sol";

contract TestAdoption is Ownable {
  // The address of the adoption contract to be tested
  Adoption adoption = Adoption(DeployedAddresses.Adoption());

  // The id of the animal that will be used for testing
  uint expectedAnimalId = 8;

  //The expected owner of adopted animal is this contract
  address expectedAnimalAdopter = address(this);

  // Testing the adoptAnimal() function
  function testUserCanAdoptAnimal() public {
    uint adoptedAnimalId = adoption.adoptAnimal(expectedAnimalId);

    Assert.equal(adoptedAnimalId, expectedAnimalId, "Adoption of the expected animal should match what is returned.");
  }

  // Testing retrieval of a single animal's owner
  function testGetAdopterAddressByAnimalId() public {
   address animalAdopter = adoption.animalAdopters(expectedAnimalId);

   Assert.equal(animalAdopter, expectedAnimalAdopter, "Owner of the expected animal should be this contract");
  }

  // Testing retrieval of all animal owners
  function testGetAdopterAddressByAnimalIdInArray() public {
   // Store adopters in memory rather than contract's storage
   address[16] memory animalAdopters = adoption.getAnimalAdopters();

   Assert.equal(animalAdopters[expectedAnimalId], expectedAnimalAdopter, "Owner of the expected animal should be this contract");
  }

  // Testing the returnAnimal() function
  function testUserCanReturnAnimal() public {
    uint returnedAnimalId = adoption.returnAnimal(expectedAnimalId);

    Assert.equal(returnedAnimalId, expectedAnimalId, "Returning the expected animal should match what is returned.");
  }
}