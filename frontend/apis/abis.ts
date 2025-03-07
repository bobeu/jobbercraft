export const allowanceAbi = [
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "owner",
        "type": "address"
      },
      {
        "internalType": "address",
        "name": "spender",
        "type": "address"
      }
    ],
    "name": "allowance",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
] as const;

export const approveAbi = [
    {
        "inputs": [
          {
            "internalType": "address",
            "name": "spender",
            "type": "address"
          },
          {
            "internalType": "uint256",
            "name": "amount",
            "type": "uint256"
          }
        ],
        "name": "approve",
        "outputs": [
          {
            "internalType": "bool",
            "name": "",
            "type": "bool"
          }
        ],
        "stateMutability": "nonpayable",
        "type": "function"
    },
] as const;

export const postJobAbi = [
  {
    "inputs": [
      {
        "internalType": "uint8",
        "name": "jobType",
        "type": "uint8"
      },
      {
        "internalType": "string",
        "name": "title",
        "type": "string"
      },
      {
        "internalType": "string[]",
        "name": "tags",
        "type": "string[]"
      },
      {
        "internalType": "string",
        "name": "jobRef",
        "type": "string"
      },
      {
        "internalType": "uint16",
        "name": "proposedEndDateInDays",
        "type": "uint16"
      },
      {
        "internalType": "uint256",
        "name": "offerPrice",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "curatorId",
        "type": "uint256"
      }
    ],
    "name": "postJob",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "jobId",
        "type": "uint256"
      }
    ],
    "stateMutability": "payable",
    "type": "function"
  },
] as const;

export const requestWorkAbi = [
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "jobId",
        "type": "uint256"
      },
      {
        "internalType": "uint16",
        "name": "proposedCompletionDateInDays",
        "type": "uint16"
      },
      {
        "internalType": "uint256",
        "name": "myBestPrice",
        "type": "uint256"
      }
    ],
    "name": "requestToWork",
    "outputs": [
      {
        "internalType": "bool",
        "name": "",
        "type": "bool"
      }
    ],
    "stateMutability": "nonpayable",
    "type": "function"
  },
] as const;


export const approveRequestAbi = [
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "jobId",
        "type": "uint256"
      },
      {
        "internalType": "uint8[]",
        "name": "selectedPositions",
        "type": "uint8[]"
      }
    ],
    "name": "approveRequests",
    "outputs": [
      {
        "internalType": "bool",
        "name": "",
        "type": "bool"
      }
    ],
    "stateMutability": "nonpayable",
    "type": "function"
  },
] as const;


export const submitAndSignCompleteionAbi = [
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "jobId",
        "type": "uint256"
      }
    ],
    "name": "submitAndSignCompletion",
    "outputs": [
      {
        "internalType": "bool",
        "name": "_return",
        "type": "bool"
      }
    ],
    "stateMutability": "nonpayable",
    "type": "function"
  },
] as const;


export const approveCompletionAbi = [
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "jobId",
        "type": "uint256"
      }
    ],
    "name": "approveCompletion",
    "outputs": [
      {
        "internalType": "bool",
        "name": "",
        "type": "bool"
      }
    ],
    "stateMutability": "nonpayable",
    "type": "function"
  },
] as const;


export const cancelJobAbi = [
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "jobId",
        "type": "uint256"
      }
    ],
    "name": "cancelJob",
    "outputs": [
      {
        "internalType": "bool",
        "name": "",
        "type": "bool"
      }
    ],
    "stateMutability": "nonpayable",
    "type": "function"
  },
] as const;


export const becomeAJobberAbi = [
  {
    "inputs": [
      {
        "internalType": "string",
        "name": "name",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "aka",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "field",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "profileURI",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "avatar",
        "type": "string"
      }
    ],
    "name": "becomeAJobber",
    "outputs": [
      {
        "internalType": "bool",
        "name": "",
        "type": "bool"
      }
    ],
    "stateMutability": "payable",
    "type": "function"
  },
] as const;


export const updateProfileInfoAbi = [
  {
    "inputs": [
      {
        "internalType": "string",
        "name": "field",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "profileURI",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "avatar",
        "type": "string"
      }
    ],
    "name": "updateProfileInfo",
    "outputs": [
      {
        "internalType": "bool",
        "name": "",
        "type": "bool"
      }
    ],
    "stateMutability": "payable",
    "type": "function"
  },
] as const;


export const getJobberAbi = [
  {
    "inputs": [],
    "name": "viewJobs",
    "outputs": [
      {
        "components": [
          {
            "components": [
              {
                "internalType": "enum IJob.JobType",
                "name": "jobType",
                "type": "uint8"
              },
              {
                "internalType": "bytes",
                "name": "title",
                "type": "bytes"
              },
              {
                "internalType": "bytes",
                "name": "jobRef",
                "type": "bytes"
              },
              {
                "internalType": "uint8",
                "name": "signature",
                "type": "uint8"
              },
              {
                "internalType": "uint64",
                "name": "datePosted",
                "type": "uint64"
              },
              {
                "internalType": "uint64",
                "name": "proposeEnd",
                "type": "uint64"
              },
              {
                "internalType": "uint256",
                "name": "offerPrice",
                "type": "uint256"
              },
              {
                "internalType": "address",
                "name": "hirer",
                "type": "address"
              },
              {
                "internalType": "enum IJob.JobStatus",
                "name": "jStatus",
                "type": "uint8"
              }
            ],
            "internalType": "struct IJob.Metadata",
            "name": "job",
            "type": "tuple"
          },
          {
            "components": [
              {
                "internalType": "uint64",
                "name": "proposedJobEnd",
                "type": "uint64"
              },
              {
                "internalType": "uint256",
                "name": "myBestPrice",
                "type": "uint256"
              },
              {
                "internalType": "address",
                "name": "identifier",
                "type": "address"
              },
              {
                "internalType": "bool",
                "name": "signed",
                "type": "bool"
              },
              {
                "internalType": "bool",
                "name": "acceptance",
                "type": "bool"
              }
            ],
            "internalType": "struct IJob.Jobber[]",
            "name": "requests",
            "type": "tuple[]"
          },
          {
            "internalType": "bytes[]",
            "name": "tags",
            "type": "bytes[]"
          },
          {
            "internalType": "address",
            "name": "curator",
            "type": "address"
          }
        ],
        "internalType": "struct IJob.JobMetadata[]",
        "name": "all",
        "type": "tuple[]"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
] as const;