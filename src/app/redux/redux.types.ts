import { LoginEnum } from '@/models/Auth'
import { IUser } from '@/models/User'

export interface IAuthState {
  loginMethod?: LoginEnum
}

export interface IUserState {
  userObj?: IUser
  testNum: number
}
