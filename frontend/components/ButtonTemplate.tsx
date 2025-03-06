import { flexSpread, } from "@/constants";
import { CustomButton } from "./CustomButton";
import { VoidFunc } from "@/customTypes";
import React from "react";

export default function ButtonTemplate (
    {
        buttonAContent, 
        padContainer, 
        buttonBContent, 
        overrideClassName,
        disableButtonA,
        disableButtonB,
        buttonAFunc, 
        buttonBFunc,
        buttonAExtraClassName,
        buttonBExtraClassName
    } : ButtonTemplateProps) {
// !displayOnboardUser && 'hover:shadow-sm hover:shadow-orange-200 animate-none text-xs md:text-md uppercase'
// !displayOnboardUser && 'hover:shadow-sm hover:shadow-orange-200 text-xs md:text-md uppercase'

    return(
        <div className={`${flexSpread} ${padContainer} ${overrideClassName}`}>
            <CustomButton 
                disabled={disableButtonA}
                handleButtonClick={buttonAFunc} 
                overrideClassName={`bg-gray1 border border-green1 text-sm p-2 ${buttonAExtraClassName}`}
            >
                {buttonAContent}
            </CustomButton>

            <CustomButton 
                disabled={disableButtonB}
                handleButtonClick={buttonBFunc} 
                overrideClassName={`bg-green1 border border-gray1 text-sm p-2 ${buttonBExtraClassName}`} 
            >
                {buttonBContent}
            </CustomButton>
        </div>
    );
} 


interface ButtonTemplateProps {
    buttonAContent: React.ReactNode;
    buttonBContent: React.ReactNode;
    overrideClassName?: string;
    padContainer?: string;
    buttonAFunc: VoidFunc;
    buttonBFunc: VoidFunc;
    disableButtonA: boolean;
    disableButtonB: boolean;
    buttonAExtraClassName: string;
    buttonBExtraClassName: string;
}