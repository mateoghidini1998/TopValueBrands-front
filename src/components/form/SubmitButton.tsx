"use client"
import { FieldValues, useFormContext } from "react-hook-form";

type SubmitButtonProps<T extends FieldValues> = {
    styles?: string;
    label: string;
    onSubmit: (data: T) => void;
}

const SubmitButton = <T extends FieldValues,>({ label, styles, onSubmit }: SubmitButtonProps<T>) => {
    const { handleSubmit} = useFormContext<T>();

    return (
            <button 
            onClick={handleSubmit(onSubmit)}
            className="w-full p-2 rounded-md bg-[#438EF3] text-[14px] text-white">{label}
            </button>
    )
}

export default SubmitButton;