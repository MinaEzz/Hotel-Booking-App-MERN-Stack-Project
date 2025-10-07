"use client";
import { format } from "date-fns";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { Range } from "react-date-range";

export function useDateRangePicker(modalId: string) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const queryStart = searchParams.get("checkin");
  const queryEnd = searchParams.get("checkout");

  // ✅ States
  const [range, setRange] = useState<Range[]>([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    },
  ]);
  const [tempRange, setTempRange] = useState<Range[]>(range);

  function onDateSelect(startDate: Date, endDate: Date) {
    const params = new URLSearchParams(searchParams.toString());
    params.set("checkin", format(startDate, "yyyy-MM-dd"));
    params.set("checkout", format(endDate, "yyyy-MM-dd"));

    router.push(`?${params.toString()}`, { scroll: false });
  }

  useEffect(() => {
    if (queryStart && queryEnd) {
      const start = new Date(queryStart);
      const end = new Date(queryEnd);
      if (!isNaN(start.getTime()) && !isNaN(end.getTime())) {
        const newRange: Range[] = [
          {
            startDate: start,
            endDate: end,
            key: "selection",
          },
        ];
        setRange(newRange);
        setTempRange(newRange);
      }
    }
  }, [queryStart, queryEnd]);
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

  // ✅ save & update query
  const handleSave = () => {
    setRange(tempRange);
    if (tempRange[0].startDate && tempRange[0].endDate) {
      onDateSelect(tempRange[0].startDate, tempRange[0].endDate);
    }
    closeModal();
  };

  return {
    tempRange,
    setTempRange,
    formattedRange,
    openModal,
    closeModal,
    handleSave,
    range,
  };
}
