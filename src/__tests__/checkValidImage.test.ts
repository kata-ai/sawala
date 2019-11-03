import checkValidImage from '../libs/utils/checkValidImage';

const IMAGES = {
  correct:
    'https://res.cloudinary.com/kata-ai/image/upload/v1572663263/sawala/kata_favicon-02_zzldhx.png',
  wrong:
    'https://api.telegram.org/file/bot925192808:AAHfy0Y0pnVPk_n60w0I6zNJWl4bqzgFXOc/photos/file_9.jpg'
};

describe("Check to 'checkValidImage' method.", () => {
  test('The image should be correct.', () => {
    checkValidImage(IMAGES.correct).then(
      data => {
        expect(data.status).toBe('ok');
      },
      data => {
        expect(data.status).toBe('error');
      }
    );
  });

  test('The image should be wrong.', () => {
    checkValidImage(IMAGES.wrong).then(
      data => {
        expect(data.status).toBe('error');
      },
      data => {
        expect(data.status).toBe('error');
      }
    );
  });
});
