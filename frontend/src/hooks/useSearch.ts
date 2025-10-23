"use client";
import { useRouter } from "next/navigation";
import { setSearchData } from "@/lib/store/search/search.slice";
import { useState } from "react";
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks";
import IInitialState from "@/lib/store/search/search.types";

export function useSearch() {
  const dispatch = useAppDispatch();
  const searchRedux = useAppSelector((state) => state.search);
  const router = useRouter();
  const [formData, setFormData] = useState<IInitialState>({
    countryCode: "",
    checkIn: "",
    checkOut: "",
    adults: 1,
    children: 0,
    rooms: 1,
  });

  // ✅ handle dropdowns
  const handleSelect = (key: string, value: number | string) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
  };

  // ✅ handle date change
  const handleDateChange = (startDate: Date, endDate: Date) => {
    setFormData((prev) => ({
      ...prev,
      checkIn: startDate.toLocaleDateString(),
      checkOut: endDate.toLocaleDateString(),
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(setSearchData(formData));
    console.log(formData);
    console.log(searchRedux);
  };

  return { handleSelect, handleSubmit, handleDateChange };
}
