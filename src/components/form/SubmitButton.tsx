"use client";
import { Loader2 } from "lucide-react";
import { FieldValues, useFormContext } from "react-hook-form";

type SubmitButtonProps<T extends FieldValues> = {
  loading?: boolean;
  styles?: string;
  label: string;
  onSubmit: (data: T) => void;
};
const SubmitButton = <T extends FieldValues>({
  label,
  styles,
  onSubmit,
  loading,
}: SubmitButtonProps<T>) => {
  const { handleSubmit } = useFormContext<T>();

  return (
    <button
      onClick={handleSubmit(onSubmit)}
      className={`w-full p-2 rounded-md bg-[#438EF3] text-[14px] text-white ${styles}`}
    >
      {loading ? (
        <span className="flex items-center justify-center">
          <Loader2 className="w-6 h-6 animate-spin" />
        </span>
      ) : (
        label
      )}
    </button>
  );
};

export default SubmitButton;
