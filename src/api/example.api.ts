import { functions } from '@/firebase/config'
import { httpsCallable } from 'firebase/functions'
import { loginReq, loginRes } from './api.types'

export const login = async (uid: string) => {
  const fetch = httpsCallable<loginReq, loginRes>(functions, 'login')
  const res = (await fetch({ uid })).data
  return res
}
