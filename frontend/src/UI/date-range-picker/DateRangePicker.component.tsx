"use client";
import { DateRange } from "react-date-range";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import { CalendarDaysIcon } from "@heroicons/react/24/outline";
import useScreenSize from "@/hooks/useScreenSize.hook";
import { useDateRangePicker } from "./useDateRangePicker.hook";
import IDateRangePickerProps from "./DateRangePicker.types";

export default function DateRangePicker({
  onDateChange,
}: IDateRangePickerProps) {
  const screenSize = useScreenSize();
  const modalId = "date-range-modal";
  const {
    openModal,
    closeModal,
    tempRange,
    setTempRange,
    setRange,
    formattedRange,
  } = useDateRangePicker(modalId);

  return (
    <>
      <div
        className="w-full flex items-center justify-between bg-transparent p-2 btn btn-lg"
        role="button"
        aria-label="Select date range"
        onClick={openModal}
      >
        <span className="text-gray-700 capitalize">{formattedRange}</span>
        <CalendarDaysIcon className="w-5 h-5 opacity-70" />
      </div>

      <dialog id={modalId} className="modal">
        <div className="modal-box max-w-3xl">
          <h3 className="font-bold text-lg mb-4">
            Select Check-in & Check-out
          </h3>

          <div className="w-full flex justify-center items-center">
            <DateRange
              ranges={tempRange}
              onChange={(item) => setTempRange([item.selection])}
              moveRangeOnFirstSelection={false}
              rangeColors={["oklch(58% 0.158 241.966)"]}
              minDate={new Date()}
              months={2}
              direction={`${screenSize > 768 ? "horizontal" : "vertical"}`}
              showDateDisplay={false}
            />
          </div>

          {/* ✅ Buttons */}
          <div className="modal-action">
            <button
              className="btn btn-ghost"
              onClick={(e) => {
                e.preventDefault();
                closeModal();
              }}
            >
              Cancel
            </button>
            <button
              className="btn btn-primary"
              onClick={(e) => {
                e.preventDefault();
                if (tempRange[0].startDate && tempRange[0].endDate) {
                  setRange(tempRange);
                  onDateChange(tempRange[0].startDate, tempRange[0].endDate);
                }
                closeModal();
              }}
            >
              Save
            </button>
          </div>
        </div>
      </dialog>
    </>
  );
}
