"use client";
import { format } from "date-fns";
import { useState } from "react";
import { Range } from "react-date-range";

export function useDateRangePicker(modalId: string) {
  // ✅ States
  const [range, setRange] = useState<Range[]>([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    },
  ]);
  const [tempRange, setTempRange] = useState<Range[]>(range);

  // ✅ Format display
  const formattedRange =
    range?.[0]?.startDate && range?.[0]?.endDate
      ? `${format(range[0].startDate, "MMM dd, yyyy")} - ${format(
          range[0].endDate,
          "MMM dd, yyyy"
        )}`
      : "Select date range";

  // ✅ Modal control
  const openModal = () =>
    (document.getElementById(modalId) as HTMLDialogElement)?.showModal();
  const closeModal = () =>
    (document.getElementById(modalId) as HTMLDialogElement)?.close();

  return {
    tempRange,
    setTempRange,
    formattedRange,
    openModal,
    closeModal,
    setRange,
  };
}
