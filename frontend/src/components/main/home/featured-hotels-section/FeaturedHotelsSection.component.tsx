import SectionHeader from "@/components/common/section-header/SectionHeader.component";
import { IHotelsResponse } from "@/types/hotel.types";
import Card from "./card/Card.component";

export default async function FeaturedHotelsSection() {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/hotels/featured`,
    {
      next: { revalidate: 60 * 60 },
    }
  );
  const data: IHotelsResponse = await response.json();
  if (!data.data.hotels || data.data.hotels.length === 0) return null;

  return (
    <section className="w-full py-12 flex flex-col gap-8">
      <SectionHeader
        title="Featured Hotels"
        subtitle="Check out our featured hotels"
      />
      <div className="container">
        <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {data.data.hotels.map((hotel) => {
            return <Card key={hotel._id} hotel={hotel} />;
          })}
        </div>
      </div>
    </section>
  );
}
