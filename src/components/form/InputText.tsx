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
          className="border-2 border-[#808191] p-2.5 bg-white text-[#808191] dark:bg-dark shrink rounded-md  focus:outline-none"
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
          autoComplete={"off"}
          id={fieldName}
          {...register(fieldName)}
          placeholder={placeholder}
          type={type}
          value={userValue}
          className="border-2 b-[#808191] p-2.5 dark:text-white bg-white dark:bg-dark shrink rounded-md focus:outline-none"
        />
      )}
      {errors && errors[fieldName] && (
        <div className="text-xs text-red-600">This field is required</div>
      )}
    </>
  );
};

export default InputText;
