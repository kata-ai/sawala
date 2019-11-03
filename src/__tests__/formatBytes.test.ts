import formatBytes from '../libs/utils/formatBytes';

enum Format {
  Bytes = 'Bytes',
  KB = 'KB',
  MB = 'MB',
  GB = 'GB',
  TB = 'TB',
  PB = 'PB',
  EB = 'EB',
  ZB = 'ZB',
  YB = 'YB'
}
const FILES = {
  Bytes: 1000,
  KB: 10000,
  MB: 10000000,
  GB: 10000000000,
  TB: 10000000000000,
  PB: 10000000000000000,
  EB: 10000000000000000000,
  ZB: 10000000000000000000000,
  YB: 10000000000000000000000000
};

describe("Check to 'formatBytes' method.", () => {
  test('The file should be format as Bytes.', () => {
    expect(formatBytes(FILES.Bytes)).toContain(Format.Bytes);
  });

  test('The file should be format as KB.', () => {
    expect(formatBytes(FILES.KB)).toContain(Format.KB);
  });

  test('The file should be format as MB.', () => {
    expect(formatBytes(FILES.MB)).toContain(Format.MB);
  });

  test('The file should be format as GB.', () => {
    expect(formatBytes(FILES.GB)).toContain(Format.GB);
  });

  test('The file should be format as TB.', () => {
    expect(formatBytes(FILES.TB)).toContain(Format.TB);
  });

  test('The file should be format as PB.', () => {
    expect(formatBytes(FILES.PB)).toContain(Format.PB);
  });

  test('The file should be format as EB.', () => {
    expect(formatBytes(FILES.EB)).toContain(Format.EB);
  });

  test('The file should be format as ZB.', () => {
    expect(formatBytes(FILES.ZB)).toContain(Format.ZB);
  });

  test('The file should be format as YB.', () => {
    expect(formatBytes(FILES.YB)).toContain(Format.YB);
  });
});
