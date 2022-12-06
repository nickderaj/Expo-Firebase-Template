import { FirebaseFunction, HttpErrorResponse, HttpResponse } from '@/models/Firebase';
import { IUser } from '@/models/User';

export type LoginFunction = (
  admin: Parameters<FirebaseFunction>[0],
  data: IUser,
  context: Parameters<FirebaseFunction>[2],
) => Promise<HttpResponse | HttpErrorResponse>;
