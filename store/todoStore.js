import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

export const useTodosStore = create(
  persist(
    (set, get) => ({
      todos: [],
      hasHydrated: false,
      setHasHydrated: (value) => set({ hasHydrated: value }),

      addTodo: (label) =>
        set((state) => ({
          todos: [
            ...state.todos,
            { id: Date.now().toString(), label, done: false },
          ],
        })),
      updateTodo: (id, newLabel) =>
        set((state) => ({
          todos: state.todos.map((todo) =>
            todo.id === id ? { ...todo, label: newLabel } : todo
          ),
        })),
      toggleTodo: (id) =>
        set((state) => ({
          todos: state.todos.map((todo) =>
            todo.id === id ? { ...todo, done: !todo.done } : todo
          ),
        })),
      removeTodo: (id) =>
        set((state) => ({
          todos: state.todos.filter((todo) => todo.id !== id),
        })),
      clearTodos: () => set((state) => ({ todos: [] })),
    }),
    {
      name: "todos-storage",
      storage: createJSONStorage(() => AsyncStorage),
      partialize: (state) => ({ todos: state.todos}), // partialize reçoit l'état complet et retourne le sous ensemble à sauvegarder dans le storage, ici je ne garde que todos, hasHydrated n'est jamais écrit dans AsyncStorage

      onRehydrateStorage: () => (state) => {
        state?.setHasHydrated(true);
      },
    } // ça persistera
    // dans le storage avec la clé todos-storage, la valeur que j'utilise dans le set
  )
);
