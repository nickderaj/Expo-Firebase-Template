import { functions } from '@/firebase/config'
import { friendRequestReq, friendRequestRes } from '@/models/Friends'
import { httpsCallable } from 'firebase/functions'

// Send friend request or Accept pending request
export const friendRequest = async (uid: string, friendId: string) => {
  const fetch = httpsCallable<friendRequestReq, friendRequestRes>(functions, 'friendRequest')
  const res = (await fetch({ uid, friendId })).data
  return res
}
