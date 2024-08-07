"use client";
import { useUsersContext } from "@/contexts/users.context";
import AddUserBtn from "./AddUserBtn";
import TableRow from "./TableRow";
import { useEffect, useState } from "react";
import RegisterForm from "../auth/RegisterForm";
import { UserRole } from "@/types/user.types";
import ConfirmAlert from "../alerts/ConfirmAlert";
import CustomAlert, { CustomAlertOptions } from "../alerts/CustomAlerts";
import useThemeContext from "@/contexts/theme.context";

type FormData = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
  role: UserRole;
};

enum CustomAlertTheme {
  LIGHT = "light",
  DARK = "dark",
}

export default function Table() {
  const [isRegisterFormOpen, setRegisterFormIsOpen] = useState<boolean>(false);
  const {
    users,
    addUser,
    registerError,
    setRegisterError,
    updateUser,
    updateUserError,
    setUpdateUserError,
    isUpdateFormOpen,
    setUpdateFormIsOpen,
    setEditingUser,
  } = useUsersContext();
  const [showAlert, setShowAlert] = useState(false);
  const { theme } = useThemeContext();
  const [userToUpdate, setUserToUpdate] = useState<FormData>({
    id: "",
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: UserRole.USER,
  });

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

  const handleCreateUser = (data: FormData) => {
    try {
      addUser(data).then((result) => {
        if (result.success) {
          showCustomAlert(
            CustomAlertOptions.SUCCESS,
            "User created successfully",
            "The user has been created successfully.",
            true
          );
          setShowAlert(false);
          setRegisterFormIsOpen(false);
          setRegisterError(null);
        } else {
          setShowAlert(false);
          showCustomAlert(
            CustomAlertOptions.ERROR,
            "Error creating user",
            "An error occurred while creating the user.",
            true
          );
          setRegisterFormIsOpen(false);
          setRegisterError(null);
        }
      });
    } catch (error) {
      console.error(error);
    }
  };

  const handleUpdateUser = (data: FormData) => {
    setShowAlert(true);
    setUserToUpdate(data);
    setUpdateFormIsOpen(false);
  };

  const updateUserHandler = (data: FormData) => {
    try {
      updateUser(data).then((result) => {
        if (result.success) {
          showCustomAlert(
            CustomAlertOptions.SUCCESS,
            "User updated successfully",
            "The user has been updated successfully.",
            true
          );

          setShowAlert(false);
          setUpdateUserError(null);
          setEditingUser({
            id: "",
            firstName: "",
            lastName: "",
            email: "",
            role: UserRole.USER,
            password: "",
            confirmPassword: "",
          });
        } else {
          setShowAlert(false);
          showCustomAlert(
            CustomAlertOptions.ERROR,
            "Error updating user",
            result.message,
            true
          );

          setUpdateUserError(null);

          setEditingUser({
            id: "",
            firstName: "",
            lastName: "",
            email: "",
            role: UserRole.USER,
            password: "",
            confirmPassword: "",
          });
        }
      });
    } catch (error) {
      setShowAlert(false);
      showCustomAlert(
        CustomAlertOptions.ERROR,
        "Error updating user",
        (error as { message: string }).message,
        true
      );
      console.error(error);
    }
  };

  const handleModalRegisterFormOpen = () => {
    setRegisterFormIsOpen(true);
  };

  const handleModalCloseUpdateForm = () => {
    setUpdateFormIsOpen(false);
    setShowAlert(false);
    setEditingUser({
      id: "",
      firstName: "",
      lastName: "",
      email: "",
      role: UserRole.USER,
      password: "",
      confirmPassword: "",
    });
    setUpdateUserError(null);
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
  }, [updateUser, setCustomAlertProperties]);

  return (
    <>
      <CustomAlert
        theme={theme}
        message={customAlertProperties.message}
        description={customAlertProperties.description}
        type={customAlertProperties.type}
        visible={customAlertProperties.visible}
        closable={true}
        showIcon={true}
      />

      {showAlert && (
        <ConfirmAlert
          message="Are you sure you want to update this user?"
          onConfirm={() => updateUserHandler(userToUpdate)}
          onCancel={() => handleModalCloseUpdateForm()}
          onClose={() => handleModalCloseUpdateForm()}
        />
      )}
      <table className="w-full mb-5 rounded-[20px] border-[#EFF1F3] dark:border-[#393E4F] border-[1px] border-solid border-separate">
        <thead className="">
          <tr className="py-6 stroke-1 stroke-[#393E4F] flex items-center h-[60px] w-full text-black bg-[#F8FAFC] dark:text-white dark:bg-[#262935] border-t rounded-t-[20px] border-transparent">
            <th className="w-[15%] text-xs font-medium text-center">Name</th>
            <th className="w-[15%] text-xs font-medium text-center">Email</th>
            <th className="w-[60%] text-xs font-medium text-center"></th>
            <th className="w-[10%] text-xs font-medium text-center">
              <AddUserBtn onClick={() => handleModalRegisterFormOpen()} />
            </th>
          </tr>
        </thead>
        <tbody>
          <TableRow users={users} />
        </tbody>
      </table>

      <RegisterForm
        title={"Create new User"}
        isOpen={isRegisterFormOpen}
        onClose={() => {
          setRegisterFormIsOpen(false);
          setRegisterError(null);
        }}
        onSubmit={handleCreateUser}
        errorMessage={registerError}
        buttonName={"Create"}
      />
      <RegisterForm
        title={"Update User"}
        isOpen={isUpdateFormOpen}
        onClose={handleModalCloseUpdateForm}
        onSubmit={handleUpdateUser}
        errorMessage={updateUserError}
        buttonName={"Update"}
      />
    </>
  );
}
