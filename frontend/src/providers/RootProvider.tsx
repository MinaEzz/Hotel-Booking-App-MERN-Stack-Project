"use client";
import ReactQueryProvider from "./ReactQuery.provider";
// import StoreProvider from "./StoreProvider";

export function RootProvider({ children }: { children: React.ReactNode }) {
  return (
    // <StoreProvider>
    <ReactQueryProvider>{children}</ReactQueryProvider>
    // </StoreProvider>
  );
}
