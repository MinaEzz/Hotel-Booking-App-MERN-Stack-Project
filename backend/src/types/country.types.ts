export interface IRestCountry {
  name: {
    common: string;
    official: string;
    nativeName?: {
      [languageCode: string]: {
        official: string;
        common: string;
      };
    };
  };
  cca2: string;
}

export interface ICountry {
  name: string;
  code: string;
}
