import { UserType } from "@/types/user.types";
import DotsSVG from "../svgs/DotsSVG";
import { useState } from "react";
import TableRowOptions from "../ui/TableRowOptions";
import { useUsersContext } from "@/contexts/users.context";

type TableRowProps = {
  users: UserType[];
};

export default function TableRow({ users }: TableRowProps) {
  // Mantén un estado separado para el indicador de mostrar opciones para cada usuario
  const [showOptionsMap, setShowOptionsMap] = useState<{ [key: string]: boolean }>({});
  const { deleteUser } = useUsersContext();

  const toggleOptions = (email: string) => {
    // Actualiza el estado para mostrar u ocultar las opciones del usuario específico
    setShowOptionsMap(prevState => ({
      ...prevState,
      [email]: !prevState[email] // Invierte el valor actual
    }));
  };

  const handleDelete = (id: number) => {
    console.log('Deleting user with id:', id);
    
    try {
      deleteUser(id);
    } catch (error) {
      console.log(error);
    }
  }
  

  const handleEdit = (email: string) => {
    // Aquí puedes hacer algo con el correo electrónico del usuario que se quiere editar
  }

  return (
    <>
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
                {showOptionsMap[user.email] && <TableRowOptions onEdit={handleEdit} onDelete={() => handleDelete(user.id)} />}
              </div>
            </td>
          </tr>
        ))}
    </>
  );
}
