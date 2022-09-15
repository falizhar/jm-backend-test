import { AuthController } from './authController';
import { AdminController } from './adminController';
import { UserController } from './userController';
import { PropertyController } from './propertyController';
import { CityController } from './cityController';
import { TypeController } from './typeController';
import { responseUtil, tokenUtil, passwordUtil } from '../utils';
import {
  adminService,
  userService,
  propertyService,
  cityService,
  typeService,
} from '../database/services';

export const authController = new AuthController(
  tokenUtil,
  responseUtil,
  userService,
);

export const adminController = new AdminController(
  tokenUtil,
  passwordUtil,
  responseUtil,
  adminService,
);

export const userController = new UserController(responseUtil, userService);

export const propertyController = new PropertyController(
  responseUtil,
  propertyService,
);

export const cityController = new CityController(responseUtil, cityService);

export const typeController = new TypeController(
  responseUtil,
  typeService,
);
