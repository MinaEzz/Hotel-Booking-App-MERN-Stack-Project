"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

export function useCountryDropdown() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState("Destination...");
  // ✅ Dropdown control
  const openDropdown = () => setIsOpen(true);
  const closeDropdown = () => setIsOpen(false);
  const toggleDropdown = () => setIsOpen((prev) => !prev);

  // ✅ Destination
  function onCountrySelect(country: string) {
    const params = new URLSearchParams(searchParams.toString());
    params.set("destination", country);
    router.push(`?${params.toString()}`, { scroll: false });
  }

  return {
    openDropdown,
    closeDropdown,
    toggleDropdown,
    isOpen,
    onCountrySelect,
    selected,
    setSelected,
  };
}
