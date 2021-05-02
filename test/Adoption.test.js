// https://docs.openzeppelin.com/learn/writing-automated-tests

// Load dependencies
const { accounts, contract } = require("@openzeppelin/test-environment");
const { expect } = require("chai");
const { expectRevert } = require("@openzeppelin/test-helpers");

const expectedAnimalId = 8;
const nonOwnerErrorString = "Ownable: caller is not the owner -- Reason given: Ownable: caller is not the owner.";

// Load compiled artifacts
const Adoption = contract.fromArtifact("Adoption");

describe("Adoption", function () {
  const [owner, other] = accounts;

  beforeEach(async function () {
    this.adoption = await Adoption.new({ from: owner });
  });

  it("deployer is the owner", async function () {
    expect(await this.adoption.owner()).to.equal(owner);
  });

  it("owner may set a nickname", async function () {
    await this.adoption.setNickname("Roscoe", { from: owner });

    expect(await this.adoption.getNickname()).to.equal("Roscoe");
  });

  it("owner may claim an animal", async function () {
    await this.adoption.claimAnimal(expectedAnimalId, { from: owner });
    const animalAdopters = await this.adoption.getAnimalAdopters();

    expect(animalAdopters[expectedAnimalId]).to.equal(owner);
  });

  it("non-owner may not claim an animal", async function () {
    await expectRevert(this.adoption.claimAnimal(expectedAnimalId, { from: other }), nonOwnerErrorString);
  });

  it("non-owner may not set a nickname", async function () {
    await expectRevert(this.adoption.setNickname({ from: other }), nonOwnerErrorString);
  });
});
