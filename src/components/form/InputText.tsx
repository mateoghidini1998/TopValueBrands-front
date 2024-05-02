import { useFormContext } from "react-hook-form";

type InputTextProps = {
    styles?: string;
    fieldName: string;
    label: string;
    placeholder?: string;
    type: 'text' | 'password'
}

const InputText = ({ label, styles, fieldName, type,  placeholder }: InputTextProps) => {
    const { register, formState: { errors } } = useFormContext();
    return (
        <>
            <label className="text-[#808191] text-sm mb-2" htmlFor="">{label}:</label>
            <input
            {...register(fieldName)} 
            placeholder={placeholder} 
            type={type}
            className="p-2.5 bg-[#1F2128] shrink rounded-md text-white focus:outline-none"
            />
            {errors && errors[fieldName] && <div className="text-xs text-red-600">This field is required</div>}
        </>
    )
}

export default InputText;