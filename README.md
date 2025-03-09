# JobberCraft
Open source, permissionless, decentralized protocol providing freelancing services to everyone. leveraging the decentralized capability of the blockchain, we connect hirers to job seekers with simplified and fair payment pattern. The protocol is built with focus on fair treatment by and from parties involved.

# Goal
We believe everyone has a skill to offer, and the goal is to have people showcase and develop quality skills through engagments and healthy collaboration while earning reasonably for their work.

## Why JobberCraft (problems)?
- Existing centralized freelancing have rigid and slow payment method such as paypal.
- __Denial of participation__ - Most talented freelancers are restricted from participation because the mode of payments are not available in their location. Example is Paypal not being available to some African countries.
-  __Higher commision on payments__ - Some centralized platforms charges as high as 20% commission on payments for job done.
- Middlemen activities : Centralized platforms stands as middlemen between Hirers and Jobbers

## Solutions And Features
- Using cryptocurrency, we introduce a simple, efficient, and fast payment solution. Our strategy ensures payment on job completion, even so, hirers can access their funds provided they operate within the set rules. These rules are enforced by smart contracts.
- Direct negotiation between Hirer and Jobbers. Unlike centralized systems where Hirers post jobs with offers that Jobbers are forced to accept, our solution, via onchain interactions, creates room for negotiations where Hirers can accept or reject them.
- Collaboration: On JobberCraft, Job hunters have the opportunity to collaborate on a job. More than one jobbers can request to work on a job, and the job creator can accept more than one requests while curators facilitates the collaboration ensuring quality services are provided through the whole processes.
- With a minimal charge for posting a job, Hirers can significantly minimize cost. Same applies to the hunters.
- We employed curation system to facilitate quality job submission.
- Through healthy collaboration, Jobbers can grow their skills.

## Architecture, Tools
JobberCraft is built with activities to be 80% onchain. These are smart-contracts-based actions that completely phase out intermediaries.
- We use smart contracts __(built with Solidity language)__ as database to hold relevant public-inclined and financial data, while
- the frontend, built with React, Typescript, and TailwindCSS using the NextJs framework serves as the user interface.
- We support __[Wagmi](https:wagmi.sh)__, __[Viem](https://viem.sh)__, and TanstackQuery to build persistent connection between the frontend and the smart contracts.

## User story
- __The Hirer__
    - Connects wallet
    - Clicks create job button
    - Fill offer details
    - Submit transaction
    - Approves contract with offerprice
    - Creates Job

- Smart contract holds in trust
- If Hirer wishes to cancel
    - Job is cancelled. No penalty

- __Jobbers__
    - Signs up
        - By default in probation mode
            - Cannot take job above $200 for instance
        - Upgraded
            - Can take jobs with any price
    - Sends request to work.
        - Input their best price or
        - Accept to work with Hirer's
    - __Hirer__ 
        - Reject
            - Ends
        - Accepts
            - Accepts only one jobber
            - Accepts more than one jobbers
                - Jobbers can collaborate
                - All of them will sign job completion or the curator based on contract rules
            - __Hirer__
                - Wishes to cancel job
                    - A small amount is deducted to compensate the hunters.
            - __Jobbers__
                - Submit and sign completion
                __Hirer__
                    - Approves job completion
                        - Payment is automatically splitted among collaborators

# Get Started
- __Smart Contracts__
    - Clone the repository
    - Create a .env file in the root directory of the project, and fill with required variables as shown in the __.env.example__. Be sure to add it to __gitignore__ to avoid being accidentally pushed to VC.
    - cd hardhat
    - Install dependencies
        ```
        yarn install
        ```
    - Compile code
        ```
        yarn compile
        ```
    - Test
        ```
        yarn test
        ```
    - Local deploy
        ```
        yarn deploy
        ```
    - Testnet
        ```
        yarn deploy-tesnet
        ```
    - Mainnet
        ```
        yarn deploy-mainnet
        ```
- __UI__
    - cd frontend
    - Create a .env file in the root directory of the project, and fill with required variables as shown in the __.env.example__. Be sure to add it to __gitignore__ to avoid being accidentally pushed to VC.
    - __Install dependies__
        ```
        yarn install
        ```
    - __Run development server__
        ```
        yarn run dev
        ```
    - __Build for production__
        ```
        yarn build
        ```

## Demo Link
__[Deployed On Vercel](https://jobbercraft.vercel.com/)__

## Project link
__[JobberCraft Github](https://github.com/bobeu/jobbercraft)__