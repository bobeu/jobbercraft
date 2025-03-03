import { ethers } from "hardhat";

async function main() {
  const cancellationFee = 10;
  const minimMumOffer = 1_000_000_000_000_000;
  const probationRewardbase = 50;
  const approvedRewardbase = 150;

  const initializer = 5;
  const Jobbercraft = await ethers.getContractFactory("JobberCraft");
  const jcraft = await Jobbercraft.deploy(initializer);
  await jcraft.deployed();

  
  const hiAddress = jcraft.address;
  console.log(`Hiwork deployed to ${hiAddress}`);

  const Probation = await ethers.getContractFactory("Probation");
  const probation = await Probation.deploy(hiAddress);
  await probation.deployed();
  console.log(`Probation deployed to ${probation.address}`);
  
  
  const Approval = await ethers.getContractFactory("Approved");
  const approval = await Approval.deploy(hiAddress, probation.address);
  await approval.deployed();
  console.log(`Approved deployed to ${approval.address}`);
  
  const Craft = await ethers.getContractFactory("Craft");
  const craft = await Craft.deploy(hiAddress);
  await craft.deployed();
  console.log(`Craft deployed to ${craft.address}`);
  
  await jcraft.initialize(
    cancellationFee, 
    minimMumOffer, 
    craft.address, 
    probation.address, 
    approval.address,
    probationRewardbase,
    approvedRewardbase
  );
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
