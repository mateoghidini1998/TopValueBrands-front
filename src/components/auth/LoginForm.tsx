"use client";
import { useRouter } from "next/navigation";
import { yupResolver } from "@hookform/resolvers/yup";
import { FormProvider, useForm } from "react-hook-form";
import SubmitButton from "../form/SubmitButton";
import LoginScheme from "@/schemes/login.scheme";
import InputText from "../form/InputText";
import useAuthContext from "@/contexts/auth.context";
import { useEffect } from "react";

type FormData = {
  email: string;
  password: string;
};

const LoginForm = () => {
  const { loading, authToken, user } = useAuthContext();
  const router = useRouter();
  const methods = useForm<FormData>({
    resolver: yupResolver(LoginScheme),
  });
  const { handleSubmit } = methods;
  const { login } = useAuthContext();

  //Create the use effect to avoid an infinite loop
  useEffect(() => {
    if (authToken) {
      router.push("/");
      router.refresh();
    }
  }, [authToken, router]);

  const onSubmit = async (data: FormData) => {
    try {
      await login(data.email, data.password);
      if (user && user.role === "admin") {
        router.push("/");
      } else if (user && user.role !== "admin") {
        router.push("/pogenerator/create");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="w-[400px] h-[465px] px-8 py-12 flex flex-col rounded-[15px] bg-white dark:bg-dark-2 shadow-[0px_24px_48px_0px_rgba(0,0,0,0.08)] dark:shadow-[0px_1px_1px_0_rgba(18,18,18,0.1)] caret-[#438EF3]">
      <div className="flex items-center mb-9">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="27"
          height="18"
          viewBox="0 0 27 18"
          fill="none"
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M15.7446 11.6814C15.6256 11.8515 15.4911 12.011 15.3411 12.1599L11.516 16.0913C10.7091 16.9207 9.64616 17.3992 8.51337 17.4391C8.4513 17.4444 8.39181 17.447 8.33492 17.447C7.12454 17.447 5.99951 16.9686 5.14604 16.0913L3.63307 14.5363L1.32094 12.1599C-0.440313 10.3497 -0.440313 7.415 1.32094 5.60477L5.14604 1.67331C5.99951 0.804076 7.12454 0.317627 8.33492 0.317627C9.53753 0.317627 10.6703 0.804076 11.516 1.67331L15.3411 5.60477C16.955 7.26349 17.0869 9.87118 15.7446 11.6814ZM12.9126 9.44055C13.1764 9.06574 13.1454 8.53942 12.8118 8.20449L8.98666 4.27302C8.80821 4.0896 8.56768 3.99391 8.33492 3.99391C8.09439 3.99391 7.85387 4.0896 7.67542 4.27302L3.85032 8.20449C3.48565 8.57929 3.48565 9.18536 3.85032 9.56017L5.53398 11.2986L7.67542 13.4916C7.76076 13.5794 7.85387 13.6511 7.96249 13.691C8.07888 13.7468 8.20302 13.7707 8.32716 13.7707C8.32716 13.7707 8.32974 13.7707 8.33492 13.7707C8.35561 13.7707 8.3763 13.7707 8.39699 13.7707C8.40733 13.7707 8.42026 13.7681 8.43578 13.7628C8.46164 13.7628 8.48751 13.7601 8.51337 13.7548C8.52372 13.7495 8.53406 13.7468 8.5444 13.7468C8.55475 13.7415 8.56251 13.7388 8.56768 13.7388C8.5832 13.7388 8.59872 13.7335 8.61423 13.7229C8.61941 13.7229 8.62458 13.7229 8.62975 13.7229C8.63492 13.7176 8.63751 13.7149 8.63751 13.7149C8.64786 13.7149 8.65561 13.7123 8.66079 13.707C8.6763 13.7016 8.68924 13.6963 8.69958 13.691C8.72027 13.6857 8.73838 13.6777 8.75389 13.6671C8.76424 13.6618 8.77458 13.6564 8.78493 13.6511C8.80562 13.6405 8.82372 13.6272 8.83924 13.6113C8.89614 13.5794 8.94528 13.5395 8.98666 13.4916L12.8118 9.56017C12.8531 9.52295 12.8868 9.48308 12.9126 9.44055Z"
            fill="#0059D0"
          />
          <path
            d="M15.7445 11.6815C15.6255 11.8516 15.491 12.0111 15.341 12.1599L11.5159 16.0914C10.709 16.9208 9.64607 17.3992 8.51328 17.4391C8.45121 17.4444 8.39172 17.4471 8.33483 17.4471C7.12445 17.4471 5.99942 16.9686 5.14595 16.0914L3.63298 14.5364C4.1373 13.5475 4.77353 12.455 5.53389 11.2987L7.67533 13.4917C7.76067 13.5794 7.85378 13.6512 7.9624 13.6911C8.07879 13.7469 8.20293 13.7708 8.32707 13.7708C8.32707 13.7708 8.32965 13.7708 8.33483 13.7708C8.35552 13.7708 8.37621 13.7708 8.3969 13.7708C8.40724 13.7708 8.42017 13.7681 8.43569 13.7628C8.46155 13.7575 8.48742 13.7549 8.51328 13.7549C8.52362 13.7495 8.53397 13.7469 8.54431 13.7469C8.55466 13.7416 8.56242 13.7389 8.56759 13.7389C8.58311 13.7389 8.59863 13.7336 8.61414 13.723C8.61932 13.723 8.62449 13.723 8.62966 13.723C8.63483 13.7176 8.63742 13.715 8.63742 13.715C8.64777 13.715 8.65552 13.7123 8.6607 13.707C8.67621 13.7017 8.68915 13.6964 8.69949 13.6911C8.72018 13.6857 8.73829 13.6778 8.7538 13.6671C8.76415 13.6618 8.77449 13.6565 8.78484 13.6512C8.80553 13.6406 8.82363 13.6273 8.83915 13.6113C8.89605 13.5794 8.94519 13.5395 8.98657 13.4917L12.8117 9.56023C12.853 9.52302 12.8867 9.48314 12.9125 9.44061L13.6729 9.56023L15.7445 11.6815Z"
            fill="#0059D0"
          />
          <path
            d="M25.1716 5.60477L21.3465 1.67331C20.493 0.804076 19.368 0.317627 18.1576 0.317627C16.955 0.317627 15.83 0.804076 14.9765 1.67331L13.2463 3.45164L15.3412 5.60477C15.4912 5.75895 15.6257 5.91844 15.7446 6.08325L17.5059 4.27302C17.6843 4.0896 17.9249 3.99391 18.1576 3.99391C18.3982 3.99391 18.6387 4.0896 18.8171 4.27302L22.6422 8.20449C23.0069 8.57929 23.0069 9.18536 22.6422 9.56017L18.8171 13.4916C18.6387 13.6751 18.3982 13.7707 18.1576 13.7707C17.9249 13.7707 17.6843 13.6751 17.5059 13.4916L15.7446 11.6894C15.7446 11.6841 15.7446 11.6814 15.7446 11.6814L13.6808 9.56017C13.4868 9.36878 13.4015 9.11359 13.4092 8.8584C13.2385 8.67499 13.0756 8.49955 12.9127 8.32411C12.8816 8.28158 12.848 8.2417 12.8118 8.20449L12.3385 7.71804C12.323 7.70209 12.3075 7.68614 12.292 7.67019C11.4307 6.76109 10.748 6.08325 10.748 6.08325C10.1505 6.88071 9.83241 7.86158 9.83241 8.88233C9.83241 9.91105 10.1505 10.8839 10.748 11.6814C10.8721 11.8515 11.0066 12.011 11.1514 12.1599L14.0067 15.0945L14.9765 16.0913C15.83 16.9686 16.955 17.447 18.1576 17.447C19.368 17.447 20.493 16.9686 21.3465 16.0913L25.1716 12.1599C26.9329 10.3497 26.9329 7.415 25.1716 5.60477Z"
            fill="white"
          />
        </svg>
        <h4 className="font-bold text-[16px] ml-0.5 dark:text-white">
          Top Value Brands
        </h4>
      </div>
      <div className="flex flex-col mb-10">
        <p className="dark:text-white text-xl font-medium mb-0.5">
          Log in into your account
        </p>
        <span className="text-[#808191]">to continue to Top Value Brands</span>
      </div>
      <FormProvider {...methods}>
        <form action="" onSubmit={handleSubmit(onSubmit)}>
          <div className="flex flex-col w-full mb-9">
            <div className="flex flex-col mb-5">
              <InputText label={"Email"} fieldName={"email"} type="text" />
            </div>
            <div className="flex flex-col">
              <InputText
                label={"Contraseña"}
                fieldName={"password"}
                type="password"
              />
            </div>
          </div>
          <SubmitButton
            label={"CONTINUE"}
            onSubmit={onSubmit}
            loading={loading}
          />
        </form>
      </FormProvider>
    </div>
  );
};

export default LoginForm;
