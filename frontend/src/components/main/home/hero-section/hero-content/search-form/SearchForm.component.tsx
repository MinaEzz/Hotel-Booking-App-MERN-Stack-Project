"use client";
import { useSearch } from "@/hooks/useSearch";
import CountryDropdown from "@/UI/country-dropdown/CountryDropdown.component";
import DateRangePicker from "@/UI/date-range-picker/DateRangePicker.component";

export default function SearchForm() {
  const {} = useSearch();
  return (
    <form method="post" className="lg:w-[80%] w-full p-4 bg-white rounded-xl">
      <div className="w-full flex flex-col gap-4">
        <CountryDropdown />
        <DateRangePicker />
        <div className="w-full grid lg:grid-cols-2 grid-cols-1 gap-4"></div>
        <button
          type="submit"
          className="w-full btn btn-primary btn-lg capitalize"
        >
          Search Hotels
        </button>
      </div>
    </form>
  );
}
