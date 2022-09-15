import { Request, Response } from 'express';
import { ResponseUtil } from '../utils';
import { UserService } from '../database/services';
import { OK, UNAUTHORIZED } from '../constants/statusCodes';
import { IRequestWithUser } from '../interfaces/requestWithUser.interface';
import { UpdateUserDto } from '../dtos/updateUserDto';
import { updated } from '../constants/responseMessages';
import { paginator } from '../utils/paginator';
import { PAGE_LIMIT } from '../constants/shared';
import { UserType } from '../database/entity/User';

export class UserController {
  constructor(
    private responseUtil: ResponseUtil,
    private userService: UserService,
  ) {}

  getCurrentProfile = async (
    req: IRequestWithUser,
    res: Response,
  ): Promise<Response> => {
    const { currentUser } = req;
    return this.responseUtil.success({
      statusCode: OK,
      message: `success`,
      data: { profile: currentUser },
      res,
    });
  };

  getAllLandlord = async (req: Request, res: Response): Promise<Response> => {
    const { page = 0 } = req.query;
    const currentPage: number = +page;
    const pageNumber = paginator(currentPage, PAGE_LIMIT);
    const landlordList = await this.userService.findByUserType(
      UserType.LANDLORD,
      pageNumber,
    );
    return this.responseUtil.success({
      statusCode: OK,
      message: `success`,
      data: { landlordList, currentPage, pageSize: PAGE_LIMIT },
      res,
    });
  };

  updateProfile = async (req: Request, res: Response): Promise<Response> => {
    const userId = parseInt(req.params.userId, 10);
    const updatedInfo: UpdateUserDto = req.body;

    const updatedUser = await this.userService.update(userId, updatedInfo);

    return this.responseUtil.success({
      statusCode: OK,
      message: updated('Your information'),
      data: updatedUser,
      res,
    });
  };

  editProfile = async (
    req: IRequestWithUser,
    res: Response,
  ): Promise<Response> => {
    const { currentUser, userProfile } = req;
    const updatedInfo: UpdateUserDto = req.body;

    if (currentUser.userId !== userProfile.userId) {
      return this.responseUtil.error({
        statusCode: UNAUTHORIZED,
        message: `Unauthorized access for user`,
        res,
      });
    }

    Object.assign(userProfile, updatedInfo);
    await userProfile.save();
    return this.responseUtil.success({
      statusCode: OK,
      message: `success`,
      data: { profile: userProfile },
      res,
    });
  };

  getProfile = async (
    req: IRequestWithUser,
    res: Response,
  ): Promise<Response> => {
    const { userProfile } = req;
    return this.responseUtil.success({
      statusCode: OK,
      message: `success`,
      data: { profile: userProfile },
      res,
    });
  };

  deactivateUser = async (
    req: IRequestWithUser,
    res: Response,
  ): Promise<Response> => {
    const { currentUser, userProfile } = req;

    if (currentUser.userId !== userProfile.userId) {
      return this.responseUtil.error({
        statusCode: UNAUTHORIZED,
        message: `Unauthorized access for user`,
        res,
      });
    }

    Object.assign(userProfile, { active: false });
    await userProfile.save();
    return this.responseUtil.success({
      statusCode: OK,
      message: `user successfully deactivated`,
      data: { profile: userProfile },
      res,
    });
  };
}
