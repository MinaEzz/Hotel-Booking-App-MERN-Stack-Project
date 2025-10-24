import React from "react";
import ICardProps from "./Card.types";

export default function Card({ title, desc, icon }: ICardProps) {
  return (
    <div className="w-full rounded-xl bg-white p-4 flex flex-col items-center justify-center gap-6 shadow-md">
      <div className="w-14 h-14 flex items-center justify-center bg-neutral-50 text-primary rounded-full">
        {React.cloneElement(icon, { className: "w-9 h-9 " })}
      </div>

      <div className="w-full flex flex-col gap-4 text-center capitalize">
        <h4 className="text-2xl text-black font-semibold">{title}</h4>
        <p className="text-sm text-gray-500">{desc}</p>
      </div>
    </div>
  );
}
