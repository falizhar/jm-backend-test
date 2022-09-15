import { AdminRole } from '../database/entity/Admin';
import { CreateAdminDto } from '../dtos/createAdminDto';
import { LoginAdminDto } from '../dtos/loginAdminDto';

export const adminData: CreateAdminDto = {
  username: 'Alizhar',
  password: 'lalax$123',
  phoneNumber: '087773744040',
  role: AdminRole.ADMIN,
};
export const adminLoginData: LoginAdminDto = {
  username: 'Alizhar',
  password: 'lalax$123',
};
