type TooltipProps = {
  product_name: string;
};

export const Tooltip = ({ product_name }: TooltipProps) => {
  return (
    <div className="absolute z-50  h-[20px] p-0 hover:p-6 rounded-sm bg-transparent text-transparent top-10 left-5 w-11/12 hover:h-auto hover:bg-[#393E4F] hover:text-white">
      <p>{product_name}</p>
    </div>
  );
};
