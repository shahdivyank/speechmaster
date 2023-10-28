export function blobToBase64(blob) {
  return new Promise((resolve, _) => {
    if (blob) {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result);
      reader.readAsDataURL(blob);
    }
  });
}
