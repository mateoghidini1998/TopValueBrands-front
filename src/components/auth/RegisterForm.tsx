import { useUsersContext } from "@/contexts/users.context";
import { FormProvider, Resolver, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import InputText from "../form/InputText";
import RegisterScheme from "@/schemes/register.scheme";
import SubmitButton from "../form/SubmitButton";
import CloseButton from "../svgs/CloseButton";
import { UserRole } from "@/types/user.types";
import { RegisterErrorCard } from "./RegisterErrorCard";

type FormData = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
  role: UserRole;
};

const RegisterForm = ({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) => {
  const { addUser, registerError } = useUsersContext();

  const methods = useForm<FormData>({
    resolver: yupResolver(RegisterScheme) as unknown as Resolver<FormData>,
  });

  const { handleSubmit } = methods;

  const onSubmit = (data: FormData) => {
    try {
      addUser(data).then((response) => {
        if (response.success) {
          onClose();
        }
      });
    } catch (error) {
      console.error(error);
    }
  };

  if (!isOpen) return null;

  return (
    <>
      <dialog
        open
        className="min-w-[400px] max-w-[700px] shadow-[0_0_50px_0_rgba(0,0,0,0.2)] rounded-2xl py-12 px-14 bg-[#262935] fixed z-[2000] inset-0 overflow-y-auto"
        aria-labelledby="modal-title"
        role="dialog"
        aria-modal="true"
      >
        {registerError && <RegisterErrorCard errorMessage={registerError} />}
        <div className="w-full flex items-center justify-between mb-8">
          <h3 className="text-xl text-white font-medium">Create new User</h3>
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
            <SubmitButton label="Create" onSubmit={onSubmit} />
          </form>
        </FormProvider>
      </dialog>
      <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 backdrop-filter backdrop-blur-md flex justify-center items-center z-[1100]"></div>
    </>
  );
};

export default RegisterForm;
