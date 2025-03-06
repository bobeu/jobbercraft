// import React from "react";
// import OnbaordScreen from "@/components/OnboardScreen";
// import { ANALYTICS, } from "@/constants";
// import Dashboard from "@/components/features/Dashboard";
// import FlexPool from "@/components/features/FlexPool";
// import Yield from "@/components/features/Yield";
// import Faq from "@/components/features/Faq";
// import SimpliDao from "@/components/features/SimpliDao";
// import { Path, TrxState, } from "@/customTypes";
// import { StorageContextProvider } from "@/components/StateContextProvider";
// import Notification from "@/components/Notification";
// import { MotionDivWrap } from "@/components/MotionDivWrap";
// import Sidebar from "@/components/Layout/Sidebar";
// import Navbar from "@/components/Layout/Navbar";
// import Footer from "@/components/Layout/Footer";
// import NotConnectedPopUp from "@/components/NotConnectedPopUp";
// import { useAccount, useReadContract,} from "wagmi";
// import Jobber from "@/components/apps/Jobber";
// import Hirer from "@/components/apps/Hirer";
// import getReadFunctions from "@/components/apps/readContractConfig";

// export default function SimpliApp() {
//   // const {data: blockNumber, } = useBlockNumber({watch: true, query: {refetchInterval: 3000}});
//   const [openPopUp, setPopUp] = React.useState<number>(0);
//   const [showSidebar, setShowSidebar] = React.useState(false);
//   const [message, setMessage] = React.useState<string>('');
//   const [activePath, setActivePath] = React.useState<Path>('onboard');
//   const [displayForm, setDisplayForm] = React.useState<boolean>(false);
    
//   const { isConnected, address, connector, isDisconnected, chainId } = useAccount();
//   const { readAllJobs} = getReadFunctions();
//   const { data, isPending } = useReadContract(
//     { ...getReadFunctions().readAllJobs()}
//   );


//   const { data, refetch } = useReadContracts({
//     contracts: [
//       {...readSymbolConfig()},
//       {...getFactoryDataConfig()}
//     ],
//     allowFailure: true,
//     query: {
//       refetchInterval: 4000, 
//       refetchOnReconnect: 'always', 
//     }
//   });
  
//   const closeDisplayForm = () => setDisplayForm(false);
//   const openDisplayForm = () => setDisplayForm(true);
//   const setActivepath = (arg: Path) => setActivePath(arg);
//   const togglePopUp = (arg: number) => setPopUp(arg);
//   const setmessage = (arg: string) => setMessage(arg);
//   const toggleSidebar = (arg: boolean) => setShowSidebar(arg);
//   const setstorage = (arg: TrxState) => {
//     if(arg.message) setMessage(arg.message);
//     refetch();
//   };

//   const displayScreen = () => {
//     const children = (
//       <div className='appContainer'>
//         <Navbar />
//         <Sidebar />
//         <main className='md:pl-4 md:py-[26px] md:pr-[22px] space-y-4 relative'>
//           {/* <MotionDivWrap className="flex justify-center items-center">
//             <Typed 
//               strings={['Warning! This is testnet version', 'Warning! Coins and/or Tokens used are not real', 'Warning! Do not send or use real token']}
//               className='fixed top-16 z-50 md:hidden text-red-400 font-extrabold px-4 py-1 text-center text-xs'
//               typeSpeed={100} backSpeed={100} loop showCursor={false}              
//             />    
//           </MotionDivWrap> */}
//           <MotionDivWrap className={`minHeight md:rounded-[56px] px-4 py-6 md:py-10 bg-gray1 relative`} >
//             {
//               CHILDREN.filter(({path}) => path === activePath).at(0)?.element
//             }
//           </MotionDivWrap>
//           <Footer />
//         </main>
//       <NotConnectedPopUp toggleDrawer={togglePopUp} openDrawer={openPopUp} />
//     </div>
//     );
//     return (
//       activePath === 'onboard'? <OnbaordScreen /> : children
//     );
//     // return <OnbaordScreen />
//   };

//   React.useEffect(() => {
//     if(!isConnected) {
//       openPopUp && setTimeout(() => {
//         setPopUp(0);
//       }, 6000);
//       clearTimeout(6000);
//     } else {
//       refetch();
//     }

//   }, [isConnected, address, connector, isDisconnected, openPopUp]);
 
//   return (
    // <StorageContextProvider 
    // value={
    //   {
    //     setstorage,
    //     displayForm,
    //     closeDisplayForm,
    //     openDisplayForm,
    //     message,
    //     toggleSidebar,
    //     showSidebar,
    //     setmessage,
    //     openPopUp,
    //     activePath,
    //     setActivepath,
    //     togglePopUp,
    //   }}
    // >
    //   <div >
    //     { displayScreen() }
    //   </div>
    //   <Notification message={message} resetMessage={() => setmessage('')} />
    // </StorageContextProvider>
//   );
// }


// const CHILDREN : {path: Path, element: JSX.Element}[] = [
//   {
//     path: 'jobber',
//     element: ( <Jobber /> ), 
//   },
//   {
//     path: 'hirer',
//     element: ( <Hirer /> ), 
//   },
// ];






// "use client";
import React from "react";
import App from "@/components/App";
import Suspense from "@/components/common/Suspense";
import LoadingContent from "@/components/common/LoadingContent";
import LoadingModal from "@/components/common/LoadingModal";
import useLoadingModal from "@/components/hooks/useLoadingModal";
import LoadingIndicator from "@/components/common/LoadingIndicator";
import { StorageContextProvider } from "@/components/StateContextProvider";

export default function Home() {
  const [myBestPrice, setPreferredOffer] = React.useState<string>('0');
  const [proposedCompletionDate, setCompletionTime] = React.useState<string>('0');
  const [message, setMessage] = React.useState<string>('');
  const [displayForm, setDisplayForm] = React.useState<boolean>(false);
  const { isLoadingModal } = useLoadingModal();

  const setmessage = (arg: string) => setMessage(arg);
  const closeDisplayForm = () => setDisplayForm(false);
  const openDisplayForm = () => setDisplayForm(true);
  const setPreferredoffer = (arg: string) => setPreferredOffer(arg); 
  const setProposedCompletiondate = (arg: string) => setCompletionTime(arg);

  return (
    <StorageContextProvider
      value={{
        message,
        setmessage,
        displayForm,
        closeDisplayForm,
        openDisplayForm,
        myBestPrice,
        setPreferredoffer,
        proposedCompletionDate,
        setProposedCompletiondate
      }}
    >
      <LoadingContent>
        <Suspense>
          <App />
        </Suspense>
      </LoadingContent>
      <LoadingModal open={isLoadingModal}><LoadingIndicator /></LoadingModal>
    </StorageContextProvider>
  );
}
