const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Token contract", function () {

  let Token;
  let hardhatToken;
  let owner;
  let addr1;
  let addr2;
  let addrs;

  // `beforeEach` will run before each test, re-deploying the contract every
  // time. It receives a callback, which can be async.
  before(async function () {
    // Get the ContractFactory and Signers here.
    Token = await ethers.getContractFactory("FeatherTest");
    [owner, addr1, addr2, ...addrs] = await ethers.getSigners(); 

    // To deploy our contract, we just have to call Token.deploy() and await
    // for it to be deployed(), which happens once its transaction has been
    // mined.
    hardhatToken = await Token.deploy();

    await hardhatToken.deployed();
    await hardhatToken.setBaseURI('ipfs://XXXXXXXXXXX/');
    console.log("FeatherTest deployed to:", hardhatToken.address);
  });

  // You can nest describe calls to create subsections.
  describe("Deployment", function () {
    // `it` is another Mocha function. This is the one you use to define your
    // tests. It receives the test name, and a callback function.

    // If the callback function is async, Mocha will `await` it.
    it("Should set the right owner", async function () {
      // Expect receives a value, and wraps it in an Assertion object. These
      // objects have a lot of utility methods to assert values.

      // This test expects the owner variable stored in the contract to be equal
      // to our Signer's owner.
      console.log("FeatherTest owner:", owner.address)
      expect(await hardhatToken.owner()).to.equal(owner.address);

    });
  });

  describe("Transactions", function () {
    it("Should fail presale feather when presale is not active", async function () {
      // Presale 1 feather should return 'Presale is not active'
      await expect(hardhatToken.presaleFeather(1, {value: ethers.utils.parseEther('0.001')}))
        .to.be.revertedWith('Presale is not active');
    });

    it("Should fail mint feather when sale is not active", async function () {
      // Mint 1 feather should return 'Sale must be active to mint Token'
      await expect(hardhatToken.mintFeather(1, {value: ethers.utils.parseEther('0.001')}))
        .to.be.revertedWith('Sale must be active to mint Token');
    });

    it("Should be on presale list when added", async function () {
      // Add addr1 to presale list, return onPreSaleList(addr1) is true
      await hardhatToken.addToPresaleList([addr1.address]);
      expect(await hardhatToken.onPreSaleList(addr1.address)).to.equal(true);
    });

    it("Should be off presale list when removed", async function () {
      // REmove addr1 from presale list, return onPreSaleList(addr1) is false
      await hardhatToken.removeFromPresaleList([addr1.address]);
      expect(await hardhatToken.onPreSaleList(addr1.address)).to.equal(false);
    });

    it("Should owner own all reserved tokens when called", async function () {
      // Reserve all tokens available for the team
      await hardhatToken.reserveTokens(owner.address, 64);        
      const ownerBalance = await hardhatToken.balanceOf(owner.address);
      expect(await hardhatToken.totalSupply()).to.equal(ownerBalance);
    });

    it("Should return hidden tokenURI when collection is not yet revealed", async function () {
      // Toggle sale, mint one token and equest tokenURI, return is hidden tokenURI.
      await hardhatToken.toggleSaleState();
      await hardhatToken.mintFeather(1, {value: ethers.utils.parseEther('0.001')});          
      expect(await hardhatToken.tokenURI(1)).to.equal('ipfs://QmXWUTUkBuRZZsM1ivXZyYb3gKykkqSkfz449v9QPvq3DN/talesoffeather.json');
    });

    it("Should return revealed tokenURI when collection is revealed", async function () {
      // Toggle sale, mint one token, toggle reveal and equest tokenURI, return is revealed tokenURI.  
      await hardhatToken.reveal();
      await hardhatToken.mintFeather(1, {value: ethers.utils.parseEther('0.001')});            
      expect(await hardhatToken.tokenURI(1)).to.equal('ipfs://XXXXXXXXXXX/1');
    });
  });
});