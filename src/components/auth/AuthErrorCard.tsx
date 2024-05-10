"use client"
import Globe from "../svgs/Globe"

interface AuthErrorCardProps {
    errorMessage: string;
   }

export const AuthErrorCard = ({ errorMessage }: AuthErrorCardProps) => {

    if(!errorMessage) return null;

    return (
        <div className="flex items-start w-[400px] p-4 bg-[#ff4c3f26] gap-3 mb-6 rounded-[5px]">
            <Globe/>
            <div className="flex flex-col w-full h-full">
                <p className="text-white text-sm font-bold">Oops! There was and error when trying to login</p>
                <span className="text-xs text-[#E79F9F]">{errorMessage}</span>
            </div>
        </div>
    )
}