import { getConnection } from 'typeorm';
import { CreatePropertyDto } from '../../dtos/createPropertyDto';
import { Property } from '../entity/Property';
import { Image } from '../entity/Image';
import {
  findAllQuery,
  findAllByTypeQuery,
  findAllByUserQuery,
  findOneQuery,
} from '../query/propertyQuery';
import { IProperty } from '../../interfaces/requestWithProperty.interface';

export class PropertyService {
  create = async (
    propertyData: Omit<CreatePropertyDto, 'image'> & { user: number },
  ): Promise<Property> => {
    return await Property.create(propertyData).save();
  };

  bulkCreateImage = async (
    imageData: { property: number; url: string }[],
  ): Promise<any> => {
    return await Image.insert(imageData);
  };

  findAll = async (page: number, pageSize: number): Promise<IProperty[]> => {
    const properties = await getConnection().manager.query(
      findAllQuery(page, pageSize),
    );

    return properties;
  };

  findAllByPropertyType = async (
    type: number,
    page: number,
    pageSize: number,
  ): Promise<IProperty[]> => {
    const properties = await getConnection().manager.query(
      findAllByTypeQuery(type, page, pageSize),
    );

    return properties;
  };

  findAllByUser = async (
    userId: number,
    page: number,
    pageSize: number,
  ): Promise<IProperty[]> => {
    const properties = await getConnection().manager.query(
      findAllByUserQuery(userId, page, pageSize),
    );

    return properties;
  };

  findOne = async (slug: string): Promise<IProperty[]> => {
    const property = await getConnection().manager.query(findOneQuery(slug));
    return property;
  };

  getBySlug = async (slug: string): Promise<Property | undefined> => {
    return await Property.findOne({ slug, active: true });
  };
}
