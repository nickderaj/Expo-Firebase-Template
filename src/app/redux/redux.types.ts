import { LoginEnum } from '@/models/Auth'
import { IUser } from '@/models/User'

export interface IUserState {
  userObj?: IUser
  loginMethod?: LoginEnum
  email: string
  name: string
}

export interface IConfigState {
  music: boolean
  sfx: boolean
  vibrate: boolean
}
