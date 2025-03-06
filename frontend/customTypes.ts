import BigNumber from "bignumber.js";

export type WagmiConfig = import("wagmi").Config;
export type AllJobs = Readonly<JobMetadata[]>;
export type Str = string;
export type Address = `0x${string}`;
export type Bignumber = BigNumber | string | number;
export type SwitchChainReturn = number;
export enum Tier { NONE, PROBATION, APPROVED }
export type TrxResult = 'success' | 'reverted';
export type TxnType = 'null' | 'postJob' | 'requestToWork' | 'becomeAJobber' | 'approveRequestToWork' | 'approveCompletion' | 'cancel' | 'submitAndSignCompletion'
export type TransactionCallback = (arg: TrxState) => void;
export type Path = 'onboard' | 'jobber' | 'hirer';
export type VoidFunc = () => void;
export type DrawerAnchor = 'confirmation' | 'jobdetails' | 'jobbers' | '';
export type ToggleDrawer = (value: number, setState: (value: number) => void) => (event: React.KeyboardEvent | React.MouseEvent) => void;

export interface ButtonObj {
  functionName: TxnType;
  buttonText: string;
  disable: boolean;
  displayMessage?: string;
}

export interface TrxState {
  status?: TrxResult;
  message: string;
}

export interface Config {
  config: WagmiConfig;
  account: Address;
  value?: bigint;
  callback?: TransactionCallback; 
}

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


export type Profile = Readonly<JobberData[]>;
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
  jobType: number;
  title: Address;
  jobRef: Address;
  signature: number;
  datePosted: bigint;
  proposeEnd: bigint;
  offerPrice: bigint;
  hirer: Address;
  jStatus: number;
};

export interface Jobber {
  proposedJobEnd: bigint;
  myBestPrice: bigint;
  identifier: Address;
  signed: boolean;
  acceptance: boolean;
};

export interface JobMetadata {
  job: Metadata;
  requests: Readonly<Jobber[]>;
  tags: Readonly<Address[]>;
  curator: Address;
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

export interface PostJob extends Config {
  jobType: number;
  title: string;
  tags: string[];
  jobRef: string; 
  proposedEndDateInDays: number, 
  offerPrice: bigint; 
  curatorId: bigint;
}

export interface RequestToWork extends Config {
  jobId: bigint; 
  proposedCompletionDateInDays: number; 
  myBestPrice: bigint;
}

export interface ApproveRequests extends Config {
  jobId: bigint; 
  selectedPositions: number[];
}

export interface SubmitAndSignCompletion extends Config {
  jobId: bigint; 
  // selectedPositions: number[];
}

export interface ApproveCompletion extends Config {
  jobId: bigint; 
}

export interface CancelJob extends Config {
  jobId: bigint; 
}

export interface BecomeAJobber extends Config {
  name: string;
  aka: string;
  field: string;
  profileURI: string;
  avatarUrl: string;
}

export interface HandleTransactionParam {
  functionName: TxnType;
  account: string;
  post_JOB?: PostJob;
  request_TWK?: RequestToWork;
  approve_RQS?: ApproveRequests;
  submit_ASC?: SubmitAndSignCompletion;
  approve_CMP?: ApproveCompletion;
  cancel_JOB?: CancelJob;
  become_JOBBER?: BecomeAJobber;
}


export interface OptionProps {
  // connector: Connector;
  chainId?: number;
  account: string;
  erc20Addr: string;
  // beneficiary: string;
  jobbers : any;
  hiwork: any;
  testcUSD: any;
  methodType: string;
}

export interface FormattedJob {
  jobType: number;
  title: string;
  jobRef: string;
  signature: number;
  datePosted: number;
  proposeEnd: number;
  offerPrice: string;
  hirer: string;
  jStatus: number;
}

export interface FormattedJobContent {
  job: FormattedJob;
  requests: FormattedJobberContent[];
  tags: string[];
  curator: string;
  isCollab: boolean;
  isHirer: boolean;
}

export interface FormattedJobberContent {
  proposedJobEnd: number;
  myBestPrice: string;
  identifier: string;
  signed: boolean;
  acceptance: boolean;
}

