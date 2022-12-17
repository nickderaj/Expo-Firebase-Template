import { CallableContext } from 'firebase-functions/v1/https';

export enum StatusEnum {
  OK = 200,
  CREATED = 201,
  ERROR = 400,
  SERVER_ERROR = 500,
}

export type FirebaseDate = { _nanoseconds: number; _seconds: number };
export type Transaction = FirebaseFirestore.Transaction;
export type Admin = typeof import('firebase-admin');

// Generics
export type HttpResponse = {
  status: StatusEnum.OK | StatusEnum.CREATED;
  data?: any;
};

export type HttpErrorResponse = {
  status: StatusEnum.ERROR | StatusEnum.SERVER_ERROR;
  error: object | string;
};

export type FirebaseFunction = (
  admin: Admin,
  data?: any,
  context?: CallableContext,
) => Promise<HttpResponse | HttpErrorResponse>;
