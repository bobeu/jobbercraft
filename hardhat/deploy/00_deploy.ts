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
    args: [cUSD]
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

  const jobbers = await deploy('Jobbers', {
    from: deployer,
    gasLimit: 4000000,
    args: [
      feeTo.address,
      upgrader,
    ]
  });
  // probation.address,
  // approved.address,
  // tUSDT.address
  console.log("JobberCraft deployed to", jobbers.address);

  // const workToken = await deploy('JOBTOKEN', {
  //   from: deployer,
  //   gasLimit: 4000000,
  //   args: [hiAddress],
  // });


};

export default func;
func.tags = ['JobberCraft', 'JOBTOKEN', 'Jobbers'];