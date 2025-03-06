import { zeroAddress } from 'viem';
import { Profile } from './customTypes';
import BigNumber from 'bignumber.js';
import { JobMetadata, JobStatus, JobType } from './customTypes';

export const INIT_ZOOM = '0%';
export const DEFAULT_ANIMATION_STEPS = ['50%', '100%'];
export const CONFIRMATIONS = 3; // 3 blocks
export const flexCenter = "flex justify-center items-center";
export const flexStart = "flex justify-start items-center";
export const flexEnd = "flex justify-end items-center";
export const flexSpread = "flex justify-between items-center";
export const flexEven = "flex justify-evenly items-center";
export const JOBSTATUS = ['NULL', 'OPEN', 'TAKEN', 'COMPLETED', 'CLOSED'];
export const JOBTYPE = ['ONEOFF', 'PARTTIME', 'FULLTIME'];
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
      offerPrice: BigInt(`100${"0".repeat(18)}`),
      hirer: "Hirer Address",
      jStatus: JobStatus.OPEN
    },
    requests: [
      {
        acceptance: false,
        identifier: "jobber1",
        myBestPrice: BigInt(`120${"0".repeat(18)}`),
        proposedJobEnd: 60 * 60 * 24 * 6,
        signed: false,
      },
      {
        acceptance: false,
        identifier: "jobber2",
        myBestPrice: BigInt(`110${"0".repeat(18)}`),
        proposedJobEnd: 60 * 60 * 24 * 4,
        signed: false
      },
      {
        acceptance: false,
        identifier: "jobber3",
        myBestPrice: BigInt(`150${"0".repeat(18)}`),
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
      offerPrice: BigInt(`100${"0".repeat(18)}`),
      hirer: "Hirer Address",
      jStatus: JobStatus.TAKEN
    },
    requests: [
      {
        acceptance: false,
        identifier: "jobber1",
        myBestPrice: BigInt(`120${"0".repeat(18)}`),
        proposedJobEnd: 60 * 60 * 24 * 6,
        signed: false
      },
      {
        acceptance: false,
        identifier: "jobber2",
        myBestPrice: BigInt(`110${"0".repeat(18)}`),
        proposedJobEnd: 60 * 60 * 24 * 4,
        signed: false
      },
      {
        acceptance: false,
        identifier: "jobber3",
        myBestPrice: BigInt(`150${"0".repeat(18)}`),
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
      offerPrice: BigInt(`100${"0".repeat(18)}`),
      hirer: "Hirer Address",
      jStatus: JobStatus.COMPLETED
    },
    requests: [
      {
        acceptance: false,
        identifier: "jobber1",
        myBestPrice: BigInt(`120${"0".repeat(18)}`),
        proposedJobEnd: 60 * 60 * 24 * 6,
        signed: false
      },
      {
        acceptance: false,
        identifier: "jobber2",
        myBestPrice: BigInt(`110${"0".repeat(18)}`),
        proposedJobEnd: 60 * 60 * 24 * 4,
        signed: false
      },
      {
        acceptance: false,
        identifier: "jobber3",
        myBestPrice: BigInt(`150${"0".repeat(18)}`),
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
      offerPrice: BigInt(`100${"0".repeat(18)}`),
      hirer: "Hirer Address",
      jStatus: JobStatus.NULL
    },
    requests: [
      {
        acceptance: false,
        identifier: "jobber1",
        myBestPrice: BigInt(`120${"0".repeat(18)}`),
        proposedJobEnd: 60 * 60 * 24 * 6,
        signed: false
      },
      {
        acceptance: false,
        identifier: "jobber2",
        myBestPrice: BigInt(`110${"0".repeat(18)}`),
        proposedJobEnd: 60 * 60 * 24 * 4,
        signed: false
      },
      {
        acceptance: false,
        identifier: "jobber3",
        myBestPrice: BigInt(`150${"0".repeat(18)}`),
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
      offerPrice: BigInt(`100${"0".repeat(18)}`),
      hirer: "Hirer Address",
      jStatus: JobStatus.TAKEN
    },
    requests: [
      {
        acceptance: false,
        identifier: "jobber1",
        myBestPrice: BigInt(`120${"0".repeat(18)}`),
        proposedJobEnd: 60 * 60 * 24 * 6,
        signed: false
      },
      {
        acceptance: false,
        identifier: "jobber2",
        myBestPrice: BigInt(`110${"0".repeat(18)}`),
        proposedJobEnd: 60 * 60 * 24 * 4,
        signed: false
      },
      {
        acceptance: false,
        identifier: "jobber3",
        myBestPrice: BigInt(`150${"0".repeat(18)}`),
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
      offerPrice: BigInt(`100${"0".repeat(18)}`),
      hirer: "Hirer Address",
      jStatus: JobStatus.CLOSED
    },
    requests: [
      {
        acceptance: false,
        identifier: "jobber1",
        myBestPrice: BigInt(`120${"0".repeat(18)}`),
        proposedJobEnd: 60 * 60 * 24 * 6,
        signed: false
      },
      {
        acceptance: false,
        identifier: "jobber2",
        myBestPrice: BigInt(`110${"0".repeat(18)}`),
        proposedJobEnd: 60 * 60 * 24 * 4,
        signed: false
      },
      {
        acceptance: false,
        identifier: "jobber3",
        myBestPrice: BigInt(`150${"0".repeat(18)}`),
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
      offerPrice: BigInt(`100${"0".repeat(18)}`),
      hirer: "Hirer Address",
      jStatus: JobStatus.OPEN
    },
    requests: [
      {
        acceptance: false,
        identifier: "jobber1",
        myBestPrice: BigInt(`120${"0".repeat(18)}`),
        proposedJobEnd: 60 * 60 * 24 * 6,
        signed: false
      },
      {
        acceptance: false,
        identifier: "jobber2",
        myBestPrice: BigInt(`110${"0".repeat(18)}`),
        proposedJobEnd: 60 * 60 * 24 * 4,
        signed: false
      },
      {
        acceptance: false,
        identifier: "jobber3",
        myBestPrice: BigInt(`150${"0".repeat(18)}`),
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
      offerPrice: BigInt(`100${"0".repeat(18)}`),
      hirer: "Hirer Address",
      jStatus: JobStatus.OPEN
    },
    requests: [
      {
        acceptance: false,
        identifier: "jobber1",
        myBestPrice: BigInt(`120${"0".repeat(18)}`),
        proposedJobEnd: 60 * 60 * 24 * 6,
        signed: false
      },
      {
        acceptance: false,
        identifier: "jobber2",
        myBestPrice: BigInt(`110${"0".repeat(18)}`),
        proposedJobEnd: 60 * 60 * 24 * 4,
        signed: false
      },
      {
        acceptance: false,
        identifier: "jobber3",
        myBestPrice: BigInt(`150${"0".repeat(18)}`),
        proposedJobEnd: 60 * 60 * 24 * 5,
        signed: false
      }
    ]
  }
];