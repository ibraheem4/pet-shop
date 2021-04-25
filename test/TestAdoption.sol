// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.8.0;

import "truffle/Assert.sol";
import "truffle/DeployedAddresses.sol";
import "../contracts/Adoption.sol";

contract TestAdoption {
  // The address of the adoption contract to be tested
  Adoption adoption = Adoption(DeployedAddresses.Adoption());

  // The id of the animal that will be used for testing
  uint expectedAnimalId = 8;

  //The expected owner of adopted animal is this contract
  address expectedAdopter = address(this);

  // Testing the adopt() function
  function testUserCanAdoptAnimal() public {
    uint returnedId = adoption.adopt(expectedAnimalId);

    Assert.equal(returnedId, expectedAnimalId, "Adoption of the expected animal should match what is returned.");
  }

  // Testing retrieval of a single animal's owner
  function testGetAdopterAddressByAnimalId() public {
   address adopter = adoption.adopters(expectedAnimalId);

   Assert.equal(adopter, expectedAdopter, "Owner of the expected animal should be this contract");
  }

  // Testing retrieval of all animal owners
  function testGetAdopterAddressByAnimalIdInArray() public {
   // Store adopters in memory rather than contract's storage
   address[16] memory adopters = adoption.getAdopters();

   Assert.equal(adopters[expectedAnimalId], expectedAdopter, "Owner of the expected animal should be this contract");
  }
}