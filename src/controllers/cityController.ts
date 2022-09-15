import { Request, Response } from 'express';
import { ResponseUtil } from '../utils';
import { CityService } from '../database/services/cityService';
import { OK } from '../constants/statusCodes';

export class CityController {
  constructor(
    private responseUtil: ResponseUtil,
    private cityService: CityService,
  ) {}

  getAllCities = async (
    req: Request,
    res: Response,
  ): Promise<Response> => {
    const cityList = await this.cityService.findAll();

    return this.responseUtil.success({
      statusCode: OK,
      message: `success`,
      data: { cityList },
      res,
    });

  };

}
