import { Factory, Seeder } from 'typeorm-seeding';
import { Connection } from 'typeorm';
import { Type } from '../entity/Type';
import { propertyTypeData } from '../data/propertyType.data';

export default class CreatePropertyType implements Seeder {
  public async run(factory: Factory, connection: Connection): Promise<any> {
    await connection
      .createQueryBuilder()
      .insert()
      .into(Type)
      .values(propertyTypeData)
      .execute();
  }
}
