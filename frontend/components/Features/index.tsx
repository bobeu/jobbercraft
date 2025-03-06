import React from "react";
import { 
  Fast,
  Crypto,
  Hiring,
  RemoteJob,
  JobOffer,
  Transfer,
  Switches,
  Collaborate2,
  ResumezFolder,
  UpdateResume,
  AcceptRequest,
  DirectCommunication } from "../assets";

import { Paper, Typography } from "@mui/material";

export default function Features() {
  return (
    <> 
      <section id="features" className="bg-[url('/map-background.svg')] bg-no-repeat bg-cover bg-right-top w-full h-full ">
        <div className="w-full relative flex justify-center items-center py-20">
          <div>
            <div className="text-center my-6 font-semibold flex justify-center flex-col items-center">
              <Typography variant="h2" className="font-bold text-cyan-700">
                Key Features
              </Typography>
            </div>
            <div className="container grid grid-cols-1 md:grid-cols-3 gap-4">
              {featureCards.map((feature, i) => (
                <Paper key={i} elevation={0} className="p-14 rounded-3xl text-cyan-700 ">
                  <div className="text-center flex flex-col">
                    <div className="mb-4 justify-center items-center w-28 mx-auto">
                      {feature.icon}
                    </div>
                    <Typography variant="h6" className="font-bold">
                      {feature.title}
                    </Typography>
                    <Typography variant="body2" className="p-2 text-gray-600">
                      {feature.description}
                    </Typography>
                  </div>
                </Paper>
              ))}
            </div>
          </div>
        </div>
      </section>  
    </>
  );
}

const featureCards = [
  {
    icon: <Hiring  height={'100'} width={'100'} />,
    title: "Hire",
    description: "Got a task you need help with? With a click, get the best hand from the pool of approved professionals.."
  },
  { 
    icon: <JobOffer height={'100'} width={'100'} />, 
    title: "Create offer",
    description: "Post and outsource as many job opportunties with commitments locked in a smart contract until the job is satisfactorily conpleted" 
  },
  {                               
    icon: <AcceptRequest height={'100'} width={'100'} />,
    title: "Approve or reject request" ,
    description: "Hirer can accept or reject requests to work"
  },
  { 
    icon: <ResumezFolder height={'100'} width={'100'} />,
    title: "Screen rezumez to select among requesters" ,
    description: "Jobbers' resumez are available to hirer for screening when they open request to work."
  },
  { 
    icon: <Transfer height={'100'} width={'100'} />,
    title: "Secure, convenient and efficient payment with crypto" ,
    description: "Different from other freelancing platform, payments are made and secured using smart contract."
  },
  { 
    icon: <Fast height={'100'} width={'100'} />,
    title: "No delayed payment" ,
    description: "For Jobbers, payment is instantaneous soon as work is marked 'Completed' ",
  },
  { 
    icon: <Collaborate2 height={'100'} width={'100'} />,
    title: "Collaborate or Work solo",
    description: "For flexibility of delivery, Hiwork allows for jobbers to collaborate or rather singleHandedly work on a job."
  },
  { 
    icon: <DirectCommunication height={'100'} width={'100'} />,
    title: "Room for negotiation" ,
    description: "When hirer display job offers, jobbers are able to open requests and negotiate."
  },
  { 
    icon: <Switches height={'100'} width={'100'} />,
    title: "Host and Control access to your data on the blockchain",
    description: "As a jobber, you decide if access should be granted to hirer to view your resumez or not. You control your data, not us."
  },
  { 
    icon: <RemoteJob height={'100'} width={'100'} />,
    title: "Remote",
    description: "Work at your convenience anywhere. Enjoy the benefit of freelancing."
  },
  { 
    icon: <UpdateResume height={'100'} width={'100'} />,
    title: "Update Rezume",
    description: "Your rezumez is updated anytime you successfully complete a job."
  },
  { 
    icon: <Crypto height={'100'} width={'100'} />,
    title: "Earn reward",
    description: "HiWork is an ecosystem of works. Every successful job completion gives back to both the Hirer, validators and the jobbers."
  },
  { 
    icon: <DirectCommunication height={'100'} width={'100'} />,
    title: "Direct communication",
    description: "As a jobber, you communicate directly with the hirer. No internediary. The validators simply enforces quality, accountability and timeliness."
  }
]