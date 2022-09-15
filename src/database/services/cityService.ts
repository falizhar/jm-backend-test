import { City } from '../entity/City';

export class CityService {
  findAll = async (): Promise<City[]> => {
    const cities = await City.find();
    return cities;
  };
}
