import { PropertyStatus, Unit, Currency, CertificationType } from '../database/entity/Property';

export interface CreatePropertyDto {
  title: string;
  description: string;
  price: string;
  location: string;
  lat?: number;
  lng?: number;
  type: number;
  city: number;
  certification: CertificationType;
  status: PropertyStatus;
  unit?: Unit;
  bedroom?: number;
  bathroom: number;
  squareMeter?: string;
  garage?: boolean;
  carport?: boolean;
  fullFurnished?: boolean;
  image: string[];
  currency?: Currency;
}
