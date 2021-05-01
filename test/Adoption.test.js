const { accounts, contract } = require("@openzeppelin/test-environment");

const { expect } = require("chai");

const Adoption = contract.fromArtifact("Adoption");

describe("Adoption", function () {
  const [owner] = accounts;

  it("the deployer is the owner", async function () {
    const AdoptionContract = await Adoption.new({ from: owner });
    expect(await AdoptionContract.owner()).to.equal(owner);
  });
});
