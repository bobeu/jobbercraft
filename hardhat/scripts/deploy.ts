import { ethers } from "hardhat";
import * as fs from "fs/promises";

async function main() {
  // const HiWorkLib = await ethers.getContractFactory("HiWorkLib");
  // const hiworkLib = await HiWorkLib.deploy();
  // await hiworkLib.deployed();

  const cancellationFee = 10;
  const minimMumOffer = 1_000_000_000_000_000;
  const probationRewardbase = 50;
  const approvedRewardbase = 150;

  const initializer = 5;
  const HiWork = await ethers.getContractFactory("HiWork");
  const hiwork = await HiWork.deploy(initializer);
  await hiwork.deployed();

  
  const hiAddress = hiwork.address;
  console.log(`Hiwork deployed to ${hiAddress}`);

  const Probation = await ethers.getContractFactory("Probation");
  const probation = await Probation.deploy(hiAddress);
  await probation.deployed();
  console.log(`Probation deployed to ${probation.address}`);
  
  
  const Approval = await ethers.getContractFactory("Approved");
  const approval = await Approval.deploy(hiAddress, probation.address);
  await approval.deployed();
  console.log(`Approved deployed to ${approval.address}`);
  
  const WorkToken = await ethers.getContractFactory("WorkToken");
  const workToken = await WorkToken.deploy(hiAddress);
  await workToken.deployed();
  console.log(`WorkToken deployed to ${workToken.address}`);
  
  await hiwork.initialize(
    cancellationFee, 
    minimMumOffer, 
    workToken.address, 
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
