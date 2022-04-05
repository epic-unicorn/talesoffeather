const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Minting with sale active", function () {
  it("Mints a token", async function () {
    // deploy a contract to the local Hardhat Network
    const FeatherTest = await ethers.getContractFactory("FeatherTest");
    const featherTest = await FeatherTest.deploy();

    await featherTest.toggleSaleState();

    await featherTest.mintFeather(1, {
      value: ethers.utils.parseEther("0.001"),
    });
    
    // get the numer of tokens minted to this newly deployed contract
    const supply = await featherTest.totalSupply();

    // ensure that the supply is exactly 1
    await expect(supply).to.equal(1);
  });
});

/* describe("Utilities", function () {
  it("Sets a base URI", async function () {
    // deploy a contract to the local Hardhat Network
    const FeatherTest = await ethers.getContractFactory("FeatherTest");
    const featherTest = await FeatherTest.deploy();
    await featherTest.deployed();

    // make a fake URI
    const URI = "ipfs://testCID/";

    // set the base URI
    await featherTest.setBaseURI(URI);

    // mint a token
    const mintPrice = await featherTest.mintPrice();
    await featherTest.mint(1, { value: mintPrice });

    // get the newly minted token's tokenURI
    const tokenURI = await featherTest.tokenURI(0);

    // check the value
    await expect(tokenURI).to.equal(URI + "0");
  });
}); */
