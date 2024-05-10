enum AlertOptions{
  CONFIRM = "Yes",
  CANCEL = "No"
}

type ConfirmAlertProps = {
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
  confirmText?: AlertOptions;
  cancelText?: AlertOptions;
};

export const ConfirmAlert = ({ message, onConfirm, onCancel, confirmText = AlertOptions.CONFIRM, cancelText = AlertOptions.CANCEL }: ConfirmAlertProps) => {
  return (
    <div className="absolute top-50 left-50 w-[320px] h-[226px] bg-[#262935] z-[2000] flex flex-col items-center justify-center gap-6 px-[2rem] rounded-md">
      <p className="text-center">{message}</p>
      <div className="flex w-[90%] items-center justify-center gap-2 ">
        <button onClick={onConfirm} className="w-[100px] h-[40px] bg-[#438EF3] rounded-md ">{confirmText}</button>
        <button onClick={onCancel} className="w-[100px] h-[40px] bg-[#393E4F] rounded-md ">{cancelText}</button>  
      </div>
    </div>
  );
};
