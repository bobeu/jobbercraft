import {HardhatRuntimeEnvironment} from 'hardhat/types';
import {DeployFunction, Execute} from 'hardhat-deploy/types';
// import { ethers } from 'hardhat';

const func: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  const {deployments, getNamedAccounts} = hre;
	const {deploy} = deployments;
	const {deployer, upgrader } = await getNamedAccounts();
  const initializer = 50;
  // const probFee = ethers.utils.parseEther('1');
  const testAddrs = [
    "0xD7c271d20c9E323336bFC843AEb8deC23B346352",
    "0x4045FD2c1ce56Fe5C50c6F631EC5df8e6bcc4b00",
    "0xC0f6Ef6C8A58fB431015D4D2d7e0925718EaC010"
  ]
  console.log("Deployments in progress ...");
  const feeTo = await deploy('FeeTo', {
    from: deployer,
    gasLimit: 4000000,
    args: []
  });

  console.log('FeeTo deployed to ...', feeTo.address);
  
  const tUSDT = await deploy('TestUSDT', {
    from: deployer,
    args: [testAddrs]
  });

  console.log('tUSDT deployed to ...', tUSDT.address);

  const jobber = await deploy('Jobber', {
    from: deployer,
    gasLimit: 4000000,
    args: [
      feeTo.address,
      upgrader,
    ]
  });
  console.log("Jobber deployed to", jobber.address);
  
  const jCraft = await deploy('JobberCraft', {
    from: deployer,
    // gasLimit: 4000000,
    args: [initializer, feeTo.address, tUSDT.address, jobber.address]
  });
  console.log("JobberCraft deployed to", jCraft.address);

};

export default func;
func.tags = ['JobberCraft', 'Craft', 'Jobbers'];