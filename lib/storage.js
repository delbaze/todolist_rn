// ici on créera le storage

import AsyncStorage from "@react-native-async-storage/async-storage";

const storage = {
  save: async ({ key, data }) => {
    // ici key = todolist, data : { id: "123456789", label: "Ma todo", done: false}
    try {
      await AsyncStorage.setItem(key, JSON.stringify(data));
    } catch (error) {
      console.error("Erreur de sauvegarde:", error);
    }
  },
  load: async ({ key, defaultValue = null }) => {
    try {
      const data = await AsyncStorage.getItem(key);
      return data ? JSON.parse(data) : defaultValue;
    } catch (error) {
      console.error("Erreur de chargement: ", error);
      return defaultValue;
    }
  },
  remove: async () => {},
};

export default storage;
