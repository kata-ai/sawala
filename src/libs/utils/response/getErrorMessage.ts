import { ErrorMessage, ErrorMessageCode } from 'types';

export default function getErrorMessage(
  message: string,
  code: ErrorMessageCode,
  response: any = {}
): ErrorMessage {
  return {
    message,
    code,
    response
  };
}
