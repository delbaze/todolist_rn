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
  removeTodo: async (id) => {
    try {
      const todos = await storage.load({ key: "todoslist", defaultValue: [] });
      const updatedTodos = todos.filter((t) => t.id !== id);
      await storage.save({ key: "todoslist", data: updatedTodos });
      //   await AsyncStorage.removeItem(id);
      return updatedTodos;
    } catch (error) {
      console.error("Erreur suppression", error);
    }
  },
  toggleTodo: async (id) => {
    try {
      const todos = await storage.load({ key: "todoslist", defaultValue: [] });
      const updatedTodos = todos.map((todo) =>
        todo.id === id ? { ...todo, done: !todo.done } : todo
      );
      await storage.save({ key: "todoslist", data: updatedTodos });
      return updatedTodos;
    } catch (error) {
      console.error("Erreur lors du toggle:", error);
    }
  },
};

export default storage;
