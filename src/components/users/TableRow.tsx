import { UserType } from "@/types/user.types"
import DotsSVG from "../svgs/DotsSVG"

type TableRowProps = {
  users: UserType[]
}

export default function TableRow({ users }: TableRowProps) {
  return (
    <>
      {Array.isArray(users) &&
        users.map((user) => (
          <tr key={user.email} className="py-6 stroke-1 stroke-[#393E4F] flex items-center h-[65px] w-full text-white bg-transparent border-b border-b-[#393E4F]">
            <td className="w-[15%] text-xs font-medium text-center">
              {user.firstName} {user.lastName}
            </td>
            <td className="w-[15%] text-xs font-medium text-center">
            {user.email}
            </td>
            <td className="w-[60%] text-xs font-medium text-center">
            
            </td>
            <td className="w-[10%] text-xs font-medium text-center">
              <div className="flex items-center justify-between gap-2 px-2">
                {user.role}
                <button className="flex"><DotsSVG/></button>
              </div>
            </td>
          </tr>
        ))}
    </>
  )
}
