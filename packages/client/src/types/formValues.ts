import { Country } from './';

export interface FormValues {
  country: Country | null;
  input: string;
  'location-type': 'zip-code' | 'city';
  position: Position | null;
}
