import { Router } from 'express';
import { IRoute } from '../interfaces/route.interface';
import { TypeController } from '../controllers/typeController';
import { asyncHandler } from '../middlewares';

export class TypeRoute implements IRoute {
  public path = '/type';
  public router = Router();

  constructor(private readonly typeController: TypeController) {
    this.initializeRoutes();
  }

  private initializeRoutes() {

    this.router
      .route(`${this.path}`)
      .get(
        asyncHandler(this.typeController.getAllPropertyTypes),
      );
  }
}