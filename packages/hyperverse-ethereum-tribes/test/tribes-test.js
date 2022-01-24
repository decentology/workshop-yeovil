const { ethers } = require('hardhat');
const { expect } = require('chai');
const crypto = require('crypto');

describe('Tribes', async () => {
  let Tribes;
  let tribesContract;
  let alice;
  let bob;
  let cara;

  beforeEach(async () => {
    Tribes = await ethers.getContractFactory('Tribes');
    [alice, bob, cara] = await ethers.getSigners();

    tribesContract = await Tribes.deploy();
    await tribesContract.deployed();
  });

  describe('Initial', async () => {
    it('Checking owner', async () => {
      expect(await tribesContract.owner()).to.equal(alice.address);
    });
  });
  
  describe('No Instance', async () => {
    it('Tenant mapping should be empty', async () => {
      expect(await tribesContract.tenantCount()).to.equal(0);
    });

    it('Add a Tribe without instance should error', async () => {
      await expect(tribesContract.connect(bob).addNewTribe('metadata')).to.be.revertedWith(
        'Tenant does not have an instance',
      );
    });

    it('Joining tribe with uninstantiated Tenant should error', async () => {
      await expect(tribesContract.joinTribe(bob.address, 1)).to.be.revertedWith('Tenant does not have an instance');
    });

    it('Leaving tribe with uninstantiated Tenant should error', async () => {
      await expect(tribesContract.leaveTribe(bob.address)).to.be.revertedWith('Tenant does not have an instance');
    });

    it('Getting user tribe with uninstantiated Tenant should error', async () => {
      await expect(tribesContract.getUserTribe(bob.address, cara.address)).to.be.revertedWith(
        'Tenant does not have an instance',
      );
    });

    it('Getting tribe data with uninstantiated Tenant should error', async () => {
      await expect(tribesContract.getTribeData(bob.address, 1)).to.be.revertedWith('Tenant does not have an instance');
    });

    it('Getting total tribes with uninstantiated Tenant should error', async () => {
      await expect(tribesContract.totalTribes(bob.address)).to.be.revertedWith('Tenant does not have an instance');
    });
  });

  describe('With an instance', async () => {
    beforeEach(async () => {
      await tribesContract.connect(cara).createInstance();
      await tribesContract.connect(alice).createInstance();
      await tribesContract.connect(bob).createInstance();
      await tribesContract.connect(cara).addNewTribe('metadata');
      
    });

    it('Should return a Tenant Total of 3', async () => {
      expect(await tribesContract.tenantCount()).to.equal(3);
    });

    it('Should error on creating another instance using Cara', async () => {
      await expect(tribesContract.connect(cara).createInstance()).to.be.revertedWith('You already have an instance');
    });

    it('Should return 1 for totalTribes', async () => {
      expect(await tribesContract.totalTribes(cara.address)).to.equal(1);
    });

    it('Should allow cara to add another tribe 1', async () => {
      await expect(tribesContract.connect(cara).addNewTribe('metadata'))
        .to.emit(tribesContract, 'NewTribeCreated')
        .withArgs('metadata');
    });

    it('Should allow cara to get Tribe data', async () => {
      expect(await tribesContract.getTribeData(cara.address, 1)).to.equal('metadata');
    });
  });

  describe('Within instance user functionality', async () => {
    beforeEach(async () => {
      await tribesContract.connect(cara).createInstance();
      await tribesContract.connect(cara).addNewTribe('tribe1');
      await tribesContract.connect(cara).addNewTribe('tribe2');
    });

    it('Should allow bob to join a tribe', async () => {
      await expect(tribesContract.connect(bob).joinTribe(cara.address, 1))
        .to.emit(tribesContract, 'JoinedTribe')
        .withArgs(1, bob.address);
    });

    it('Should error when bob joins another tribe', async () => {
      await tribesContract.connect(bob).joinTribe(cara.address, 1);

      await expect(tribesContract.connect(bob).joinTribe(cara.address, 2)).to.be.revertedWith(
        'User is already in a Tribe!',
      );
    });

    it("Should return bob's tribeID which is 1", async () => {
      await tribesContract.connect(bob).joinTribe(cara.address, 1);

      expect(await tribesContract.getUserTribe(cara.address, bob.address)).to.equal(1);
    });

    it('Should return tribe data of tribe1', async () => {
      expect(await tribesContract.getTribeData(cara.address, 1)).to.equal('tribe1');
    });

    it('Should allow bob to leaveTribe', async () => {
      await tribesContract.connect(bob).joinTribe(cara.address, 1);
      await expect(tribesContract.connect(bob).leaveTribe(cara.address))
        .to.emit(tribesContract, 'LeftTribe')
        .withArgs(1, bob.address);
    });
  });
});
