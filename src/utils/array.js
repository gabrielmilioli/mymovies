export const maxSize = (array, size) => {
  return array.filter((v, i) => i <= (size - 1));
}

export const random = (array) => {
  return Math.floor(Math.random() * array.length);
}