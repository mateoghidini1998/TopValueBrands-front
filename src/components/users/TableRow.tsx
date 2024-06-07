import { UserType } from "@/types/user.types";
import DotsSVG from "../svgs/DotsSVG";
import { useEffect, useState } from "react";
import TableRowOptions from "../ui/TableRowOptions";
import { useUsersContext } from "@/contexts/users.context";
import ConfirmAlert from "../alerts/ConfirmAlert";
import CustomAlert, { CustomAlertOptions } from "../alerts/CustomAlerts";

type TableRowProps = {
  users: UserType[];
};

enum CustomAlertTheme {
  LIGHT = "light",
  DARK = "dark",
}

export default function TableRow({ users }: TableRowProps) {
  // Mantén un estado separado para el indicador de mostrar opciones para cada usuario
  const [showOptionsMap, setShowOptionsMap] = useState<{
    [key: string]: boolean;
  }>({});
  const { deleteUser, setUpdateFormIsOpen, setEditingUser } = useUsersContext();
  const [showAlert, setShowAlert] = useState(false);

  const [customAlertProperties, setCustomAlertProperties] = useState({
    show: false,
    type: CustomAlertOptions.SUCCESS,
    message: "",
    description: "",
    visible: false,
  });

  //Custom Alert
  const showCustomAlert = (
    alertType: CustomAlertOptions,
    message: string,
    description: string,
    visible: boolean
  ) => {
    setCustomAlertProperties({
      show: true,
      type: alertType,
      message,
      description,
      visible,
    });
  };

  useEffect(() => {
    // add 3 seconds delay
    const timer = setTimeout(() => {
      setCustomAlertProperties({
        show: false,
        type: CustomAlertOptions.SUCCESS,
        message: "",
        description: "",
        visible: false,
      });
    }, 3000);
    return () => clearTimeout(timer);
  }, [showAlert, setCustomAlertProperties]);

  const toggleOptions = (email: string) => {
    // Actualiza el estado para mostrar u ocultar las opciones del usuario específico
    setShowOptionsMap((prevState) => ({
      [email]: !prevState[email], // Invierte el valor actual
    }));
  };
  const handleDelete = (email: string) => {
    console.log("Deleting user with id:", email);
    setShowAlert(true);
  };
  const deleteUserHandler = (email: string) => {
    try {
      deleteUser(email).then((result) => {
        if (result.success) {
          showCustomAlert(
            CustomAlertOptions.SUCCESS,
            "User deleted successfully",
            "The user has been deleted successfully.",
            true
          );
          setShowAlert(false);
        } else {
          showCustomAlert(
            CustomAlertOptions.ERROR,
            "Error deleting user",
            result.message,
            true
          );
          setShowAlert(false);
        }
      });
    } catch (error) {
      setShowAlert(false);
      showCustomAlert(
        CustomAlertOptions.ERROR,
        "Error deleting User",
        "An error occurred while deleting the User.",
        true
      );
      console.log(error);
    }
  };

  const handleEdit = (email: string) => {
    setUpdateFormIsOpen(true);
    const user = users.find((user) => user.email === email);
    if (!user) return;
    setEditingUser(user);
  };

  return (
    <>
      <tr>
        <td>
          <CustomAlert
            theme={CustomAlertTheme.LIGHT}
            message={customAlertProperties.message}
            description={customAlertProperties.description}
            type={customAlertProperties.type}
            visible={customAlertProperties.visible}
            closable={true}
            showIcon={true}
          />
          {showAlert && (
            <ConfirmAlert
              message="Are you sure you want to delete this user?"
              onConfirm={() =>
                deleteUserHandler(Object.keys(showOptionsMap)[0])
              }
              onCancel={() => setShowAlert(false)}
              onClose={() => setShowAlert(false)}
            />
          )}
        </td>
      </tr>
      {Array.isArray(users) &&
        users.map((user, index) => (
          <tr
            key={user.email}
            className={`dark:bg-dark relative py-6 text-light stroke-1 dark:stroke-[#393E4F] flex items-center h-[65px] w-full dark:text-white bg-transparent border-t dark:border-t-[#393E4F] ${
              index === users.length - 1 ? "last-row" : ""
            } ${index === 0 && 'border-t-0'}`}
          >
            <td className="w-[15%] text-xs font-medium text-center">
              {user.firstName} {user.lastName}
            </td>
            <td className="w-[15%] text-xs font-medium text-center">
              {user.email}
            </td>
            <td className="w-[60%] text-xs font-medium text-center">
              {/* Cualquier contenido adicional de la fila */}
            </td>
            <td className="w-[10%] text-xs font-medium text-center">
              <div className="flex items-center justify-between gap-2 px-2">
                {user.role}
                {/* Usa la función toggleOptions para cambiar el estado */}
                <button
                  className="flex"
                  onClick={() => toggleOptions(user.email)}
                >
                  {!showOptionsMap[user.email] ? (
                    <DotsSVG stroke="#438EF3" />
                  ) : (
                    <button><DotsSVG stroke="#438EF3" /></button>
                  )}
                </button>
                {/* Muestra las opciones solo si showOptionsMap[user.email] es true */}
                {showOptionsMap[user.email] && (
                  <TableRowOptions
                    onClose={() => toggleOptions(user.email)}
                    onEdit={() => handleEdit(Object.keys(showOptionsMap)[0])}
                    onDelete={() => handleDelete(user.email)}
                  />
                )}
              </div>
            </td>
          </tr>
        ))}
    </>
  );
}
