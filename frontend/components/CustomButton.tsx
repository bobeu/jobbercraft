import React from "react";

export const CustomButton: 
    React.FC<CustomButtonProps> = (
        {
            overrideClassName,
            handleButtonClick,
            disabled,
            children
        }
    ) => 
{
    return(
        <button 
            disabled={disabled}
            onClick={handleButtonClick}
            className={`py-3 px-2 uppercase flex justify-center items-center hover:shadow-sm hover:shadow-orange-200 focus:shadow-sm focus:shadow-200 ${overrideClassName}`}
        >
            { children }
        </button>
    )
}

interface CustomButtonProps {
    overrideClassName?: string;
    handleButtonClick: ()=> void;
    disabled: boolean;
    children: React.ReactNode;
}