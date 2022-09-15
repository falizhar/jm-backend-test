import { User } from '../entity/User';
import { CreateUserDto } from '../../dtos/createUserDto';
import { UpdateUserDto } from '../../dtos/updateUserDto';
import { PAGE_LIMIT } from '../../constants/shared';

export class UserService {
  findPhoneNumber = async (phoneNumber: string): Promise<User | undefined> => {
    return await User.findOne({ phoneNumber });
  };

  findById = async (userId: number): Promise<User | undefined> => {
    return await User.findOne({ userId, active: true });
  };

  updateByPhoneNumber = async (phoneNumber: string): Promise<User> => {
    const userFound = await User.findOne({ phoneNumber: phoneNumber });
    if (!userFound) {
      throw new Error(
        `The user with phone number: ${phoneNumber} does not exist!`,
      );
    }
    Object.assign(userFound);
    return await userFound.save();
  };

  create = async (userData: CreateUserDto): Promise<User> => {
    return await User.create(userData).save();
  };

  findByUserType = async (
    userType: string,
    pageNumber: number,
  ): Promise<User[]> => {
    const users = await User.find({
      where: { userType, active: true },
      take: PAGE_LIMIT,
      skip: pageNumber,
    });
    return users;
  };

  update = async (
    userId: number,
    updatedInfo: UpdateUserDto,
  ): Promise<User | null> => {
    const user = await this.findById(userId);
    if (user) {
      User.merge(user, updatedInfo);
      const updatedUser = await User.save(user);
      return updatedUser;
    }
    return null;
  };
}
