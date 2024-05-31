type Props = {};
export const TableSkeleton = ({}: Props) => {
  return (
    <>
      <div className="h-screen w-screen flex gap-4">
        {/* sidebar */}
        <div className="h-screen w-[275px] bg-slate-100 dark:bg-[#1a1c20]"></div>

        {/* main content */}
        <div className="flex flex-col flex-1 h-screen gap-12">
          {/* header */}
          <div className="w-full h-[35px] bg-transparent py-10 px-[46px] flex justify-between items-center">
            <div className="w-[400px] h-[35px] rounded-lg bg-slate-100 dark:bg-[#1a1c20] "></div>

            <div className="flex items-center justify-between gap-4">
              <div className="w-[260px] h-[35px] bg-slate-100 dark:bg-[#1a1c20] rounded-lg"></div>
              <div className="w-[180px] h-[35px] bg-slate-100 dark:bg-[#1a1c20] rounded-lg"></div>
            </div>
          </div>

          {/* table */}
          <div className=" w-full px-10 gap-8 flex flex-col justify-between py-6">
            <div className="w-full h-[35px] rounded-lg bg-slate-100 dark:bg-[#1a1c20]"></div>
            <div className="w-full h-[450px] rounded-lg bg-slate-100 dark:bg-[#1a1c20]"></div>
          </div>
          
        </div>

        

      </div>
    </>
  );
};
