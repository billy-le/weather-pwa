export interface Country {
  name: string;
  native: string;
  phone: string;
  continent: string;
  capital: string;
  currency: string;
  languages: string[];
  key?: string;
}

export interface Countries {
  [key: string]: Country;
}
