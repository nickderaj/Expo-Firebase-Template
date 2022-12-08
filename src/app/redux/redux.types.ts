import { LoginEnum } from '@/models/Auth'
import { IUser } from '@/models/User'

export interface IAuthState {
  loginMethod?: LoginEnum
  token: string
  email: string
  name: string
}

export interface IUserState {
  userObj?: IUser
  testNum: number
}
