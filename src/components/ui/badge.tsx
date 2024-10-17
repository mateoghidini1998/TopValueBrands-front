import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";

import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "h-[32px] min-w-[80px] w-fit py-2 bg-opacity-10 rounded cursor-pointer text-center text-xs font-bold",
  {
    variants: {
      variant: {
        // Defaults
        default: "",

        // Order Statuses
        pending: "bg-[#C26900] text-[#C26900]",
        good_to_go: "bg-[#00952A] text-[#00952A]",
        rejected: "bg-[#ef4444] text-[#ef4444]",
        cancelled: "bg-[#FF4C3F] text-[#FF4C3F]",
        in_transit: "bg-[#C26900] text-[#C26900]",
        arrived: "bg-[#00952A] text-[#00952A]",
        waiting_for_supplier_approval: "bg-[#FFC107] text-[#FFC107]",
        closed: "bg-[#0059D0] text-[#0059D0]",

        // Transaction Statuses
        success: "bg-[#00952A] text-[#00952A]",
        warning: "bg-[#C26900] text-[#C26900]",
        danger: "bg-[#ef4444] text-[#ef4444]",
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
