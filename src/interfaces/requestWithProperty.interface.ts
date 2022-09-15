import { Request } from 'express';
import {
  Unit,
  PropertyStatus,
  CertificationType,
  Property,
  Currency,
} from '../database/entity/Property';

export interface IProperty {
  propertyId: number;
  title: string;
  description: string;
  userId: number;
  price: string;
  certification: CertificationType;
  unit: Unit;
  status: PropertyStatus;
  bedroom: number;
  bathroom: boolean;
  location: string;
  slug: string;
  garage: boolean;
  carport: boolean;
  fullFurnished: boolean;
  type: string;
  city: string;
  createdAt: Date;
  firstName: string;
  phoneNumber: string;
  picture: string;
  image: string;
  area: string;
  typeId: number;
  cityId: number;
  currency: Currency;
}

export interface IRequestWithProperty extends Request {
  property: Property;
}
