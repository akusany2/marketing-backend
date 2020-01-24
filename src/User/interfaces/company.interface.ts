import { User } from './user.interface';
export interface Company {
  companyId: string;
  companyName: string;
  address: string;
  users: [User];
}
