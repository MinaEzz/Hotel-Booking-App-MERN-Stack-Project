import SectionHeader from "@/components/common/section-header/SectionHeader.component";
import { IHotelsResponse } from "@/types/hotel.types";
import HotelCard from "./hotel-card/HotelCard.component";

export default async function FeaturedHotelsSection() {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/hotels?featured=true`
  );
  const data: IHotelsResponse = await response.json();
  if (data.data.hotels.length === 0) return null;
  console.log(data);

  return (
    <section className="w-full py-12 flex flex-col gap-8">
      <SectionHeader
        title="Featured Hotels"
        subtitle="Check out our featured hotels"
      />
      <div className="container">
        <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {data.data.hotels.map((hotel) => {
            return <HotelCard key={hotel._id} hotel={hotel} />;
          })}
        </div>
      </div>
    </section>
  );
}
