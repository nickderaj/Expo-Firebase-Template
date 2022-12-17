import { FirebaseFunction, HttpErrorResponse, StatusEnum } from './Firebase';

// clickNotification //
export type clickNotiReq = { uid: string; notificationObj?: { identifier: string } };
export type clickNotiRes = { status: StatusEnum.OK };
export type clickNotiFunction = (
  admin: Parameters<FirebaseFunction>[0],
  data: clickNotiReq,
) => Promise<clickNotiRes | HttpErrorResponse>;

// queueNotification //
export type queueNotiReq = { uid: string; sendDate: Date; title: string; body: string };
export type queueNotiRes = { status: StatusEnum.OK };
export type queueNotiFunction = (
  admin: Parameters<FirebaseFunction>[0],
  data: queueNotiReq,
) => Promise<queueNotiRes | HttpErrorResponse>;

// sendNotification //
export type sendNotiReq = { users: string[]; title: string; body: string };
export type sendNotiRes = { status: StatusEnum.OK };
export type sendNotiFunction = (
  admin: Parameters<FirebaseFunction>[0],
  data: sendNotiReq,
) => Promise<sendNotiRes | HttpErrorResponse>;

// sendQueuedNotification //
export type sendQueueReq = { users: string[]; title: string; body: string };
export type sendQueueRes = { status: StatusEnum.OK };
export type sendQueueFunction = (
  admin: Parameters<FirebaseFunction>[0],
) => Promise<sendQueueRes | HttpErrorResponse>;

// updateExpoToken //
export type updateExpoReq = { uid: string; expoToken?: string };
export type updateExpoRes = {
  status: StatusEnum.OK;
  data: { message: string; token: string | null };
};
export type updateExpoFunction = (
  admin: Parameters<FirebaseFunction>[0],
  data: updateExpoReq,
) => Promise<updateExpoRes | HttpErrorResponse>;
