export const maxSize = (array, size) => {
  return array.filter((v, i) => i <= (size - 1));
}