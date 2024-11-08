import classNames from "classnames";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

type CustomAlertDialogProps = {
  text: string;
  message?: string;
  description?: string;
  cancelText?: string;
  confirmText?: string;
  confirmAction: () => void;
};
const CustomAlertDialog = ({
  text,
  message = "Are you absolutely sure?",
  description = "This action cannot be undone.",
  cancelText = "Cancel",
  confirmText = "Continue",
  confirmAction = () => {
    console.log("missing implementation of the confirm action");
  },
}: CustomAlertDialogProps) => {
  return (
    <AlertDialog>
      <AlertDialogTrigger className="text-sm px-2 py-1 w-full text-left hover:bg-dark rounded-sm mt-2">
        {text}
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{message}</AlertDialogTitle>
          <AlertDialogDescription>{description}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>{cancelText}</AlertDialogCancel>
          <AlertDialogAction onClick={confirmAction}>
            {confirmText}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default CustomAlertDialog;
