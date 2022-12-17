import { functions } from '@/firebase/config'
import { friendRequestReq, friendRequestRes } from '@/models/Friends'
import { httpsCallable } from 'firebase/functions'

// Send friend request
export const sendFriendRequest = async (uid: string, friendId: string) => {
  const fetch = httpsCallable<friendRequestReq, friendRequestRes>(functions, 'sendFriendRequest')
  const res = (await fetch({ uid, friendId })).data
  return res
}
