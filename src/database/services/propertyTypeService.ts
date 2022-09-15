import { Type } from '../entity/Type';

export class propertyTypeService {

  findAll = async (): Promise<unknown[]> => {
    return await Type.find();
  };
}
