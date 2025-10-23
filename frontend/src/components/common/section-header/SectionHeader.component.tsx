import ISectionHeader from "./SectionHeader.types";

export default function SectionHeader({ title, subtitle }: ISectionHeader) {
  return (
    <div className="w-full text-center flex flex-col items-center gap-2">
      <h3 className="text-6xl text-black font-semibold font-heading capitalize">
        {title}
      </h3>
      <p className="text-2xl text-gray-700 capitalize">{subtitle}</p>
    </div>
  );
}
