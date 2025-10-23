"use client";
import { useSearch } from "@/hooks/useSearch";
import CountryDropdown from "@/UI/country-dropdown/CountryDropdown.component";
import DateRangePicker from "@/UI/date-range-picker/DateRangePicker.component";
import Dropdown from "@/UI/dropdown/Dropdown.component";
import { generateArrayOfNumbers } from "@/utils/generateArrayOfNumbers";

export default function SearchForm() {
  const { handleSelect, handleDateChange, handleSubmit } = useSearch();

  return (
    <form
      method="post"
      className="lg:w-[80%] w-full p-4 bg-white rounded-xl"
      onSubmit={handleSubmit}
    >
      <div className="w-full flex flex-col gap-4">
        <CountryDropdown name="countryCode" onCountrySelect={handleSelect} />
        <DateRangePicker onDateChange={handleDateChange} />
        <div className="w-full grid lg:grid-cols-2 grid-cols-1 gap-4">
          <Dropdown
            name="adults"
            placeholder="Adults"
            options={generateArrayOfNumbers(4).map((n) => {
              return {
                label: `${n} ${n > 1 ? "Adults" : "Adult"}`,
                value: n,
              };
            })}
            onSelect={handleSelect}
          />
          <Dropdown
            name="children"
            placeholder="Children"
            options={generateArrayOfNumbers(4).map((n) => {
              return {
                label: `${n} ${n > 1 ? "Children" : "Child"}`,
                value: n,
              };
            })}
            onSelect={handleSelect}
          />
        </div>
        <Dropdown
          name="rooms"
          placeholder="Rooms"
          options={generateArrayOfNumbers(4).map((n) => {
            return {
              label: `${n} ${n > 1 ? "Rooms" : "Room"}`,
              value: n,
            };
          })}
          onSelect={handleSelect}
        />

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
