import { useFormContext } from "react-hook-form";

type InputTextProps = {
  styles?: string;
  fieldName: string;
  isDropdown?: boolean;
  label: string;
  placeholder?: string;
  type: "text" | "password";
  userValue?: string;
};

const InputText = ({
  label,
  styles,
  fieldName,
  type,
  placeholder,
  isDropdown,
  userValue,
}: InputTextProps) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <>
      <label className="text-[#808191] text-sm mb-2" htmlFor={fieldName}>
        {label}:
      </label>

      {isDropdown ? (
        <select
          id={fieldName}
          {...register(fieldName)}
          className="border-solid border-[1px] border-[#C5D0E6] p-2.5 dark:text-white bg-white dark:bg-dark shrink rounded-md focus:border-[#438EF3] focus:outline-none focus:ring-0 dark:border-[#2A2D38] dark:focus:border-[#438EF3]"
        >
          <option className="" value="admin">
            Admin
          </option>
          <option className="" value="user">
            User
          </option>
        </select>
      ) : (
        <input
  autoComplete="off"
  id={fieldName}
  {...register(fieldName)}
  placeholder={placeholder}
  type={type}
  value={userValue}
  className="border-solid border-[1px] border-[#C5D0E6] p-2.5 dark:text-white bg-white dark:bg-dark shrink rounded-md focus:border-[#438EF3] focus:outline-none focus:ring-0 dark:border-[#2A2D38] dark:focus:border-[#438EF3]"
/>
      )}
      {errors && errors[fieldName] && (
        <div className="text-xs text-red-600">This field is required</div>
      )}
    </>
  );
};

export default InputText;
