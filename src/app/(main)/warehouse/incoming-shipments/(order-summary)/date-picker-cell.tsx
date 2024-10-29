"use client";

import * as React from "react";
import { CalendarIcon } from "@radix-ui/react-icons";
import { addDays, format, parseISO } from "date-fns";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useOrdersContext } from "@/contexts/orders.context";

type DatePickerCellProps = {
  value?: Date;
  onChange?: (value: string) => void;
  row: any;
};

export function DatePickerCell({ row, onChange }: DatePickerCellProps) {
  const { addExpireDateToPOProduct } = useOrdersContext();

  // Convertimos `row.expire_date` a un objeto `Date` si ya tiene un valor
  const initialDate = row.expire_date ? parseISO(row.expire_date) : undefined;
  const [date, setDate] = React.useState<Date | undefined>(initialDate);

  // Función para formatear la fecha antes de enviarla
  const handleDateChange = (selectedDate: Date) => {
    setDate(selectedDate);
    const formattedDate = format(selectedDate, "yyyy-MM-dd HH:mm:ss");

    addExpireDateToPOProduct(row.purchase_order_product_id, formattedDate);

    if (onChange) {
      onChange(formattedDate);
    }
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={cn(
            "w-[240px] justify-start text-left font-normal gap-2",
            !date && "text-muted-foreground"
          )}
        >
          <CalendarIcon />
          {date ? format(date, "PPP") : <span>Pick a date</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent
        align="start"
        className="flex w-auto flex-col space-y-2 p-2"
      >
        <Select
          defaultValue={date!!?.getDate().toString()}
          onValueChange={(value) =>
            handleDateChange(addDays(new Date(), parseInt(value)))
          }
        >
          <SelectTrigger>
            <SelectValue placeholder="Select" />
          </SelectTrigger>
          <SelectContent position="popper">
            <SelectItem value="0">Today</SelectItem>
            <SelectItem value="1">Tomorrow</SelectItem>
            <SelectItem value="3">In 3 days</SelectItem>
            <SelectItem value="7">In a week</SelectItem>
          </SelectContent>
        </Select>
        <div className="rounded-md border">
          <Calendar
            mode="single"
            selected={date}
            onSelect={(date) => date && handleDateChange(date)}
          />
        </div>
      </PopoverContent>
    </Popover>
  );
}
