"use client";
import { useRouter, useSearchParams } from "next/navigation";

export function useSearch() {
  const router = useRouter();
  const searchParams = useSearchParams();

  return {};
}
