import { UserType } from "@/types/user.types";
import DotsSVG from "../svgs/DotsSVG";
import { useState } from "react";
import TableRowOptions from "../ui/TableRowOptions";
import { useUsersContext } from "@/contexts/users.context";
import ConfirmAlert from "../alerts/ConfirmAlert";

type TableRowProps = {
  users: UserType[];
};



export default function TableRow({ users }: TableRowProps) {
  // Mantén un estado separado para el indicador de mostrar opciones para cada usuario
  const [showOptionsMap, setShowOptionsMap] = useState<{ [key: string]: boolean }>({});
  const { deleteUser, setUpdateFormIsOpen, setEditingUser } = useUsersContext();
  const [showAlert, setShowAlert] = useState(false);

  const toggleOptions = (email: string) => {
    // Actualiza el estado para mostrar u ocultar las opciones del usuario específico
    setShowOptionsMap(prevState => ({
      [email]: !prevState[email] // Invierte el valor actual
    }));
  };
  const handleDelete = (email: string) => {
    console.log('Deleting user with id:', email);
    setShowAlert(true);
  }
  const deleteUserHandler = (email: string) => {
    try {
      deleteUser(email).then((result) => {
        console.log('Result:', result);
        if (result) {
          setShowAlert(false);
        }
      })
    } catch (error) {
      console.log(error);
    }
  }

  const handleEdit = (email: string) => {
    setUpdateFormIsOpen(true);
    const user = users.find((user) => user.email === email);
    if(!user) return
    setEditingUser(user);
  }
  

  return (
    <>
      {
        showAlert &&
        <ConfirmAlert
        message="Are you sure you want to delete this user?"
        onConfirm={() => deleteUserHandler(Object.keys(showOptionsMap)[0])}
        onCancel={() => setShowAlert(false)}
        onClose={() => setShowAlert(false)}        
      />}
      {Array.isArray(users) &&
        users.map((user) => (
          <tr key={user.email} className="relative py-6 stroke-1 stroke-[#393E4F] flex items-center h-[65px] w-full text-white bg-transparent border-b border-b-[#393E4F]">
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
                <button className="flex" onClick={() => toggleOptions(user.email)}><DotsSVG /></button>
                {/* Muestra las opciones solo si showOptionsMap[user.email] es true */}
                {showOptionsMap[user.email] && <TableRowOptions onEdit={() => handleEdit(Object.keys(showOptionsMap)[0])} onDelete={() => handleDelete(user.email)} />}
              </div>
            </td>
          </tr>
        ))}
    </>
  );
}
