import { functions } from '@/firebase/config'
import { LoginEnum, loginReq, loginRes } from '@/models/Auth'
import { httpsCallable } from 'firebase/functions'

// Login or Create account
export const login = async (uid: string, loginMethod: LoginEnum, expoToken?: string) => {
  const fetch = httpsCallable<loginReq, loginRes>(functions, 'login')
  const res = (await fetch({ uid, loginMethod, expoToken })).data
  return res
}
