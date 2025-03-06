import { VoidFunc } from "@/customTypes";

export interface DataContextProps {
    message: string;
    setmessage: (arg: string) => void;
    closeDisplayForm: VoidFunc;
    openDisplayForm: VoidFunc;
    displayForm: boolean;
    myBestPrice: string;
    setPreferredoffer: (arg: string) => void;
    proposedCompletionDate: string;
    setProposedCompletiondate: (arg: string) => void;
}
