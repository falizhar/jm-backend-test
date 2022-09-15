import { Request, Response } from 'express';
import { ResponseUtil } from '../utils';
import { propertyTypeService } from '../database/services/propertyTypeService';
import { OK } from '../constants/statusCodes';

export class TypeController {
  constructor(
    private responseUtil: ResponseUtil,
    private typeService: propertyTypeService,
  ) {}

  getAllPropertyTypes = async (
    req: Request,
    res: Response,
  ): Promise<Response> => {
    const typeList = await this.typeService.findAll();

    return this.responseUtil.success({
      statusCode: OK,
      message: `success`,
      data: { typeList },
      res,
    });

  };

}
