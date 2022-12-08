export interface IUser {
  id: string;
  username: string;
  username_lower: string;
  web3_address: string;
  created_at: Date;
  guest: boolean;
  referrer_code?: string;
}
