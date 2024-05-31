"use client";
import { useUsersContext } from "@/contexts/users.context";
import {
  FormProvider,
  Resolver,
  useForm,
  useFormContext,
} from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import InputText from "../form/InputText";
import RegisterScheme from "@/schemes/register.scheme";
import SubmitButton from "../form/SubmitButton";
import CloseButton from "../svgs/CloseButton";
import { UserRole } from "@/types/user.types";
import { RegisterErrorCard } from "./RegisterErrorCard";
import { useEffect } from "react";

type FormData = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
  role: UserRole;
};

const RegisterForm = ({
  title,
  isOpen,
  onClose,
  onSubmit,
  errorMessage,
  buttonName,
}: {
  title: string;
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: FormData) => void;
  errorMessage?: string | null;
  buttonName: string;
}) => {
  const methods = useForm<FormData>({
    resolver: yupResolver(RegisterScheme) as unknown as Resolver<FormData>,
  });

  const { handleSubmit, reset } = methods;
  const { editingUser } = useUsersContext();

  const DEFAULT_ROLE: UserRole = UserRole.USER;

  useEffect(() => {
    if (isOpen) {
      reset({
        id: editingUser?.id || "",
        firstName: editingUser?.firstName || "",
        lastName: editingUser?.lastName || "",
        email: editingUser?.email || "",
        role: editingUser?.role || DEFAULT_ROLE,
        password: "",
        confirmPassword: "",
      });
    }
  }, [isOpen, editingUser, reset, DEFAULT_ROLE]);

  if (!isOpen) return null;

  return (
    <>
      <dialog
        open
        className="h-[95%] w-[450px] dark:shadow-[0_0_50px_0_rgba(0,0,0,0.2)] rounded-2xl py-12 px-14 dark:bg-dark fixed z-[2000] inset-0 overflow-y-auto bg-[#FFFFFF] shadow-[0_0_50px_0_rgba(0,0,0,0.2)] no-scrollbar"
        aria-labelledby="modal-title"
        role="dialog"
        aria-modal="true"
      >
        {errorMessage && <RegisterErrorCard errorMessage={errorMessage} />}
        <div className="w-full flex items-center justify-between mb-8">
          <h3 className="text-xl dark:text-white font-medium">{title}</h3>
          <button onClick={onClose}>
            <CloseButton />
          </button>
        </div>
        <FormProvider {...methods}>
          <form action="" onSubmit={handleSubmit(onSubmit)}>
            <div className="flex flex-col mb-5">
              <InputText label="Name" fieldName="firstName" type="text" />
            </div>
            <div className="flex flex-col mb-5">
              <InputText label="Last Name" fieldName="lastName" type="text" />
            </div>
            <div className="flex flex-col mb-5">
              <InputText label="Email" fieldName="email" type="text" />
            </div>
            <div className="flex flex-col mb-5">
              <InputText label="Role" fieldName="role" type="text" isDropdown />
            </div>

            <div className="flex flex-col mb-5">
              <InputText
                label="Password"
                fieldName="password"
                type="password"
              />
            </div>
            <div className="flex flex-col mb-5">
              <InputText
                label="Confirm Password"
                fieldName="confirmPassword"
                type="password"
              />
            </div>
            <SubmitButton label={buttonName} onSubmit={onSubmit} />
            <button
              className="text-[#61656E] dark:text-[#f8fafc] dark:bg-[#393E4F] bg-[#F8FAFC] border-[#eff1f3] flex justify-center w-full items-center gap-2 px-4 py-2 text-sm dark:hover:bg-dark-3 border-2 dark:border-[#393E4F] rounded-md mt-6"
              onClick={() => {
                reset();
                onClose();
              }}
            >
              Discard
            </button>
          </form>
        </FormProvider>
      </dialog>
      <div className="fixed top-0 right-0 w-full h-full bg-opacity-50 backdrop-filter backdrop-blur-md flex justify-center items-center z-[1100]"></div>
    </>
  );
};

export default RegisterForm;
