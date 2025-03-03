import { loadFixture } from "@nomicfoundation/hardhat-network-helpers";
import BigNumber from "bignumber.js";
import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import { expect } from "chai";
import { ethers } from "hardhat";
import assert from "assert";
import { IJob } from "../typechain-types/contracts/interfaces";
import { assertNumberEquality } from "./utils";
import { 
  ApproveCompletionOption,
  ApproveRequestOption,
  JobStatus,
  JobberData,
  CancelJobOption,
  RequestOptionProps,
  SubmitOption
} from "./types"

const buildstring = (affix: number, times: number) => `${affix}${"0".repeat(times)}`;

describe("JobberCraft test", function () {
  const INITIALIZER = 5;
  // const APPROVED_REWARDBASE = 150;
  // const PROBATION_REWARDBASE = 50;
  const CANCELLATION_FEE_RATE = 10; // In %
  const MINIMUM_OFFER = buildstring(9, 15);
  const SIGNUP_FEE = buildstring(1, 18);
  const JOBBER_FEE = ethers.utils.parseUnits("0.1");
  const JOB_REF = "https://github.com/bobeu/jobbercraft";
  const PROPOSED_END_DATE_IN_DAYS = 7;
  const OFFERPRICE = buildstring(50, 18);
  const RESTRICTION_PRICE = buildstring(60, 18);
  const JOBTYPE = 1;
  const TITLE = "Smart contract dev";
  const TAGS = ["BACKEND", "WEB3"];

  async function deployContractsFixture() {
    const [deployer, upgrader, jobber1, jobber2, curator1, curator2, exAlc, hirer] = await ethers.getSigners();

    // Deploy test stable token
    const TestcUSD = await ethers.getContractFactory("TestUSDT");
    const testcUSD = await TestcUSD.deploy();
    await testcUSD.deployed();

    // Fee receiver contract
    const FeeTo = await ethers.getContractFactory("FeeTo");
    const feeTo = await FeeTo.deploy();
    await feeTo.deployed();

    // Deploy Jobber contract
    const Jobbers = await ethers.getContractFactory("Jobbers");
    const jobbers = await Jobbers.deploy(feeTo.address, upgrader.address);
    await jobbers.deployed();

    // Deploy Jobbercraft contract
    const JobberCraft = await ethers.getContractFactory("JobberCraft");
    const jCraft = await JobberCraft.deploy(INITIALIZER, feeTo.address);
    await jCraft.deployed();

    const hiAddress = jCraft.address;

    // Deploy craft token
    const Craft = await ethers.getContractFactory("Craft");
    const craft = await Craft.deploy(hiAddress);
    await craft.deployed();

    await jobbers.updateMembershipInfo(0, upgrader.address, 0);
   
    const mintTestcUSD = async (to: string, amount: string) => {
      await testcUSD.mint(to, amount);
    };

    const signUpCurators = async () => {
      const froms = [curator1, curator2];
      for (let i = 0; i < froms.length; i++) {
        await jCraft.connect(froms[i]).becomeACurator();
      }
      return froms;
    };

    const postJob = async (from: SignerWithAddress, curatorId: number) => {
      await jCraft.connect(from).postJob(JOBTYPE, TITLE, TAGS, JOB_REF, PROPOSED_END_DATE_IN_DAYS, OFFERPRICE, curatorId);
      return (await jCraft.getLastJobId()).sub(1);
    };

    const requestToWork = async (option: RequestOptionProps) => {
      const { froms, jobId, myBestPrices, proposeEndDate } = option;
      for (let i = 0; i < froms.length; i++) {
        await jCraft.connect(froms[i]).requestToWork(jobId, proposeEndDate, myBestPrices[i]);
      }
    };

    const approveRequests = async (option: ApproveRequestOption) => {
      const { from, jobId, jobbers } = option;
      let selectedPositions: Array<number> = [];
      for (let i = 0; i < jobbers.length; i++) {
        const position = await jCraft.getPosition(jobbers[i].address, jobId);
        selectedPositions.push(position);
      }
      // console.log("SelectedPosition: ", selectedPositions);
      await jCraft.connect(from).approveRequests(jobId, selectedPositions);
    };

    const submitAndSignCompletion = async (option: SubmitOption) => {
      const { jobId, froms } = option;
      for (let i = 0; i < froms.length; i++) {
        await jCraft.connect(froms[i]).submitAndSignCompletion(jobId);
      }
    };

    const approveCompletion = async (option: ApproveCompletionOption) => {
      const { jobId, froms } = option;
      assert(froms.length === 1, "Froms should be 1");
      await jCraft.connect(froms[0]).approveCompletion(jobId);
    };

    const cancelJob = async (option: CancelJobOption) => {
      const { jobId, froms } = option;
      assert(froms.length === 1, "Froms should be 1");
      await jCraft.connect(froms[0]).cancelJob(jobId);
    };

    const upgradeOrDowngradeUser = async (from: SignerWithAddress, user: string, flag: number) => {
      await jobbers.connect(from).upgradeOrDowngradeUser(user, flag);
    };

    const becomeAJobber = async (froms: SignerWithAddress[], data: JobberData[]) => {
      assert(data.length >= froms.length, "BecomeAJobber: Length mistmatch");
      for (let i = 0; i < froms.length; i++) {
        const d = data[i];
        // await mintTestcUSD(froms[i].address, SIGNUP_FEE);
        // await testcUSD.connect(froms[i]).approve(jobbers.address, SIGNUP_FEE);
        await jobbers.connect(froms[i]).becomeAJobber(d.name, d.aka, d.field, d.profileUrl, d.avatar, {value: SIGNUP_FEE});
      }
      return JOBBER_FEE;
    };

    const getJobs = async (jobId: number) => {
      return await jCraft.getJobInfo(jobId);
    };

    const getStatuses = async (froms: SignerWithAddress[]) => {
      let statuses: string[] = [];
      for (let i = 0; i < froms.length; i++) {
        const status = await jobbers.connect(froms[i]).myStatus();
        statuses.push(status);
      }
      return statuses;
    };

    const getPositions = async (froms: SignerWithAddress[], jobId: number) => {
      let positions: number[] = [];
      froms.forEach(async from => {
        const position = await jCraft.getPosition(from.address, jobId);
        positions.push(position);
      });
      // console.log("positions", positions);
      return positions;
    };

    const getRequests = async (jobId: number): Promise<IJob.JobberStructOutput[]> => {
      return await jCraft.getRequests(jobId);
    };

    // initializes Hiwork function
    await jCraft.initialize(CANCELLATION_FEE_RATE, MINIMUM_OFFER, testcUSD.address, jobbers.address);

    return {
      deployer,
      upgrader,
      jobber1,
      jobber2,
      jCraft,
      jobbers,
      curator1,
      curator2,
      exAlc,
      feeTo,
      hirer,
      hiAddress,
      testcUSD,
      JOB_REF,
      PROPOSED_END_DATE_IN_DAYS,
      OFFERPRICE,
      RESTRICTION_PRICE,
      MINIMUM_OFFER,
      postJob,
      cancelJob,
      upgradeOrDowngradeUser,
      mintTestcUSD,
      getJobs,
      getRequests,
      getStatuses,
      getPositions,
      requestToWork,
      becomeAJobber,
      signUpCurators,
      approveRequests,
      approveCompletion,
      submitAndSignCompletion
    };
  }

  describe("Deployment", function () {
    it("Should sign up jobbers successfully", async function () {
      const { becomeAJobber, jobber1, jobbers } = await loadFixture(deployContractsFixture);
      await becomeAJobber([jobber1], JOBBER_DATA);
      assertNumberEquality([(await jobbers.ids(jobber1.address)).toNumber()], [1]);
    });

    it("Should set jobber statuses correctly", async function () {
      const { exAlc, getStatuses, becomeAJobber, jobber2 } = await loadFixture(deployContractsFixture);
      let froms = Array.from([jobber2]);
      await becomeAJobber(froms, JOBBER_DATA);
      froms.push(exAlc);
      const statuses = await getStatuses(froms);
      expect(statuses[0]).to.be.equal("Probation");
      expect(statuses[1]).to.be.equal("None");
    });

    // Note:  We have to slightly increase the value of minting fee so to enable
    // Hpm contract have enough gas to route call to the Ham contract.
    //   Compare hamFee & hamFee_atcual
    // We jobber2 is upgrading from JobberCraft Probation to JobberCraft Approved, we can
    // always confirm that jobber2 owns same tokenId on Ham.
    it("Should upgrade jobber2 from probation to Approved", async function () {
      const { getStatuses, becomeAJobber, upgradeOrDowngradeUser, deployer, jobber2 } = await loadFixture(deployContractsFixture);
      let froms = Array.from([jobber2]);
      await becomeAJobber(froms, JOBBER_DATA);
      const status = await getStatuses(froms);
      expect(status[0]).to.be.equal("Probation");
      await upgradeOrDowngradeUser(deployer, jobber2.address, 1);
      const newStatus = await getStatuses(froms);
      expect(newStatus[0]).to.be.equal("Approved");
    });

    it("Should revert if trying to upgrade multiple times.", async function () {
      const { getStatuses, becomeAJobber, jobbers, jCraft, upgradeOrDowngradeUser, deployer, jobber2 } = await loadFixture(deployContractsFixture);
      let froms = Array.from([jobber2]);
      await becomeAJobber(froms, JOBBER_DATA);
      const status = await getStatuses(froms);
      expect(status[0]).to.be.equal("Probation");
      await upgradeOrDowngradeUser(deployer, jobber2.address, 1);
      const newStatus = await getStatuses(froms);
      expect(newStatus[0]).to.be.equal("Approved");
      await expect(jobbers.upgradeOrDowngradeUser(jobber2.address, 1)).to.be.revertedWith("Not on probation");
    });

    it("Should revert if offered is less than the minimum offer", async function () {
      const { hirer, signUpCurators, jCraft, testcUSD,  } = await loadFixture(deployContractsFixture);
      const curators = await signUpCurators();
      const OFFER = buildstring(8, 15);
      const curatorId = await jCraft.curatorsId(curators[0].address);
      await expect(jCraft.connect(hirer).postJob(JOBTYPE, TITLE, TAGS, JOB_REF, PROPOSED_END_DATE_IN_DAYS, OFFER, curatorId)).to.be.revertedWith("14");
    });

    it("Should post a new Job successfully", async function () {
      const { OFFERPRICE, postJob, getJobs, JOB_REF, mintTestcUSD, testcUSD, hirer, signUpCurators, jCraft } = await loadFixture(deployContractsFixture);
      const curators = await signUpCurators();
      const curatorId = await jCraft.curatorsId(curators[0].address);
      await mintTestcUSD(hirer.address, OFFERPRICE);
      await testcUSD.connect(hirer).approve(jCraft.address, OFFERPRICE);
      const jobId = await postJob(hirer, curatorId.toNumber());
      const onchainJobs = await getJobs(jobId.toNumber());
      expect(onchainJobs[0].hirer).to.be.equal(hirer.address);
      expect(onchainJobs[0].datePosted.toNumber()).to.be.greaterThan(0);
      expect(ethers.utils.defaultAbiCoder.decode(["string"], onchainJobs[0].jobRef)[0]).to.be.equal(JOB_REF);
    });

    it("Should allow both membership categories apply to work for offer within limit", async function () {
      const { OFFERPRICE, mintTestcUSD, postJob, getJobs, upgradeOrDowngradeUser, requestToWork, getPositions, deployer, becomeAJobber, jobber1, jobber2, testcUSD, hirer, signUpCurators, jCraft } = await loadFixture(deployContractsFixture);
      let jobbers = Array.from([jobber1, jobber2]);
      var myBestPrices = Array.from([buildstring(60, 18), buildstring(55, 18)]);
      await becomeAJobber(jobbers, JOBBER_DATA);
      await upgradeOrDowngradeUser(deployer, jobber1.address, 1);
      const curators = await signUpCurators();
      const curatorId = await jCraft.curatorsId(curators[0].address);
      await mintTestcUSD(hirer.address, BigNumber(OFFERPRICE).times(2).toString());
      await testcUSD.connect(hirer).approve(jCraft.address, OFFERPRICE);
      const jobId = (await postJob(hirer, curatorId.toNumber())).toNumber();
      await requestToWork({
        froms: jobbers,
        jobId: jobId.toString(),
        myBestPrices,
        proposeEndDate: 8
      });
      const positions = await getPositions(jobbers, jobId);
      const onchainJobs = await getJobs(jobId);
      expect(positions[0]).to.be.equal(0);
      expect(positions[1]).to.be.equal(1);
      expect(onchainJobs.requests.length).to.be.equal(2);
      expect(onchainJobs.requests[0].identifier).to.be.equal(jobber1.address);
      expect(onchainJobs.requests[1].identifier).to.be.equal(jobber2.address);
      expect(onchainJobs.requests[0].myBestPrice.toString()).to.be.equal(myBestPrices[0]);
      expect(onchainJobs.requests[1].myBestPrice.toString()).to.be.equal(myBestPrices[1]);
      expect(onchainJobs.requests[0].proposedJobEnd).to.be.greaterThan(0);
      expect(onchainJobs.requests[1].proposedJobEnd).to.be.greaterThan(0);
    });

    it("Should restrict Non member from requesting jobs.", async function () {
      const { OFFERPRICE, mintTestcUSD, postJob, jobber1, testcUSD, hirer, signUpCurators, jCraft } = await loadFixture(deployContractsFixture);
      // let jobbers = Array.from([jobber1]);
      var myBestPrice = buildstring(60, 18);
      const curators = await signUpCurators();
      const curatorId = await jCraft.curatorsId(curators[0].address);
      await mintTestcUSD(hirer.address, BigNumber(OFFERPRICE).times(2).toString());
      await testcUSD.connect(hirer).approve(jCraft.address, OFFERPRICE);
      const jobId = (await postJob(hirer, curatorId.toNumber())).toNumber();
      await expect(jCraft.connect(jobber1).requestToWork(jobId, 8, myBestPrice)).to.be.revertedWith("1");
    });

    it("Should restrict probation member from requesting jobs above certain amount", async function () {
      const { OFFERPRICE, mintTestcUSD, RESTRICTION_PRICE, becomeAJobber, jobber1, testcUSD, hirer, signUpCurators, jCraft } = await loadFixture(deployContractsFixture);
      let jobbers = Array.from([jobber1]);
      var myBestPrices = buildstring(55, 18);
      await becomeAJobber(jobbers, JOBBER_DATA);
      const curators = await signUpCurators();
      const curatorId = await jCraft.curatorsId(curators[0].address);
      await jCraft.setProbationOfferLimit(OFFERPRICE);
      const offer = BigNumber(RESTRICTION_PRICE).times(2).toString();
      await mintTestcUSD(hirer.address, offer);
      await testcUSD.connect(hirer).approve(jCraft.address, offer);
      await jCraft.connect(hirer).postJob(JOBTYPE, TITLE, TAGS, JOB_REF, PROPOSED_END_DATE_IN_DAYS, offer, curatorId);
      const jobId = (await jCraft.getLastJobId()).sub(1);
      await expect(jCraft.connect(jobber1).requestToWork(jobId.toString(), 8, myBestPrices)).to.be.revertedWith("4");
    });

    it("Should allow approved member take jobs with any offered prices", async function () {
      const { OFFERPRICE, mintTestcUSD, upgradeOrDowngradeUser, getJobs, deployer, requestToWork, RESTRICTION_PRICE, becomeAJobber, jobber1, testcUSD, hirer, signUpCurators, jCraft } = await loadFixture(deployContractsFixture);
      let jobbers = Array.from([jobber1]);
      var myBestPrices = [buildstring(55, 18)];
      await becomeAJobber(jobbers, JOBBER_DATA);
      await upgradeOrDowngradeUser(deployer, jobber1.address, 1);
      const curators = await signUpCurators();
      const curatorId = await jCraft.curatorsId(curators[0].address);
      await jCraft.setOfferLimit(OFFERPRICE);
      await mintTestcUSD(hirer.address, BigNumber(RESTRICTION_PRICE).times(2).toString());
      await testcUSD.connect(hirer).approve(jCraft.address, RESTRICTION_PRICE);
      await jCraft.connect(hirer).postJob(JOBTYPE, TITLE, TAGS, JOB_REF, PROPOSED_END_DATE_IN_DAYS, RESTRICTION_PRICE, curatorId);
      const jobId = (await jCraft.getLastJobId()).sub(1);
      await requestToWork({
        froms: jobbers,
        jobId: jobId.toString(),
        myBestPrices,
        proposeEndDate: 8
      });

      const onchainJobs = await getJobs(jobId.toNumber());
      expect(onchainJobs.requests[0].identifier).to.be.equal(jobber1.address);
    });

    it("Hirer should successfully approve collaborators", async function () {
      const { OFFERPRICE, mintTestcUSD, approveRequests, upgradeOrDowngradeUser, getJobs, deployer, requestToWork, RESTRICTION_PRICE, becomeAJobber, jobber1, jobber2, testcUSD, hirer, signUpCurators, jCraft } = await loadFixture(deployContractsFixture);
      let jobbers = Array.from([jobber1, jobber2]);
      var myBestPrices = [buildstring(55, 18), buildstring(53, 18)];
      await becomeAJobber(jobbers, JOBBER_DATA);
      await upgradeOrDowngradeUser(deployer, jobber1.address, 1);
      await upgradeOrDowngradeUser(deployer, jobber2.address, 1);
      const curators = await signUpCurators();
      const curatorId = await jCraft.curatorsId(curators[0].address);
      await jCraft.setOfferLimit(OFFERPRICE);
      await mintTestcUSD(hirer.address, BigNumber(RESTRICTION_PRICE).times(2).toString());
      await testcUSD.connect(hirer).approve(jCraft.address, RESTRICTION_PRICE);
      await jCraft.connect(hirer).postJob(JOBTYPE, TITLE, TAGS, JOB_REF, PROPOSED_END_DATE_IN_DAYS, RESTRICTION_PRICE, curatorId);
      const jobId = (await jCraft.getLastJobId()).sub(1);
      await requestToWork({
        froms: jobbers,
        jobId: jobId.toString(),
        myBestPrices,
        proposeEndDate: 8
      });

      await approveRequests({ from: hirer, jobbers, jobId: jobId.toString() });
      const onchainJobs = await getJobs(jobId.toNumber());
      expect(onchainJobs.requests[0].identifier).to.be.equal(jobber1.address);
      expect(onchainJobs.requests.length).to.be.equal(2);
      expect(onchainJobs.requests[0].acceptance).to.be.true;
      expect(onchainJobs.requests[1].acceptance).to.be.true;
      expect(onchainJobs.requests[0].identifier).to.be.equal(jobber1.address);
      expect(onchainJobs.requests[1].identifier).to.be.equal(jobber2.address);
    });

    it("Jobber1 should submit and sign job completion successfully", async function () {
      const { OFFERPRICE, mintTestcUSD, submitAndSignCompletion, approveRequests, upgradeOrDowngradeUser, getJobs, deployer, requestToWork, RESTRICTION_PRICE, becomeAJobber, jobber1, jobber2, testcUSD, hirer, signUpCurators, jCraft } = await loadFixture(deployContractsFixture);
      let jobbers = Array.from([jobber1, jobber2]);
      var myBestPrices = [buildstring(55, 18), buildstring(53, 18)];
      await becomeAJobber(jobbers, JOBBER_DATA);
      await upgradeOrDowngradeUser(deployer, jobber1.address, 1);
      await upgradeOrDowngradeUser(deployer, jobber2.address, 1);
      const curators = await signUpCurators();
      const curatorId = await jCraft.curatorsId(curators[0].address);
      await jCraft.setOfferLimit(OFFERPRICE);
      await mintTestcUSD(hirer.address, BigNumber(RESTRICTION_PRICE).times(2).toString());
      await testcUSD.connect(hirer).approve(jCraft.address, RESTRICTION_PRICE);
      await jCraft.connect(hirer).postJob(JOBTYPE, TITLE, TAGS, JOB_REF, PROPOSED_END_DATE_IN_DAYS, RESTRICTION_PRICE, curatorId);

      const jobId = (await jCraft.getLastJobId()).sub(1);
      await requestToWork({
        froms: jobbers,
        jobId: jobId.toString(),
        myBestPrices,
        proposeEndDate: 8
      });

      await approveRequests({ from: hirer, jobbers, jobId: jobId.toString() });
      await submitAndSignCompletion({ froms: jobbers, jobId: jobId.toNumber() });
      const onchainJobs = await getJobs(jobId.toNumber());
      expect(JobStatus[onchainJobs.job.jStatus]).to.be.equal("COMPLETED");
      expect(onchainJobs.job.proposeEnd).to.be.equal(8 * (24 * 60 * 60));
    });

    it("Hirer should successfully approve completed job", async function () {
      const { OFFERPRICE, mintTestcUSD, submitAndSignCompletion, approveCompletion, approveRequests, upgradeOrDowngradeUser, getJobs, deployer, requestToWork, RESTRICTION_PRICE, becomeAJobber, curator1, curator2, testcUSD, hirer, signUpCurators, jCraft, feeTo } = await loadFixture(deployContractsFixture);
      let jobbers = Array.from([curator1, curator2]);
      const initBalFeeTo = await testcUSD.balanceOf(feeTo.address);
      var myBestPrices = [buildstring(55, 18), buildstring(53, 18)];
      await becomeAJobber(jobbers, JOBBER_DATA);
      await upgradeOrDowngradeUser(deployer, curator2.address, 1);
      await upgradeOrDowngradeUser(deployer, curator1.address, 1);
      const curators = await signUpCurators();
      const curatorId = await jCraft.curatorsId(curators[0].address);
      await jCraft.setOfferLimit(OFFERPRICE);
      await mintTestcUSD(hirer.address, BigNumber(RESTRICTION_PRICE).times(2).toString());
      await testcUSD.connect(hirer).approve(jCraft.address, RESTRICTION_PRICE);
      await jCraft.connect(hirer).postJob(JOBTYPE, TITLE, TAGS, JOB_REF, PROPOSED_END_DATE_IN_DAYS, RESTRICTION_PRICE, curatorId);

      const trustee = await jCraft.trustees(hirer.address);
      const initBalTrustee = await testcUSD.balanceOf(trustee);

      const jobId = (await jCraft.getLastJobId()).sub(1);
      await requestToWork({
        froms: jobbers,
        jobId: jobId.toString(),
        myBestPrices,
        proposeEndDate: 8
      });

      await approveRequests({ from: hirer, jobbers, jobId: jobId.toString() });
      await submitAndSignCompletion({ froms: jobbers, jobId: jobId.toNumber() });
      await approveCompletion({ froms: [hirer], jobId: jobId.toNumber() });
      const onchainJobs = await getJobs(jobId.toNumber());

      expect(JobStatus[onchainJobs.job.jStatus]).to.be.equal("CLOSED");
      expect((await testcUSD.balanceOf(feeTo.address)).gt(initBalFeeTo)).to.be.true;
      expect((await testcUSD.balanceOf(trustee)).lt(initBalTrustee)).to.be.true;
    });
  });
});

const JOBBER_DATA: JobberData[] = [
  {
    name: "SomeName1",
    aka: "Nickname1",
    field: "WhatYouDo",
    profileUrl: "https://somelinktocvorwebsite.com",
    avatar: "imageUpload"
  },
  {
    name: "SomeName1",
    aka: "Nickname1",
    field: "WhatYouDo",
    profileUrl: "https://somelinktocvorwebsite.com",
    avatar: "imageUpload"
  }
];
