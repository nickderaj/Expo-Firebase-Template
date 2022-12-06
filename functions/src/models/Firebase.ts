import { CallableContext } from 'firebase-functions/v1/https';

export enum StatusEnum {
  OK = 200,
  CREATED = 201,
  ERROR = 400,
  SERVER_ERROR = 500,
}

// Generics
export type HttpResponse = {
  status: StatusEnum.OK | StatusEnum.CREATED;
  data?: object | string;
};

export type HttpErrorResponse = {
  status: StatusEnum.ERROR | StatusEnum.SERVER_ERROR;
  error: object | string;
};

export type FirebaseFunction = (
  admin: typeof import('firebase-admin'),
  data?: any,
  context?: CallableContext,
) => Promise<HttpResponse | HttpErrorResponse>;
