export default function checkValidImage(path: string): Promise<any> {
  return new Promise(resolve => {
    const img = new Image();
    img.onload = () => resolve({ path, status: 'ok' });
    img.onerror = () => resolve({ path, status: 'error' });

    img.src = path;
  });
}
