import { HttpErrorResponse, HttpResponse } from '@/models/Firebase'
import { IUser } from '@/models/User'

export type loginReq = IUser
export type loginRes = HttpResponse | HttpErrorResponse
