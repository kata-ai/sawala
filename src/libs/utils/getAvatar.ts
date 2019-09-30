import { AVATAR } from 'default';

export default function getAvatar(url: string) {
  if (url) {
    return url;
  }
  return AVATAR;
}
