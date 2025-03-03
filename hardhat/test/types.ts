import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";

export type JobberData = {
  name: string;
  aka: string;
  field: string;
  profileUrl: string;
  avatar: string;
};

export enum JobStatus {
  NULL,
  OPEN,
  TAKEN,
  COMPLETED,
  CLOSED
}

export interface RequestOptionProps {
  froms: SignerWithAddress[];
  jobId: string;
  proposeEndDate: number;
  myBestPrices: string[];
}

export interface ApproveRequestOption {
  from: SignerWithAddress;
  jobId: string;
  jobbers: SignerWithAddress[];
}

export interface SubmitOption {
  jobId: number;
  froms: SignerWithAddress[];
}

export type ApproveCompletionOption = SubmitOption;
export type CancelJobOption = SubmitOption;
