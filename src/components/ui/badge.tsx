import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";

import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "h-[32px] min-w-[80px] w-fit py-2 bg-opacity-10 rounded cursor-pointer text-center",
  {
    variants: {
      variant: {
        default: "",
        pending: "bg-[#C26900] text-[#C26900]  border-transparent",
        good_to_go:
          "bg-[#00952A] text-[#00952A] border-transparent text-secondary-foreground",
        rejected: "bg-[#ef4444] text-[#ef4444]",
        cancelled: "bg-yellow-500 text-yellow-500 border-transparent ",
        in_transit: "bg-[#007BFF] text-[#007BFF] border-transparent ",
        arrived: "bg-[#28A745] text-[#28A745] border-transparent ",
        waiting_for_supplier_approval:
          "bg-[#FFC107] text-[#FFC107] border-transparent ",
        closed: "bg-[#6C757D] text-[#6C757D] border-transparent ",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  );
}

export { Badge, badgeVariants };
