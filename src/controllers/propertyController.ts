import { Request, Response } from 'express';
import { ResponseUtil } from '../utils';
import { NOT_FOUND, OK, UNAUTHORIZED } from '../constants/statusCodes';
import {
  created,
  deleted,
  notExist,
  updated,
} from '../constants/responseMessages';
import { CreatePropertyDto } from '../dtos/createPropertyDto';
import { PropertyService } from '../database/services';
import { IRequestWithUser } from '../interfaces/requestWithUser.interface';
import { paginator } from '../utils/paginator';
import { PAGE_LIMIT } from '../constants/shared';
import {
  IRequestWithProperty,
  IProperty,
} from '../interfaces/requestWithProperty.interface';
import { Currency } from '../database/entity/Property';

export class PropertyController {
  constructor(
    private responseUtil: ResponseUtil,
    private propertyService: PropertyService,
  ) {}

  createProperty = async (
    req: IRequestWithUser,
    res: Response,
  ): Promise<Response> => {
    const { userId } = req.currentUser;
    const {
      title,
      description,
      price,
      location,
      type,
      city,
      status,
      unit,
      certification,
      bedroom,
      bathroom,
      squareMeter,
      garage,
      carport,
      fullFurnished,
      image,
      currency,
    }: CreatePropertyDto = req.body;

    const property = await this.propertyService.create({
      title,
      description,
      price,
      location,
      type,
      user: userId,
      city,
      status,
      unit,
      certification,
      bedroom,
      bathroom,
      squareMeter,
      garage,
      carport,
      fullFurnished,
      currency: currency || Currency.IDR,
    });

    await this.savePropertyImage(image, property.propertyId);



    return this.responseUtil.success({
      statusCode: OK,
      message: created('property'),
      data: { property },
      res,
    });
  };

  private savePropertyImage = async (
    image: string[],
    propertyId: number,
  ): Promise<void> => {
    const propertyImageData = image.map((url) => {
      return {
        property: propertyId,
        url,
      };
    });

    await this.propertyService.bulkCreateImage(propertyImageData);
  };

  getAllProperty = async (req: Request, res: Response): Promise<Response> => {
    const { page = 0 } = req.query;
    const currentPage: number = +page;
    const pageNumber = paginator(currentPage, PAGE_LIMIT);
    const propertyList = await this.propertyService.findAll(
      pageNumber,
      PAGE_LIMIT,
    );
    return this.responseUtil.success({
      statusCode: OK,
      message: `success`,
      data: {
        propertyList:
          propertyList.length > 0
            ? this.propertyFormatter(propertyList)
            : propertyList,
        currentPage,
        pageSize: PAGE_LIMIT,
      },
      res,
    });
  };

  getByPropertyType = async (req: Request, res: Response): Promise<Response> => {
    const { page = 0 } = req.query;
    const currentPage: number = +page;
    const pageNumber = paginator(currentPage, PAGE_LIMIT);
    const { type = 0 } = req.params;
    const typeOfProperty = +type;
    const propertyList = await this.propertyService.findAllByPropertyType(
      typeOfProperty,
      pageNumber,
      PAGE_LIMIT,
    );
    return this.responseUtil.success({
      statusCode: OK,
      message: `success`,
      data: {
        propertyList:
          propertyList.length > 0
            ? this.propertyFormatter(propertyList)
            : propertyList,
        currentPage,
        pageSize: PAGE_LIMIT,
      },
      res,
    });
  };

  getAllByUser = async (
    req: IRequestWithUser,
    res: Response,
  ): Promise<Response> => {
    const { currentUser } = req;
    const { page = 0 } = req.query;
    const { userId = 0 } = req.params;
    const currentPage: number = +page;
    const pageNumber = paginator(currentPage, PAGE_LIMIT);
    const userIdProperty = +userId;

    if (currentUser.userId !== userIdProperty) {
      return this.responseUtil.error({
        statusCode: UNAUTHORIZED,
        message: `Unauthorized access for user`,
        res,
      });
    }

    const propertyList = await this.propertyService.findAllByUser(
      userIdProperty,
      pageNumber,
      PAGE_LIMIT,
    );

    return this.responseUtil.success({
      statusCode: OK,
      message: `success`,
      data: {
        propertyList:
          propertyList.length > 0
            ? this.propertyFormatter(propertyList)
            : propertyList,
        currentPage,
        pageSize: PAGE_LIMIT,
      },
      res,
    });
  };

  getOneProperty = async (
    req: IRequestWithProperty,
    res: Response,
  ): Promise<Response> => {
    const { slug } = req.params;

    const property = await this.propertyService.findOne(slug);

    if (property.length === 0) {
      return this.responseUtil.error({
        statusCode: NOT_FOUND,
        message: notExist('property'),
        res,
      });
    }

    const propertyPayload = this.propertyFormatter(property)[0];

    return this.responseUtil.success({
      statusCode: OK,
      message: `success`,
      data: propertyPayload,
      res,
    });
  };

  updateProperty = async (
    req: IRequestWithProperty,
    res: Response,
  ): Promise<Response> => {
    const { property, body } = req;

    Object.assign(property, { ...body });
    await property.save();

    return this.responseUtil.success({
      statusCode: OK,
      message: updated(`property`),
      data: property,
      res,
    });
  };

  deleteProperty = async (
    req: IRequestWithProperty,
    res: Response,
  ): Promise<Response> => {
    const { property } = req;

    Object.assign(property, { active: false });
    await property.save();


    return this.responseUtil.success({
      statusCode: OK,
      message: deleted(`property`),
      data: property,
      res,
    });
  };

  private propertyFormatter = (property: IProperty[]): any[] => {
    return property.map(
      ({
        propertyId,
        title,
        description,
        userId,
        price,
        unit,
        status,
        bedroom,
        bathroom,
        certification,
        location,
        slug,
        garage,
        carport,
        fullFurnished,
        type,
        city,
        createdAt,
        firstName,
        phoneNumber,
        picture,
        image,
        area,
        typeId,
        cityId,
        currency,
      }) => {
        return {
          propertyId,
          title,
          description,
          userId,
          price,
          unit,
          status,
          location,
          slug,
          type,
          city,
          createdAt,
          firstName,
          phoneNumber,
          picture,
          image,
          typeId,
          cityId,
          currency,
          spec: {
            bedroom,
            bathroom,
            certification,
            garage,
            carport,
            fullFurnished,
            area,
          },
        };
      },
    );
  };
}
