export interface ICountry {
  name: string;
  code: string;
}

export interface ICountriesResponse {
  status: string;
  data: {
    countries: ICountry[];
  };
  message: string;
  results: number;
}
