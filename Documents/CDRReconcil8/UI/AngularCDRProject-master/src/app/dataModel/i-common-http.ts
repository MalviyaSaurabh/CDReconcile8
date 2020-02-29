export enum RESPONSE_STATUS {
  SUCCESS = <any>"SUCCESS",
  FAILURE = <any>"HTTP",
  ERROR = <any>"ERROR"
}
export enum REQUEST_TYPE {
  DATA = <any>"DATA",
  ACTION = <any>"ACTION"
}
export enum ERROR_TYPE {
  API = <any>"API",
  HTTP = <any>"HTTP"
}

export interface ICommonHttpRequest {
  type: REQUEST_TYPE;
}

export interface ICommonHttpResponse<T> {
  data?: T;
  status: RESPONSE_STATUS;
  code: number;
  message?: string;
  errors?: { [key: string]: string[] };
}

export interface ICommonHttpSuccessResponse<T> {
  data: T;
}

export interface ICommonHttpFailureResponse {
  errors: { [key: string]: string[] };
}

export interface ICommonHttpErrorResponse {
  type: ERROR_TYPE;
  message: string;
  status: number;
}
