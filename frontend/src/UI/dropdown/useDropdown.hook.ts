"use client";
import { useState } from "react";

export function useDropdown() {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState("");
  const openDropdown = () => setIsOpen(true);
  const closeDropdown = () => setIsOpen(false);
  const toggleDropdown = () => setIsOpen((prev) => !prev);

  return {
    openDropdown,
    closeDropdown,
    toggleDropdown,
    isOpen,
    selected,
    setSelected,
  };
}
