export enum ErrorMessageCode {
  BadRequest = 400,
  Unauthorized = 401,
  PaymentRequired = 402,
  Forbidden = 403,
  NotFound = 404
}

export type ErrorMessage = {
  message: string;
  code: ErrorMessageCode;
  response: any;
};
