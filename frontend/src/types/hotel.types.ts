export interface IHotel {
  _id: string;
  hotelName: string;
  desc: string;
  type: string;
  country: {
    name: string;
    code: string;
  };
  address: string;
  distance: string;
  photos: string[];
  rating: number;
  rooms: string[];
  cheapestPrice: number;
  featured: boolean;
  _v: number;
  createdAt: string;
  updatedAt: string;
}

export interface IHotelsResponse {
  status: string;
  data: {
    hotels: IHotel[];
  };
  message: string;
  results: number;
}
