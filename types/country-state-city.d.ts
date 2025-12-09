declare module "country-state-city" {
  export interface ICountry {
    name: string;
    isoCode: string;
    phonecode: string;
  }

  export interface ICity {
    name: string;
    countryCode: string;
    latitude?: string;
    longitude?: string;
    stateCode?: string;
  }

  export const Country: {
    getAllCountries(): ICountry[];
  };

  export const City: {
    getCitiesOfCountry(countryCode: string): ICity[];
  };
}
