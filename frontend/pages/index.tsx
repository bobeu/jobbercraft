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
