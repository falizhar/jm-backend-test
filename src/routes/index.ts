import { IRoute } from '../interfaces/route.interface';
import { AuthRoute } from './authRoute';
import { AdminRoute } from './adminRoute';
import { UserRoute } from './userRoute';
import { PropertyRoute } from './propertyRoute';
import { CityRoute } from './cityRoute';
import { TypeRoute } from './typeRoute';
import { DocsRoute } from './docsRoute';
import {
  authController,
  adminController,
  userController,
  propertyController,
  cityController,
  typeController
} from '../controllers';

const authRoute = new AuthRoute(authController);
const adminRoute = new AdminRoute(adminController);
const userRoute = new UserRoute(userController);
const propertyRoute = new PropertyRoute(propertyController);
const cityRoute = new CityRoute(cityController);
const typeRoute = new TypeRoute(typeController);
const docsRoute = new DocsRoute();

export const routes: IRoute[] = [
  authRoute,
  adminRoute,
  userRoute,
  propertyRoute,
  docsRoute,
  cityRoute,
  typeRoute
];
