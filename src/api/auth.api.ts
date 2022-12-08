import { functions } from '@/firebase/config'
import { LoginEnum, loginReq, loginRes } from '@/models/Auth'
import { IUser } from '@/models/User'
import { httpsCallable } from 'firebase/functions'

export const login = async (uid: string, loginMethod: LoginEnum, expoToken?: string) => {
  const nonce = Math.floor(Math.random() * 1000000)

  const userObj: IUser = {
    id: uid,
    username: `${loginMethod}_${uid.substring(0, 5)}`,
    username_lower: `${loginMethod}_${uid.substring(0, 5)}`,
    web3_address: uid,
    created_at: new Date(),
    guest: loginMethod === 'guest' ? true : false,
  }

  const fetch = httpsCallable<loginReq, loginRes>(functions, 'login')
  const res = (await fetch({ uid, userObj, nonce, expoToken })).data
  return res
}
