import React from "react";
import { Interview } from "@/components/assets";
import { useNavigate } from "react-router-dom";

export default function HomeHeader() {
  const navigate = useNavigate();

  return (
    <header className="relative bg-[url('/interview.svg')] md:bg-[url('/svg-decorator-blob-3.svg')]  bg-no-repeat bg-blend-color-burn bg-bottom bg-green1 p-4">
      <div className="mx-auto w-full min-h-screen relative flex justify-center items-center">
        <div className="container grid grid-cols-1 md:grid-cols-2 items-end py-5 md:flex-row flex-col z-10">
          <div className=" flex flex-col h-full justify-center md:items-start items-center">
            <h1 className="text-3xl md:text-6xl leading-snug max-w-3xl text-white font-extrabold">
              Create jobs, hire, freelance, and make payment conveniently on the <span className="text-cyan-600">Blockchain</span> 
            </h1>
            <h3 className="my-5 lg:my-8 text-sm lg:text-base font-medium text-white max-w-lg mx-auto lg:mx-0">Experience the flexibility in creating jobs, hiring professonals and making hazzle-free payments on the <span className="uppercase font-extrabold">Blockchain</span>. Freelance, monetize your ideas, and get paid in an instant.</h3>

            <div className="w-full flex gap-4 justify-center md:justify-start mt-8 cursor-pointer">
              <button 
                className="w-full flex justify-between items-center gap-2 rounded-lg p-4  border border-gray1 text-cyan-200 font-semibold hover:text-cyan-600"
                onClick={() => {
                  navigate('appmain', {preventScrollReset: true, replace: true, });
                }
              }
              >
                <>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12.75 15l3-3m0 0l-3-3m3 3h-7.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </>
                <h3 className="text-md">Job Creator</h3>
              </button>
              <div
                className="w-full flex justify-between items-center gap-2 bg-cyan-300 rounded p-2 text-gray-500h-14 font-semibold hover:bg-yellow-300"
                onClick={() => navigate('becomeajobber', {preventScrollReset: true, replace: true, })}
              >
                <>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" d="M15.75 10.5l4.72-4.72a.75.75 0 011.28.53v11.38a.75.75 0 01-1.28.53l-4.72-4.72M4.5 18.75h9a2.25 2.25 0 002.25-2.25v-9a2.25 2.25 0 00-2.25-2.25h-9A2.25 2.25 0 002.25 7.5v9a2.25 2.25 0 002.25 2.25z" />
                  </svg>
                </>
                <h3 className="">{'Signup'}</h3>
              </div>
                {/* #4A5F90 */}
            </div>
          </div>
          <div className="justify-end hidden md:flex relative">
            <Interview height="550" width="550"/>
          </div>
        </div>
      </div>
    </header>
  );
}
