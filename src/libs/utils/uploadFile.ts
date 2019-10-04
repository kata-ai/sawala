import { ErrorMessageCode } from 'types';
import { getErrorMessage } from 'libs/utils/response';
import { MESSAGE } from 'default';

export default function uploadFile(file?: File) {
  const { selected } = window.qiscus;
  if (file && selected && window.qiscus) {
    return window.qiscus.upload(
      file,
      (error: Error, progress: ProgressEvent, url: string) => {
        if (error) {
          return Promise.reject(
            getErrorMessage(error.message, ErrorMessageCode.BadRequest, error)
          );
        }
        if (url) {
          return Promise.resolve(url);
        }
      }
    );
  }

  return Promise.reject(
    getErrorMessage(MESSAGE.EMPTY_QISCUS_SELECTED, ErrorMessageCode.BadRequest)
  );
}
