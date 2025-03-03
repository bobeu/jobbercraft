import BigNumber from "bignumber.js";
// import { ContractReceipt, ethers } from "ethers";

export type AllJobs = JobMetadata[];
export type Address = string;
export type Bignumber = BigNumber | string | number;
export type SwitchChainReturn = number;
export type ContractType = import('ethers').Contract;
export type Connector = import('wagmi').Connector<any, any> | undefined;
export enum Tier { NONE, PROBATION, APPROVED }

export interface Other {
  name: string;
  aka: string;
  field: string;
  profileURI: string;
  avatar: string;
  ratings: number;
}

export interface JobberData {
  tier: Tier;
  avatarId: BigNumber;
  other: Other;
}  


export type Profile = JobberData[];
export interface ContractReceipt {
  hash?: string;
  from?: string;
  to?: string;
  confirmation?: number;
  blockNumber?: number;
}

export interface TransactionResult {
  status?: string;
  transactionResult: ContractReceipt;
  allJobs: AllJobs;
  profiles: Profile;
  errorMessage: string;
}
export enum JobStatus {
  NULL,
  OPEN,
  TAKEN,
  COMPLETED,
  CLOSED
}
export enum JobType {
  ONEOFF,
  PARTTIME,
  FULLTIME
}

export interface Metadata {
  jobType: JobType;
  title: string;
  jobRef: string;
  signature: number;
  datePosted: number;
  proposeEnd: number;
  offerPrice: BigNumber;
  hirer: string;
  jStatus: JobStatus;
};

export interface Jobber {
  proposedJobEnd: number;
  myBestPrice: BigNumber;
  identifier: string;
  signed: boolean;
  acceptance: boolean;
};

export interface JobMetadata {
  job: Metadata;
  requests: Jobber[];
  tags: string[];
  curator: string;
}

export interface ReadContractProps {
  abi: any;
  address: string;
  functionName: string;
  args: any[];
};

export interface ConfigureAndWriteTransactionProps {
  functionName: string;
  args: any[];
  abi?: any;
  address?: string;
  // tType: string;
  // erc20Addr?: string;
  // explicitAbi?: any;
  // chainId: number;
  // selector: number;
};

export interface PostJob {
  jobType: number;
  title: string;
  tags: string;
  jobRef: string; 
  proposedEndDateInDays: number, 
  offerPrice: string; 
  curatorId: number;
}

export interface RequestToWork {
  jobId: Bignumber; 
  proposedCompletionDateInDays: number; 
  myBestPrice: Bignumber;
}

export interface ApproveRequests {
  jobId: Bignumber; 
  selectedPositions: number[];
}

export interface SubmitAndSignCompletion {
  jobId: Bignumber; 
  selectedPositions: number[];
}

export interface ApproveCompletion {
  jobId: Bignumber; 
}

export interface CancelJob {
  jobId: Bignumber; 
}

export interface BecomeAJobber {
  name: string;
  aka: string;
  field: string;
  profileURI: string;
  avatarUrl: string;
}

export interface RunTransactionProps {
  functionName: string | undefined;
  // erc20Addr?: string; 
  chainId?: number;
  // abi?: any;
  account: string;
  erc20Addr?: string;
  selector?: number;
  connector?: Connector;
  pjb?: PostJob;
  rtw?: RequestToWork;
  apr?: ApproveRequests;
  sasc?: SubmitAndSignCompletion;
  apc?: ApproveCompletion;
  cj?: CancelJob;
  baj?: BecomeAJobber;
}


export interface OptionProps {
  connector: Connector;
  chainId?: number;
  account: string;
  erc20Addr: string;
  // beneficiary: string;
  jobbers : any;
  hiwork: any;
  testcUSD: any;
  methodType: string;
}

export const MOCKJOBS: JobMetadata[] = [
  {
    tags: ["DESIGN", "PHOTOSHOP", "ADOBE"],
    curator: "Curator-Address",
    job: {
      title: "Graphic designer",
      jobType: JobType.ONEOFF,
      jobRef: "https://linktojobdescription",
      signature: 0,
      datePosted: new Date().getTime(),
      proposeEnd: 60 * 60 * 24 * 5,
      offerPrice: BigNumber(`100${"0".repeat(18)}`),
      hirer: "Hirer Address",
      jStatus: JobStatus.OPEN
    },
    requests: [
      {
        acceptance: false,
        identifier: "jobber1",
        myBestPrice: BigNumber(`120${"0".repeat(18)}`),
        proposedJobEnd: 60 * 60 * 24 * 6,
        signed: false,
      },
      {
        acceptance: false,
        identifier: "jobber2",
        myBestPrice: BigNumber(`110${"0".repeat(18)}`),
        proposedJobEnd: 60 * 60 * 24 * 4,
        signed: false
      },
      {
        acceptance: false,
        identifier: "jobber3",
        myBestPrice: BigNumber(`150${"0".repeat(18)}`),
        proposedJobEnd: 60 * 60 * 24 * 5,
        signed: false
      }
    ]
  },
  {
    tags: ["DESIGN", "PHOTOSHOP", "ADOBE"],
    curator: "Curator Address",
    job: {
      title: "Content designer",
      jobType: JobType.FULLTIME,
      jobRef: "https://linktojobdescription",
      signature: 0,
      datePosted: new Date().getTime(),
      proposeEnd: 60 * 60 * 24 * 5,
      offerPrice: BigNumber(`100${"0".repeat(18)}`),
      hirer: "Hirer Address",
      jStatus: JobStatus.TAKEN
    },
    requests: [
      {
        acceptance: false,
        identifier: "jobber1",
        myBestPrice: BigNumber(`120${"0".repeat(18)}`),
        proposedJobEnd: 60 * 60 * 24 * 6,
        signed: false
      },
      {
        acceptance: false,
        identifier: "jobber2",
        myBestPrice: BigNumber(`110${"0".repeat(18)}`),
        proposedJobEnd: 60 * 60 * 24 * 4,
        signed: false
      },
      {
        acceptance: false,
        identifier: "jobber3",
        myBestPrice: BigNumber(`150${"0".repeat(18)}`),
        proposedJobEnd: 60 * 60 * 24 * 5,
        signed: false
      }
    ]
  },
  {
    tags: ["BACKEND", "SMARTCONTRACTS", "WEB3"],
    curator: "Curator Address",
    job: {
      title: "Smart Contract developer",
      jobType: JobType.ONEOFF,
      jobRef: "https://linktojobdescription",
      signature: 0,
      datePosted: new Date().getTime(),
      proposeEnd: 60 * 60 * 24 * 5,
      offerPrice: BigNumber(`100${"0".repeat(18)}`),
      hirer: "Hirer Address",
      jStatus: JobStatus.COMPLETED
    },
    requests: [
      {
        acceptance: false,
        identifier: "jobber1",
        myBestPrice: BigNumber(`120${"0".repeat(18)}`),
        proposedJobEnd: 60 * 60 * 24 * 6,
        signed: false
      },
      {
        acceptance: false,
        identifier: "jobber2",
        myBestPrice: BigNumber(`110${"0".repeat(18)}`),
        proposedJobEnd: 60 * 60 * 24 * 4,
        signed: false
      },
      {
        acceptance: false,
        identifier: "jobber3",
        myBestPrice: BigNumber(`150${"0".repeat(18)}`),
        proposedJobEnd: 60 * 60 * 24 * 5,
        signed: false
      }
    ]
  },
  {
    tags: ["BACKEND", "SMARTCONTRACTS", "WEB3"],
    curator: "Curator Address",
    job: {
      title: "Smart Contract editor",
      jobType: JobType.ONEOFF,
      jobRef: "https://linktojobdescription",
      signature: 0,
      datePosted: new Date().getTime(),
      proposeEnd: 60 * 60 * 24 * 5,
      offerPrice: BigNumber(`100${"0".repeat(18)}`),
      hirer: "Hirer Address",
      jStatus: JobStatus.NULL
    },
    requests: [
      {
        acceptance: false,
        identifier: "jobber1",
        myBestPrice: BigNumber(`120${"0".repeat(18)}`),
        proposedJobEnd: 60 * 60 * 24 * 6,
        signed: false
      },
      {
        acceptance: false,
        identifier: "jobber2",
        myBestPrice: BigNumber(`110${"0".repeat(18)}`),
        proposedJobEnd: 60 * 60 * 24 * 4,
        signed: false
      },
      {
        acceptance: false,
        identifier: "jobber3",
        myBestPrice: BigNumber(`150${"0".repeat(18)}`),
        proposedJobEnd: 60 * 60 * 24 * 5,
        signed: false
      }
    ]
  },

  {
    tags: ["BUSINESS", "FINANCE"],
    curator: "Curator Address",
    job: {
      title: "Financial analyst",
      jobType: JobType.ONEOFF,
      jobRef: "https://linktojobdescription",
      signature: 0,
      datePosted: new Date().getTime(),
      proposeEnd: 60 * 60 * 24 * 5,
      offerPrice: BigNumber(`100${"0".repeat(18)}`),
      hirer: "Hirer Address",
      jStatus: JobStatus.TAKEN
    },
    requests: [
      {
        acceptance: false,
        identifier: "jobber1",
        myBestPrice: BigNumber(`120${"0".repeat(18)}`),
        proposedJobEnd: 60 * 60 * 24 * 6,
        signed: false
      },
      {
        acceptance: false,
        identifier: "jobber2",
        myBestPrice: BigNumber(`110${"0".repeat(18)}`),
        proposedJobEnd: 60 * 60 * 24 * 4,
        signed: false
      },
      {
        acceptance: false,
        identifier: "jobber3",
        myBestPrice: BigNumber(`150${"0".repeat(18)}`),
        proposedJobEnd: 60 * 60 * 24 * 5,
        signed: false
      }
    ]
  },

  {
    tags: ["HEALTH"],
    curator: "Curator Address",
    job: {
      title: "Health Advisor",
      jobType: JobType.PARTTIME,
      jobRef: "https://linktojobdescription",
      signature: 0,
      datePosted: new Date().getTime(),
      proposeEnd: 60 * 60 * 24 * 5,
      offerPrice: BigNumber(`100${"0".repeat(18)}`),
      hirer: "Hirer Address",
      jStatus: JobStatus.CLOSED
    },
    requests: [
      {
        acceptance: false,
        identifier: "jobber1",
        myBestPrice: BigNumber(`120${"0".repeat(18)}`),
        proposedJobEnd: 60 * 60 * 24 * 6,
        signed: false
      },
      {
        acceptance: false,
        identifier: "jobber2",
        myBestPrice: BigNumber(`110${"0".repeat(18)}`),
        proposedJobEnd: 60 * 60 * 24 * 4,
        signed: false
      },
      {
        acceptance: false,
        identifier: "jobber3",
        myBestPrice: BigNumber(`150${"0".repeat(18)}`),
        proposedJobEnd: 60 * 60 * 24 * 5,
        signed: false
      }
    ]
  },
  {
    tags: ["HEALTH"],
    curator: "Curator Address",
    job: {
      title: "Nutritionist",
      jobType: JobType.ONEOFF,
      jobRef: "https://linktojobdescription",
      signature: 0,
      datePosted: new Date().getTime(),
      proposeEnd: 60 * 60 * 24 * 5,
      offerPrice: BigNumber(`100${"0".repeat(18)}`),
      hirer: "Hirer Address",
      jStatus: JobStatus.OPEN
    },
    requests: [
      {
        acceptance: false,
        identifier: "jobber1",
        myBestPrice: BigNumber(`120${"0".repeat(18)}`),
        proposedJobEnd: 60 * 60 * 24 * 6,
        signed: false
      },
      {
        acceptance: false,
        identifier: "jobber2",
        myBestPrice: BigNumber(`110${"0".repeat(18)}`),
        proposedJobEnd: 60 * 60 * 24 * 4,
        signed: false
      },
      {
        acceptance: false,
        identifier: "jobber3",
        myBestPrice: BigNumber(`150${"0".repeat(18)}`),
        proposedJobEnd: 60 * 60 * 24 * 5,
        signed: false
      }
    ]
  },
  {
    tags: ["ART"],
    curator: "Curator Address",
    job: {
      title: "Photography coach",
      jobType: JobType.PARTTIME,
      jobRef: "https://linktojobdescription",
      signature: 0,
      datePosted: new Date().getTime(),
      proposeEnd: 60 * 60 * 24 * 5,
      offerPrice: BigNumber(`100${"0".repeat(18)}`),
      hirer: "Hirer Address",
      jStatus: JobStatus.OPEN
    },
    requests: [
      {
        acceptance: false,
        identifier: "jobber1",
        myBestPrice: BigNumber(`120${"0".repeat(18)}`),
        proposedJobEnd: 60 * 60 * 24 * 6,
        signed: false
      },
      {
        acceptance: false,
        identifier: "jobber2",
        myBestPrice: BigNumber(`110${"0".repeat(18)}`),
        proposedJobEnd: 60 * 60 * 24 * 4,
        signed: false
      },
      {
        acceptance: false,
        identifier: "jobber3",
        myBestPrice: BigNumber(`150${"0".repeat(18)}`),
        proposedJobEnd: 60 * 60 * 24 * 5,
        signed: false
      }
    ]
  }
];
