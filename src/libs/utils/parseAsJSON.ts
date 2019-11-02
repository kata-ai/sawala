/**
 * parse any string value as JSON
 * @param arg
 */
export default function parseAsJSON(arg: string = ''): JSON {
  if (arg) {
    return JSON.parse(arg);
  }
  return JSON.parse('{}');
}
