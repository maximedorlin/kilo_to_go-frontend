"use client";

import * as React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { DayPicker } from "react-day-picker";

import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import { Select } from "@/components/ui/select"; // Assuming you have a Select component
import {
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@radix-ui/react-select";

export type CalendarProps = React.ComponentProps<typeof DayPicker>;

function Calendar({
  className,
  classNames,
  showOutsideDays = true,
  ...props
}: CalendarProps) {
  const [month, setMonth] = React.useState(props.defaultMonth || new Date());
  const [dateInput, setDateInput] = React.useState("");

  const handleMonthChange = (newMonth: Date) => {
    setMonth(newMonth);
    if (props.onMonthChange) {
      props.onMonthChange(newMonth); // Propagate the change if needed
    }
  };

  const handleDateInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setDateInput(value);

    // If the user enters a valid date, update the month and year accordingly
    const date = new Date(value);
    if (!isNaN(date.getTime())) {
      setMonth(date);
    }
  };

  const handleDateInputBlur = () => {
    // Ensure the input matches a valid date format when it loses focus
    const date = new Date(dateInput);
    if (!isNaN(date.getTime())) {
      setMonth(date);
    } else {
      setDateInput(""); // Reset the input if invalid
    }
  };

  const currentYear = month.getFullYear();
  const currentMonth = month.getMonth();

  const years = React.useMemo(() => {
    const currentYear = new Date().getFullYear();
    return Array.from({ length: 10 }, (_, i) => currentYear - 5 + i);
  }, []);

  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  return (
    <div className="space-y-2">
      <div className="flex justify-between items-center">
        <div className="flex items-center space-x-2">
          {/* Month Select Dropdown */}
          <Select
            value={currentMonth.toString()}
            onValueChange={(value) => {
              const newMonth = new Date(currentYear, parseInt(value), 1);
              handleMonthChange(newMonth);
            }}
            aria-label="Select Month"
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder={months[currentMonth]} />
            </SelectTrigger>
            <SelectContent>
              {months.map((month, index) => (
                <SelectItem key={index} value={index.toString()}>
                  {month}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          {/* Year Select Dropdown */}
          <Select
            value={currentYear.toString()}
            onValueChange={(value) => {
              const newMonth = new Date(parseInt(value), currentMonth, 1);
              handleMonthChange(newMonth);
            }}
            aria-label="Select Year"
          >
            <SelectTrigger className="w-[90px]">
              <SelectValue placeholder={currentYear.toString()} />
            </SelectTrigger>
            <SelectContent>
              {years.map((year) => (
                <SelectItem key={year} value={year.toString()}>
                  {year}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-x-1">
          {/* Previous Month Button */}
          <button
            onClick={() => {
              handleMonthChange(new Date(currentYear, currentMonth - 1, 1));
            }}
            className={cn(
              buttonVariants({ variant: "outline" }),
              "h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100"
            )}
            aria-label="Previous Month"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>

          {/* Next Month Button */}
          <button
            onClick={() => {
              handleMonthChange(new Date(currentYear, currentMonth + 1, 1));
            }}
            className={cn(
              buttonVariants({ variant: "outline" }),
              "h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100"
            )}
            aria-label="Next Month"
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Date Input Field */}
      <div className="flex items-center space-x-2">
        <label htmlFor="date-input" className="sr-only">
          Enter Date (YYYY-MM-DD)
        </label>
        <input
          type="text"
          id="date-input"
          value={dateInput}
          onChange={handleDateInputChange}
          onBlur={handleDateInputBlur}
          placeholder="YYYY-MM-DD"
          className="p-2 border rounded"
          aria-label="Enter a date"
        />
      </div>

      <DayPicker
        showOutsideDays={showOutsideDays}
        className={cn("p-3", className)}
        classNames={{
          months:
            "flex flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0",
          month: "space-y-4",
          caption: "flex justify-center pt-1 relative items-center",
          caption_label: "text-sm font-medium",
          nav: "space-x-1 flex items-center",
          nav_button: cn(
            buttonVariants({ variant: "outline" }),
            "h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100"
          ),
          nav_button_previous: "absolute left-1",
          nav_button_next: "absolute right-1",
          table: "w-full border-collapse space-y-1",
          head_row: "flex",
          head_cell:
            "text-muted-foreground rounded-md w-9 font-normal text-[0.8rem]",
          row: "flex w-full mt-2",
          cell: "h-9 w-9 text-center text-sm p-0 relative [&:has([aria-selected].day-range-end)]:rounded-r-md [&:has([aria-selected].day-outside)]:bg-accent/50 [&:has([aria-selected])]:bg-accent first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md focus-within:relative focus-within:z-20",
          day: cn(
            buttonVariants({ variant: "ghost" }),
            "h-9 w-9 p-0 font-normal aria-selected:opacity-100"
          ),
          day_range_end: "day-range-end",
          day_selected:
            "bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground focus:bg-primary focus:text-primary-foreground",
          day_today: "bg-accent text-accent-foreground",
          day_outside:
            "day-outside text-muted-foreground aria-selected:bg-accent/50 aria-selected:text-muted-foreground",
          day_disabled: "text-muted-foreground opacity-50",
          day_range_middle:
            "aria-selected:bg-accent aria-selected:text-accent-foreground",
          day_hidden: "invisible",
          ...classNames,
        }}
        components={{
          IconLeft: ({ ...props }) => (
            <ChevronLeft {...props} className="h-4 w-4" />
          ),
          IconRight: ({ ...props }) => (
            <ChevronRight {...props} className="h-4 w-4" />
          ),
        }}
        month={month}
        onMonthChange={handleMonthChange}
        {...props}
      />
    </div>
  );
}

Calendar.displayName = "Calendar";

export { Calendar };
