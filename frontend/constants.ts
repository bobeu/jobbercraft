import { stringToHex, zeroAddress } from 'viem';
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
    tags: [stringToHex("DESIGN"), stringToHex("PHOTOSHOP"), stringToHex("ADOBE")],
    curator: stringToHex("Curator-Address"),
    job: {
      title: stringToHex("Graphic designer"),
      jobType: JobType.ONEOFF,
      jobRef: stringToHex("https://linktojobdescription"),
      signature: 0,
      datePosted: BigInt(new Date().getTime()),
      proposeEnd: BigInt(60 * 60 * 24 * 5),
      offerPrice: BigInt(`100${"0".repeat(18)}`),
      hirer: stringToHex("Hirer Address"),
      jStatus: JobStatus.OPEN
    },
    requests: [
      {
        acceptance: false,
        identifier: stringToHex("jobber1"),
        myBestPrice: BigInt(`120${"0".repeat(18)}`),
        proposedJobEnd: BigInt(60 * 60 * 24 * 6),
        signed: false,
      },
      {
        acceptance: false,
        identifier: stringToHex("jobber2"),
        myBestPrice: BigInt(`110${"0".repeat(18)}`),
        proposedJobEnd: BigInt(60 * 60 * 24 * 4),
        signed: false
      },
      {
        acceptance: false,
        identifier: stringToHex("jobber3"),
        myBestPrice: BigInt(`150${"0".repeat(18)}`),
        proposedJobEnd: BigInt(60 * 60 * 24 * 5),
        signed: false
      }
    ]
  },
  {
    tags: [stringToHex("DESIGN"), stringToHex("PHOTOSHOP"), stringToHex("ADOBE")],
    curator: stringToHex("Curator Address"),
    job: {
      title: stringToHex("Content designer"),
      jobType: JobType.FULLTIME,
      jobRef: stringToHex("https://linktojobdescription"),
      signature: 0,
      datePosted: BigInt(new Date().getTime()),
      proposeEnd: BigInt(60 * 60 * 24 * 5),
      offerPrice: BigInt(`100${"0".repeat(18)}`),
      hirer: stringToHex("Hirer Address"),
      jStatus: JobStatus.TAKEN
    },
    requests: [
      {
        acceptance: false,
        identifier: stringToHex("jobber1"),
        myBestPrice: BigInt(`120${"0".repeat(18)}`),
        proposedJobEnd: BigInt(60 * 60 * 24 * 6),
        signed: false
      },
      {
        acceptance: false,
        identifier: stringToHex("jobber2"),
        myBestPrice: BigInt(`110${"0".repeat(18)}`),
        proposedJobEnd: BigInt(60 * 60 * 24 * 4),
        signed: false
      },
      {
        acceptance: false,
        identifier: stringToHex("jobber3"),
        myBestPrice: BigInt(`150${"0".repeat(18)}`),
        proposedJobEnd: BigInt(60 * 60 * 24 * 5),
        signed: false
      }
    ]
  },
  {
    tags: [stringToHex("BACKEND"), stringToHex("SMARTCONTRACTS"), stringToHex("WEB3")],
    curator: stringToHex("Curator Address"),
    job: {
      title: stringToHex("Smart Contract developer"),
      jobType: JobType.ONEOFF,
      jobRef: stringToHex("https://linktojobdescription"),
      signature: 0,
      datePosted: BigInt(new Date().getTime()),
      proposeEnd: BigInt(60 * 60 * 24 * 5),
      offerPrice: BigInt(`100${"0".repeat(18)}`),
      hirer: stringToHex("Hirer Address"),
      jStatus: JobStatus.COMPLETED
    },
    requests: [
      {
        acceptance: false,
        identifier: stringToHex("jobber1"),
        myBestPrice: BigInt(`120${"0".repeat(18)}`),
        proposedJobEnd: BigInt(60 * 60 * 24 * 6),
        signed: false
      },
      {
        acceptance: false,
        identifier: stringToHex("jobber2"),
        myBestPrice: BigInt(`110${"0".repeat(18)}`),
        proposedJobEnd: BigInt(60 * 60 * 24 * 4),
        signed: false
      },
      {
        acceptance: false,
        identifier: stringToHex("jobber3"),
        myBestPrice: BigInt(`150${"0".repeat(18)}`),
        proposedJobEnd: BigInt(60 * 60 * 24 * 5),
        signed: false
      }
    ]
  },
  {
    tags: [stringToHex("BACKEND"), stringToHex("SMARTCONTRACTS"), stringToHex("WEB3")],
    curator: stringToHex("Curator Address"),
    job: {
      title: stringToHex("Smart Contract editor"),
      jobType: JobType.ONEOFF,
      jobRef: stringToHex("https://linktojobdescription"),
      signature: 0,
      datePosted: BigInt(new Date().getTime()),
      proposeEnd: BigInt(60 * 60 * 24 * 5),
      offerPrice: BigInt(`100${"0".repeat(18)}`),
      hirer: stringToHex("Hirer Address"),
      jStatus: JobStatus.NULL
    },
    requests: [
      {
        acceptance: false,
        identifier: stringToHex("jobber1"),
        myBestPrice: BigInt(`120${"0".repeat(18)}`),
        proposedJobEnd: BigInt(60 * 60 * 24 * 6),
        signed: false
      },
      {
        acceptance: false,
        identifier: stringToHex("jobber2"),
        myBestPrice: BigInt(`110${"0".repeat(18)}`),
        proposedJobEnd: BigInt(60 * 60 * 24 * 4),
        signed: false
      },
      {
        acceptance: false,
        identifier: stringToHex("jobber3"),
        myBestPrice: BigInt(`150${"0".repeat(18)}`),
        proposedJobEnd: BigInt(60 * 60 * 24 * 5),
        signed: false
      }
    ]
  },

  {
    tags: [stringToHex("BUSINESS"), stringToHex("FINANCE")],
    curator: stringToHex("Curator Address"),
    job: {
      title: stringToHex("Financial analyst"),
      jobType: JobType.ONEOFF,
      jobRef: stringToHex("https://linktojobdescription"),
      signature: 0,
      datePosted: BigInt(new Date().getTime()),
      proposeEnd: BigInt(60 * 60 * 24 * 5),
      offerPrice: BigInt(`100${"0".repeat(18)}`),
      hirer: stringToHex("Hirer Address"),
      jStatus: JobStatus.TAKEN
    },
    requests: [
      {
        acceptance: false,
        identifier: stringToHex("jobber1"),
        myBestPrice: BigInt(`120${"0".repeat(18)}`),
        proposedJobEnd: BigInt(60 * 60 * 24 * 6),
        signed: false
      },
      {
        acceptance: false,
        identifier: stringToHex("jobber2"),
        myBestPrice: BigInt(`110${"0".repeat(18)}`),
        proposedJobEnd: BigInt(60 * 60 * 24 * 4),
        signed: false
      },
      {
        acceptance: false,
        identifier: stringToHex("jobber3"),
        myBestPrice: BigInt(`150${"0".repeat(18)}`),
        proposedJobEnd: BigInt(60 * 60 * 24 * 5),
        signed: false
      }
    ]
  },

  {
    tags: [stringToHex("HEALTH")],
    curator: stringToHex("Curator Address"),
    job: {
      title: stringToHex("Health Advisor"),
      jobType: JobType.PARTTIME,
      jobRef: stringToHex("https://linktojobdescription"),
      signature: 0,
      datePosted: BigInt(new Date().getTime()),
      proposeEnd: BigInt(60 * 60 * 24 * 5),
      offerPrice: BigInt(`100${"0".repeat(18)}`),
      hirer: stringToHex("Hirer Address"),
      jStatus: JobStatus.CLOSED
    },
    requests: [
      {
        acceptance: false,
        identifier: stringToHex("jobber1"),
        myBestPrice: BigInt(`120${"0".repeat(18)}`),
        proposedJobEnd: BigInt(60 * 60 * 24 * 6),
        signed: false
      },
      {
        acceptance: false,
        identifier: stringToHex("jobber2"),
        myBestPrice: BigInt(`110${"0".repeat(18)}`),
        proposedJobEnd: BigInt(60 * 60 * 24 * 4),
        signed: false
      },
      {
        acceptance: false,
        identifier: stringToHex("jobber3"),
        myBestPrice: BigInt(`150${"0".repeat(18)}`),
        proposedJobEnd: BigInt(60 * 60 * 24 * 5),
        signed: false
      }
    ]
  },
  {
    tags: [stringToHex("HEALTH")],
    curator: stringToHex("Curator Address"),
    job: {
      title: stringToHex("Nutritionist"),
      jobType: JobType.ONEOFF,
      jobRef: stringToHex("https://linktojobdescription"),
      signature: 0,
      datePosted: BigInt(new Date().getTime()),
      proposeEnd: BigInt(60 * 60 * 24 * 5),
      offerPrice: BigInt(`100${"0".repeat(18)}`),
      hirer: stringToHex("Hirer Address"),
      jStatus: JobStatus.OPEN
    },
    requests: [
      {
        acceptance: false,
        identifier: stringToHex("jobber1"),
        myBestPrice: BigInt(`120${"0".repeat(18)}`),
        proposedJobEnd: BigInt(60 * 60 * 24 * 6),
        signed: false
      },
      {
        acceptance: false,
        identifier: stringToHex("jobber2"),
        myBestPrice: BigInt(`110${"0".repeat(18)}`),
        proposedJobEnd: BigInt(60 * 60 * 24 * 4),
        signed: false
      },
      {
        acceptance: false,
        identifier: stringToHex("jobber3"),
        myBestPrice: BigInt(`150${"0".repeat(18)}`),
        proposedJobEnd: BigInt(60 * 60 * 24 * 5),
        signed: false
      }
    ]
  },
  {
    tags: [stringToHex("ART")],
    curator: stringToHex("Curator Address"),
    job: {
      title: stringToHex("Photography coach"),
      jobType: JobType.PARTTIME,
      jobRef: stringToHex("https://linktojobdescription"),
      signature: 0,
      datePosted: BigInt(new Date().getTime()),
      proposeEnd: BigInt(60 * 60 * 24 * 5),
      offerPrice: BigInt(`100${"0".repeat(18)}`),
      hirer: stringToHex("Hirer Address"),
      jStatus: JobStatus.OPEN
    },
    requests: [
      {
        acceptance: false,
        identifier: stringToHex("jobber1"),
        myBestPrice: BigInt(`120${"0".repeat(18)}`),
        proposedJobEnd: BigInt(60 * 60 * 24 * 6),
        signed: false
      },
      {
        acceptance: false,
        identifier: stringToHex("jobber2"),
        myBestPrice: BigInt(`110${"0".repeat(18)}`),
        proposedJobEnd: BigInt(60 * 60 * 24 * 4),
        signed: false
      },
      {
        acceptance: false,
        identifier: stringToHex("jobber3"),
        myBestPrice: BigInt(`150${"0".repeat(18)}`),
        proposedJobEnd: BigInt(60 * 60 * 24 * 5),
        signed: false
      }
    ]
  }
];