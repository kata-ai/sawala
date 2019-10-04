import { CommentType, Payload, ErrorMessageCode } from 'types';
import { getErrorMessage } from 'libs/utils/response';
import { MESSAGE } from 'default';

export default function sendComment(
  text: string,
  uniqueId: string = '',
  type: CommentType = CommentType.Text,
  payload: Partial<Payload> = {}
) {
  const { selected } = window.qiscus;
  if (selected && window.qiscus) {
    return window.qiscus
      .sendComment(selected.id, text, uniqueId, type, JSON.stringify(payload))
      .then((response: any) => {
        return Promise.resolve(response);
      })
      .catch((error: any) => Promise.reject(error));
  }

  return Promise.reject(
    getErrorMessage(MESSAGE.EMPTY_QISCUS_SELECTED, ErrorMessageCode.BadRequest)
  );
}
