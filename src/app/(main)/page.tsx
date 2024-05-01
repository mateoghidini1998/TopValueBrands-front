import SearchInput from "@/components/inventory/SearchInput";

export default function Home() {
  return (
    <main className="flex w-full min-h-screen flex-col items-center">
      <div className="px-4 py-5 w-full mb-10">
        <div className="w-full flex justify-between">
            <h4 className="text-white text-base font-bold leading-6">Inventory Management</h4>
            <div className="flex items-center">
              <SearchInput/>
              <p className="text-white text-xs ml-[23px]">Username</p>
            </div>
        </div>
      </div>
      <table className="w-full ">
        <tr className="py-6 stroke-1 stroke-[#393E4F] flex items-center h-[60px] w-full text-white bg-[#262935]">
          <th className="w-[10%] text-xs font-medium text-center">Product</th>
          <th className="w-[10%] text-xs font-medium text-center">ASIN</th>
          <th className="w-[10%] text-xs font-medium text-center">Amazon SKU</th>
          <th className="w-[10%] text-xs font-medium text-center">Cost</th>
          <th className="w-[10%] text-xs font-medium text-center">Supplier name</th>
          <th className="w-[10%] text-xs font-medium text-center">Supplier item No</th>
          <th className="w-[10%] text-xs font-medium text-center">Pack type</th>
          <th className="w-[10%] text-xs font-medium text-center">FBA Stock</th>
          <th className="w-[10%] text-xs font-medium text-center">Inbound to FBA</th>
          <th className="w-[10%] text-xs font-medium text-center">Reserved quantity</th>
        </tr>
        <tr className="py-6 stroke-1 stroke-[#393E4F] flex items-center h-[60px] w-full text-white bg-transparent border-b border-b-[#393E4F]">
          <td className="w-[10%] text-xs font-medium text-center">Imagen</td>
          <td className="w-[10%] text-xs font-medium text-center">B00QCVC1DP</td>
          <td className="w-[10%] text-xs font-medium text-center">BTSPK-001-BLK-STD     </td>
          <td className="w-[10%] text-xs font-medium text-center">$1.48</td>
          <td className="w-[10%] text-xs font-medium text-center">Supplier name</td>
          <td className="w-[10%] text-xs font-medium text-center">010145</td>
          <td className="w-[10%] text-xs font-medium text-center">2</td>
          <td className="w-[10%] text-xs font-medium text-center">140</td>
          <td className="w-[10%] text-xs font-medium text-center">3</td>
          <td className="w-[10%] text-xs font-medium text-center">15</td>
        </tr>
        <tr className="py-6 stroke-1 stroke-[#393E4F] flex items-center h-[60px] w-full text-white bg-transparent border-b border-b-[#393E4F]">
          <td className="w-[10%] text-xs font-medium text-center">Imagen</td>
          <td className="w-[10%] text-xs font-medium text-center">B00QCVC1DP</td>
          <td className="w-[10%] text-xs font-medium text-center">BTSPK-001-BLK-STD     </td>
          <td className="w-[10%] text-xs font-medium text-center">$1.48</td>
          <td className="w-[10%] text-xs font-medium text-center">Supplier name</td>
          <td className="w-[10%] text-xs font-medium text-center">010145</td>
          <td className="w-[10%] text-xs font-medium text-center">2</td>
          <td className="w-[10%] text-xs font-medium text-center">140</td>
          <td className="w-[10%] text-xs font-medium text-center">3</td>
          <td className="w-[10%] text-xs font-medium text-center">15</td>
        </tr>
        <tr className="py-6 stroke-1 stroke-[#393E4F] flex items-center h-[60px] w-full text-white bg-transparent border-b border-b-[#393E4F]">
          <td className="w-[10%] text-xs font-medium text-center">Imagen</td>
          <td className="w-[10%] text-xs font-medium text-center">B00QCVC1DP</td>
          <td className="w-[10%] text-xs font-medium text-center">BTSPK-001-BLK-STD     </td>
          <td className="w-[10%] text-xs font-medium text-center">$1.48</td>
          <td className="w-[10%] text-xs font-medium text-center">Supplier name</td>
          <td className="w-[10%] text-xs font-medium text-center">010145</td>
          <td className="w-[10%] text-xs font-medium text-center">2</td>
          <td className="w-[10%] text-xs font-medium text-center">140</td>
          <td className="w-[10%] text-xs font-medium text-center">3</td>
          <td className="w-[10%] text-xs font-medium text-center">15</td>
        </tr>
      </table>
    </main>
  );
}
