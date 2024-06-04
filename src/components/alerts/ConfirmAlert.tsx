import { forwardRef, useImperativeHandle, useRef } from 'react';
import CloseButton from "../svgs/CloseButton";
import useThemeContext from '@/contexts/theme.context';

export enum AlertOptions{
  CONFIRM = "Yes",
  CANCEL = "No"
}

type ConfirmAlertProps = {
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
  onClose: () => void;
  confirmText?: AlertOptions;
  cancelText?: AlertOptions;
};

const ConfirmAlert = forwardRef(function ConfirmAlert({ message, onConfirm, onCancel, onClose, confirmText = AlertOptions.CONFIRM, cancelText = AlertOptions.CANCEL }: ConfirmAlertProps, ref)  {
  const dialog = useRef<HTMLDialogElement>(null);
  useImperativeHandle(ref, () => ({
    open() {
      dialog.current?.showModal();
    }
  }));

  const { sidebarOpen } = useThemeContext();

  return (
    <>
        <dialog open ref={dialog} className={`${sidebarOpen ? "translate-x-[50%]" : ""} fixed top-[50%] left-0 translate-y-[-50%] w-[320px] h-[226px] dark:bg-[#262935] z-[2000] flex flex-col items-center justify-center gap-6 px-[2rem] rounded-md bg-white text-black dark:text-white`}>
          <span onClick={onClose} className="absolute top-2 right-2 cursor-pointer">
            <CloseButton/>
          </span>
          <p className="text-center text-black dark:text-white">{message}</p>
          <div className="flex w-[90%] items-center justify-center gap-2 ">
            <button onClick={onConfirm} className="text-white w-[100px] h-[40px] bg-[#438EF3] rounded-md ">{confirmText}</button>
            <button onClick={onCancel} className="dark:text-[#F8FAFC] text-[#61656E] w-[100px] h-[40px] bg-[#F8FAFC] dark:bg-[#393E4F] rounded-md font-700">{cancelText}</button>  
          </div>
        </dialog>
        <div className={`${sidebarOpen ? "w-[calc(100%-16rem)]" : "w-[calc(100%-3.75rem)]"}  fixed top-0 right-0 h-full bg-black bg-opacity-50 backdrop-filter backdrop-blur-md flex justify-center items-center z-[1100]`}></div>
    </>
  );
});

export default ConfirmAlert;