import {HardhatRuntimeEnvironment} from 'hardhat/types';
import {DeployFunction} from 'hardhat-deploy/types';
// import { ethers } from 'hardhat';

const func: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  const {deployments, getNamedAccounts} = hre;
	const {deploy} = deployments;
	const {deployer, upgrader } = await getNamedAccounts();
  const initializer = 50;
  // const probFee = ethers.utils.parseEther('1');

  console.log("Deployments in progress ...");
  const feeTo = await deploy('FeeTo', {
    from: deployer,
    gasLimit: 4000000,
    args: []
  });

  console.log('FeeTo deployed to ...', feeTo.address);

  const jCraft = await deploy('JobberCraft', {
    from: deployer,
    // gasLimit: 4000000,
    args: [initializer, feeTo.address]
  });

  const tUSDT = await deploy('TestUSDT', {
    from: deployer,
    args: []
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
  console.log("JobberCraft deployed to", jCraft.address);
};

export default func;
func.tags = ['JobberCraft', 'Craft', 'Jobbers'];