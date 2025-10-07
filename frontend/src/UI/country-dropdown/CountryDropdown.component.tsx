"use client";
import { useGetCountries } from "@/hooks/useGetCountries";
import { useRef, useEffect } from "react";
import { ChevronDownIcon } from "@heroicons/react/24/outline";
import { useSearchParams } from "next/navigation";
import { useCountryDropdown } from "./useCountryDropdown.hook";

export default function CountryDropdown() {
  const searchParams = useSearchParams();
  const destination = searchParams.get("destination");
  const { countries, isLoading } = useGetCountries();
  const dropdownRef = useRef<HTMLDivElement>(null);
  const {
    closeDropdown,
    toggleDropdown,
    isOpen,
    onCountrySelect,
    selected,
    setSelected,
  } = useCountryDropdown();

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        closeDropdown();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Set selected country from URL
  useEffect(() => {
    if (!isLoading && countries && destination) {
      const matchedCountry = countries.find(
        (country) => country.code.toLowerCase() === destination.toLowerCase()
      );
      if (matchedCountry) {
        setSelected(matchedCountry.name);
      }
    }
  }, [countries, destination, isLoading, setSelected]);

  return (
    <div className="relative w-full" ref={dropdownRef}>
      <div
        className="w-full flex items-center justify-between bg-transparent p-2 btn btn-lg"
        role="button"
        aria-label="Select destination"
        onClick={toggleDropdown}
      >
        <span className="capitalize text-gray-700">{selected}</span>

        <ChevronDownIcon
          className={`w-5 h-5 opacity-70 ${
            isOpen ? "rotate-180" : ""
          } duration-300 ease-in-out`}
        />
      </div>

      {/* Dropdown menu */}
      {isOpen && !isLoading && (
        <ul className="absolute left-0 mt-1 w-full max-h-48 overflow-y-auto rounded-lg border border-gray-200 bg-white shadow-lg z-20 p-2">
          {!countries || countries.length === 0 ? (
            <li>
              <p className="text-base text-gray-500 capitalize">
                No countries available.
              </p>
            </li>
          ) : (
            countries.map((country) => (
              <li
                key={country.code}
                onClick={() => {
                  setSelected(country.name);
                  onCountrySelect(country.code);
                  closeDropdown();
                }}
                className="px-4 py-2 hover:bg-gray-100 cursor-pointer capitalize"
              >
                {country.name}
              </li>
            ))
          )}
        </ul>
      )}
    </div>
  );
}
