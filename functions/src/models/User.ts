import { LoginEnum } from './Auth';

export interface IUser {
  id: string;
  username: string;
  created_at: Date;
  loginMethod: LoginEnum;
  referrer_code?: string;
}
