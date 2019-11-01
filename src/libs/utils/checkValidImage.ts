// TODO: this method is ok, but currenlty so hard to implement this
export default function checkValidImage(path: string) {
  return new Promise(resolve => {
    const img = new Image();
    img.onload = () => resolve({ path, status: 'ok' });
    img.onerror = () => resolve({ path, status: 'error' });

    img.src = path;
  }
}
