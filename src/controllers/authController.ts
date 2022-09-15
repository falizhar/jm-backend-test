import { Request, Response } from 'express';
import dotenv from 'dotenv';

import { ResponseUtil, TokenUtil } from '../utils';
import {
  OK,
  CREATED,
  UNAUTHORIZED,
} from '../constants/statusCodes';
import { created, loginSuccess } from '../constants/responseMessages';
import { CreateUserDto } from '../dtos/createUserDto';
import { UserService } from '../database/services';
import { UserType } from '../database/entity/User';

dotenv.config();

export class AuthController {
  constructor(
    private tokenUtil: TokenUtil,
    private responseUtil: ResponseUtil,
    private userService: UserService,
  ) {}

  signup = async (req: Request, res: Response): Promise<Response> => {
    const { phoneNumber, firstName, lastName }: CreateUserDto = req.body;

    const user = await this.userService.create({
      phoneNumber,
      firstName,
      lastName,
      userType: UserType.NORMAL,
    });

    return this.responseUtil.success({
      statusCode: CREATED,
      message: created('user'),
      data: {
        phoneNumber: user.phoneNumber,
        fullName: `${user.firstName} ${user.lastName}`,
      },
      res,
    });
  };

  login = async (req: Request, res: Response): Promise<Response> => {
    const { phoneNumber }: { phoneNumber: string } = req.body;

    const user = await this.userService.findPhoneNumber(phoneNumber);

    if (!user) {
      return this.responseUtil.error({
        statusCode: UNAUTHORIZED,
        message: `incorrect phone number`,
        res,
      });
    }

    const token = this.tokenUtil.generate(user.userId);
    return this.responseUtil.success({
      statusCode: OK,
      message: loginSuccess(),
      data: {
        token,
        phoneNumber: user.phoneNumber,
        fullName: `${user.firstName} ${user.lastName}`,
        userId: user.userId,
        userType: user.userType,
      },
      res,
    });
  };
}
