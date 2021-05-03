// https://docs.openzeppelin.com/learn/writing-automated-tests

// Load dependencies
const { accounts, contract } = require("@openzeppelin/test-environment");
const { expect } = require("chai");
const { expectRevert } = require("@openzeppelin/test-helpers");

// Load compiled artifacts
const Adoption = contract.fromArtifact("Adoption");

// Setup test constants
const expectedAnimalId = 8;
const nonOwnerErrorString = "Ownable: caller is not the owner -- Reason given: Ownable: caller is not the owner.";

// Test functions
// https://ethereum.stackexchange.com/a/39172
function assertEventOfType(response, eventName, index) {
  assert.equal(response.logs[index].event, eventName, eventName + " event should fire.");
}

describe("Adoption", function () {
  const [owner, other] = accounts;

  beforeEach(async function () {
    this.adoption = await Adoption.new({ from: owner });
  });

  it("deployer is the owner", async function () {
    expect(await this.adoption.owner()).to.equal(owner);
  });

  it("owner may set a nickname", async function () {
    const nicknamedAnimal = await this.adoption.setNickname("Roscoe", { from: owner });
    assertEventOfType(nicknamedAnimal, "NicknamedAnimal", 0);

    expect(await this.adoption.getNickname()).to.equal("Roscoe");
  });

  it("owner may claim an animal", async function () {
    const claimedAnimal = await this.adoption.claimAnimal(expectedAnimalId, { from: owner });
    assertEventOfType(claimedAnimal, "ClaimedAnimal", 0);

    const animalAdopters = await this.adoption.getAnimalAdopters();

    expect(animalAdopters[expectedAnimalId]).to.equal(owner);
  });

  it("non-owner may not claim an animal", async function () {
    await expectRevert(this.adoption.claimAnimal(expectedAnimalId, { from: other }), nonOwnerErrorString);
  });

  it("owner may release an animal", async function () {
    const releaseAnimal = await this.adoption.releaseAnimal(expectedAnimalId, { from: owner });
    assertEventOfType(releaseAnimal, "ReleasedAnimal", 0);
    const animalAdopters = await this.adoption.getAnimalAdopters();

    expect(animalAdopters[expectedAnimalId]).to.equal("0x0000000000000000000000000000000000000000");
  });

  it("non-owner may not release an animal", async function () {
    await expectRevert(this.adoption.releaseAnimal(expectedAnimalId, { from: other }), nonOwnerErrorString);
  });

  it("non-owner may not set a nickname", async function () {
    await expectRevert(this.adoption.setNickname({ from: other }), nonOwnerErrorString);
  });
});
