import AsyncStorage from "@react-native-async-storage/async-storage";

const STORAGE_KEY = '_MOVIES';

export const all = async () => {
  const items = await AsyncStorage.getItem(STORAGE_KEY);

  return JSON.parse(items) || [];
};

export const save = async (movie) => {
  let items = await all();

  if (items.some(l => l.id === movie.id)) {
    return;
  }

  items.push(movie);

  await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(items));
};

export const remove = async (id) => {
  const items = await all();

  let excluded = items.filter(l => l.id !== id);

  await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(excluded));

  return excluded;
};

export const exists = async (id) => {
  const items = await all();

  return !!items.filter(l => l.id === id).length;
};