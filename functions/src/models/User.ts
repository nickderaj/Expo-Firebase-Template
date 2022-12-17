import { LoginEnum } from './Auth';

export interface IUser {
  id: string;
  username: string;
  login_method: LoginEnum;
  created_at: Date;
}
