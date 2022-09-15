import Joi from 'joi';
import { Request, Response, NextFunction } from 'express';
import { validatorHandler } from '../middlewares/validatorHandler';
import { PropertyStatus, Unit, CertificationType } from '../database/entity/Property';

const createProperty = (req: Request, res: Response, next: NextFunction) => {
  const schema = Joi.object().keys({
    title: Joi.string().trim().min(2).required(),
    description: Joi.string().trim().min(5).required(),
    price: Joi.string().trim().required(),
    location: Joi.string().trim().required(),
    lat: Joi.number(),
    lng: Joi.number(),
    type: Joi.number().required(),
    city: Joi.number().required(),
    certification: Joi.string().trim().valid(CertificationType.AJB, CertificationType.SHM, CertificationType.SHGB, CertificationType.GIRIK, CertificationType.SHSRS),
    status: Joi.string().trim().valid(PropertyStatus.RENT, PropertyStatus.BUY, PropertyStatus.AUCTION),
    unit: Joi.string().trim().valid(Unit.DAY, Unit.MONTH, Unit.YEAR),
    bedroom: Joi.number(),
    bathroom: Joi.number(),
    squareMeter: Joi.string(),
    garage: Joi.boolean(),
    carport: Joi.boolean(),
    fullFurnished: Joi.boolean(),
    image: Joi.array().items(Joi.string()).required(),
  });

  validatorHandler(req, res, schema, next);
};

const updateProperty = (req: Request, res: Response, next: NextFunction) => {
  const schema = Joi.object().keys({
    title: Joi.string().trim().min(2),
    description: Joi.string().trim().min(5),
    price: Joi.string().trim(),
    location: Joi.string().trim(),
    lat: Joi.number(),
    lng: Joi.number(),
    type: Joi.number().required(),
    city: Joi.number().required(),
    certification: Joi.string().trim().valid(CertificationType.AJB, CertificationType.SHM, CertificationType.SHGB, CertificationType.GIRIK, CertificationType.SHSRS),
    status: Joi.string().trim().valid(PropertyStatus.RENT, PropertyStatus.BUY, PropertyStatus.AUCTION),
    unit: Joi.string().trim().valid(Unit.DAY, Unit.MONTH, Unit.YEAR),
    bedroom: Joi.number(),
    bathroom: Joi.number(),
    squareMeter: Joi.string(),
    garage: Joi.boolean(),
    carport: Joi.boolean(),
    fullFurnished: Joi.boolean(),
    image: Joi.array().items(Joi.string()).required(),
  });

  validatorHandler(req, res, schema, next);
};

export const propertyValidator = { createProperty, updateProperty };
