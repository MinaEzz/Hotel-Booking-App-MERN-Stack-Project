import { IHotel } from "@/types/hotel.types";
import { MapPinIcon, StarIcon } from "@heroicons/react/24/outline";

export default function HotelCard({ hotel }: { hotel: IHotel }) {
  return (
    <div className="card bg-base-100 shadow-sm" key={hotel._id}>
      <figure>
        <img
          src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp"
          alt="Shoes"
        />
      </figure>
      <div className="card-body">
        <div className="w-full flex items-center justify-between">
          <h4 className="card-title">{hotel.hotelName}</h4>
          <div className="w-fit p-2 rounded-xl bg-primary/40 flex items-center gap-2">
            <StarIcon className="w-4 h-4" />
            <span className="text-sm font-semibold">{hotel.rating}</span>
          </div>
        </div>
        <p className="text-sm flex items-center gap-2">
          <MapPinIcon className="w-4 h-4" />
          {hotel.country.name}, {hotel.distance}
        </p>
        <div className="card-actions justify-end">
          <button className="w-full btn btn-primary capitalize">
            View Details
          </button>
        </div>
      </div>
    </div>
  );
}
