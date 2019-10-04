import { Payload } from 'types';

export default function getPayload(
  url: string,
  file: File,
  caption: string = ''
): Partial<Payload> {
  return {
    url,
    caption,
    file_name: file.name,
    size: file.size
  };
}
