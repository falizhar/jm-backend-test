import { Admin } from '../entity/Admin';
import { CreateAdminDto } from '../../dtos/createAdminDto';

export class AdminService {
  findUsername = async (username: string): Promise<Admin | null> => {
    const admin = await Admin.findOne({ username });
    return admin ?? null;
  };

  create = async (adminData: CreateAdminDto): Promise<Admin> => {
    return await Admin.create(adminData).save();
  };

  findById = async (adminId: number): Promise<Admin | null> => {
    const admin = await Admin.findOne({ adminId });
    return admin ?? null;
  };
}
