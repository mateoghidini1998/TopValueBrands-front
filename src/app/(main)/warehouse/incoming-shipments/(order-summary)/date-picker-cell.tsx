"use client";

import * as React from "react";
import { CalendarIcon } from "@radix-ui/react-icons";
import { format, parseISO, parse } from "date-fns";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Input } from "@/components/ui/input";
import { useOrdersContext } from "@/contexts/orders.context";

type DatePickerCellProps = {
  value?: Date;
  onChange?: (value: string) => void;
  row: any;
};

export function DatePickerCell({ row, onChange }: DatePickerCellProps) {
  const { addExpireDateToPOProduct } = useOrdersContext();

  const initialDate = row.expire_date ? parseISO(row.expire_date) : undefined;
  const [date, setDate] = React.useState<Date | undefined>(initialDate);
  const [inputValue, setInputValue] = React.useState(
    date ? format(date, "MM/dd/yyyy") : ""
  );

  const handleDateChange = (selectedDate: Date) => {
    setDate(selectedDate);
    setInputValue(format(selectedDate, "MM/dd/yyyy"));
    const formattedDate = format(selectedDate, "yyyy-MM-dd HH:mm:ss");

    addExpireDateToPOProduct(row.purchase_order_product_id, formattedDate);

    if (onChange) {
      onChange(formattedDate);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value;

    // Remove any non-digit characters
    value = value.replace(/\D/g, "");

    // Add slashes automatically
    if (value.length > 2 && value.length <= 4) {
      value = value.slice(0, 2) + "/" + value.slice(2);
    } else if (value.length > 4) {
      value =
        value.slice(0, 2) + "/" + value.slice(2, 4) + "/" + value.slice(4, 8);
    }

    setInputValue(value);

    if (value.length === 10) {
      try {
        const parsedDate = parse(value, "MM/dd/yyyy", new Date());
        if (parsedDate instanceof Date && !isNaN(parsedDate.getTime())) {
          handleDateChange(parsedDate);
        }
      } catch (error) {
        // Invalid date format, do nothing
      }
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
        <Input
          type="text"
          placeholder="MM/DD/YYYY"
          value={inputValue}
          onChange={handleInputChange}
          maxLength={10}
        />
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
