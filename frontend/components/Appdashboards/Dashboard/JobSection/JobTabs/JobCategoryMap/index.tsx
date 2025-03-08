import React from "react";
import { JobMetadata } from "@/customTypes";
import { formatEther } from "viem";

export const JobCategoryMap = ({ category, toggleDisable, index, categories, jobs }: { category: string; toggleDisable: (index: number, value: boolean) => void; index: number; categories: string[]; jobs: JobMetadata[] }) => {

  return (
    <div className=" container grid grid-cols-1 md:grid-cols-3 mb-4">
      {jobs.map((job, x) => (
        <div key={x} className="bg-cyan-900 rounded border p-2 md-p-10 border-gray-100 w-full hover:bg-cyan-800 cursor-pointer">
          <div className="h-[150px] md:h-20 mb-2 p-4 w-full rounded-md shadow-sm shadow-yellow-500 text-lg font-semibold text-cyan-300">
            <h1 className="">{job.job.title}</h1>
            <div className="flex justify-between items-center">
              <h5 className="w-full text-sm text-yellow-500 lowercase">{JobTYPES[job.job.jobType]}</h5>
              <span>{STATUS_SVGs[job.job.jStatus].element}</span>
            </div>
          </div>
          <div className="w-full md: shadow-sm p-2 md:shadow-yellow-500 text-cyan-200">
            <div className="w-full mb-1 flex justify-between font-semibold">
              <h3>{"Date Posted: "}</h3>
              <p className="text-white">{job.job.datePosted.toString()}</p>
            </div>
            <div className="w-full mb-1 flex justify-between font-semibold">
              <h3>{"Due Date: "}</h3>
              <p className="text-white">{job.job.proposeEnd.toString()}</p>
            </div>
            <div className="w-full mb-1 flex justify-between  font-semibold">
              <h3>{"Project Link: "}</h3>
              <p className="text-white text-ellipsis">{job.job.jobRef}</p>
            </div>
            <div className="w-full mb-1 flex justify-between font-semibold">
              <h3>{"Creator: "}</h3>
              <p className="text-white">{job.job.hirer}</p>
            </div>
            <div className="w-full mb-1 flex justify-between font-semibold">
              <h3>{"Curator: "}</h3>
              <p className="text-white">{job.curator}</p>
            </div>
          </div>
          <div className="flex justify-end items-center gap-2">
            <button className="w-full bg-cyan-200 text-cyan-900 font-semibold p-4 hover:bg-cyan-300 ">Pick</button>
            <button className="w-full bg-green-500 text-white font-semibold p-4" >{ `$ ${formatEther(job.job.offerPrice)}` }</button>
          </div>
        </div>
      ))}
    </div>
  );
};

const STATUS_SVGs = Array.from([
  {
    id: 0,
    element: <span className="text-gray-500 font-semibold">
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M18 12H6" />
      </svg>
    </span>
  },
  {
    id: 1,
    element: <span className="text-cyan-600">
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 10.5V6.75a4.5 4.5 0 119 0v3.75M3.75 21.75h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H3.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
      </svg>
    </span>
  },
  {
    id: 2,
    element: <span className="text-blue-600">
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" />
      </svg>
    </span>
  },
  {
    id: 3,
    element: <span className="text-green-600">
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
      </svg>
    </span>
  },
  {
    id: 4,
    element: <span className="text-red-600">
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
      </svg>
    </span>
  }
]);

const JobTYPES = ["ONE-OFF", "PART-TIME", "FULL-TIME"];
