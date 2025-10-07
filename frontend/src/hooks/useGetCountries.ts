"use client";
import { ICountriesResponse } from "@/types/countries.types";
import { useQuery } from "@tanstack/react-query";

export function useGetCountries() {
  const { data: countries, isLoading } = useQuery({
    queryKey: ["countries"],
    queryFn: fetchCountries,
    refetchOnWindowFocus: false,
    staleTime: 1000 * 60 * 60,
  });

  async function fetchCountries() {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/countries`
    );
    if (!response.ok) throw new Error("Network response was not ok.");
    const data: ICountriesResponse = await response.json();
    console.log(data);

    if (data.status !== "Success")
      throw new Error(data.message || "Failed to fetch countries.");
    return data.data.countries;
  }

  return { countries, isLoading };
}
