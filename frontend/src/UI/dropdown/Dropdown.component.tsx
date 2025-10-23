"use client";
import { useRef, useEffect } from "react";
import { ChevronDownIcon } from "@heroicons/react/24/outline";
import IDropdownProps from "./Dropdown.types";
import { useDropdown } from "./useDropdown.hook";

export default function Dropdown({
  name,
  options,
  placeholder = "Select an option",
  onSelect,
}: IDropdownProps) {
  const dropdownRef = useRef<HTMLDivElement>(null);
  const { isOpen, closeDropdown, toggleDropdown, selected, setSelected } =
    useDropdown();

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

  return (
    <div className="relative w-full" ref={dropdownRef}>
      <div
        className="w-full flex items-center justify-between bg-transparent p-2 btn btn-lg"
        role="button"
        aria-label="Select option"
        onClick={toggleDropdown}
      >
        <span className="capitalize text-gray-700">
          {selected || placeholder}
        </span>

        <ChevronDownIcon
          className={`w-5 h-5 opacity-70 ${
            isOpen ? "rotate-180" : ""
          } duration-300 ease-in-out`}
        />
      </div>

      {isOpen && (
        <ul className="absolute left-0 mt-1 w-full max-h-48 overflow-y-auto rounded-lg border border-gray-200 bg-white shadow-lg z-20 p-2">
          {options.length === 0 ? (
            <li>
              <p className="text-base text-gray-500 capitalize">
                No options available.
              </p>
            </li>
          ) : (
            options.map((option) => (
              <li
                key={option.value}
                onClick={() => {
                  setSelected(option.label);
                  onSelect(name, option.value);
                  closeDropdown();
                }}
                className="px-4 py-2 hover:bg-gray-100 cursor-pointer capitalize"
              >
                {option.label}
              </li>
            ))
          )}
        </ul>
      )}
    </div>
  );
}
