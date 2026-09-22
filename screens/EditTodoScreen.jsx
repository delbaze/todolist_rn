import { useNavigation, useRoute } from "@react-navigation/native";
import { Text } from "@rneui/themed";
import { useEffect, useState } from "react";
import { View } from "react-native";
import storage from "../lib/storage";
import TodoForm from "../components/TodoForm";

function EditTodoScreen({ route, navigation }) {
  const { id } = route.params || {};

  const [currentTodo, setCurrentTodo] = useState({ id: "", label: "" });
  const loadTodo = async () => {
    const todos = await storage.load({ key: "todoslist", defaultValue: [] });
    const c = todos.find((t) => t.id === id);

    if (c) {
      setCurrentTodo(c);
    }
  };

  const handleEditTodo = async (newLabel) => {
    const updatedTodo = { ...currentTodo, label: newLabel };
    const todos = await storage.load({ key: "todoslist", defaultValue: [] });
    const updatedTodos = todos.map((t) => (t.id === id ? updatedTodo : t));
    storage.save({ key: "todoslist", data: updatedTodos });
    navigation.goBack();
  };
  useEffect(() => {
    if (id) {
      loadTodo();
    }
  }, [id]);

  return (
    <TodoForm
      submitLabel="Éditer la tâche"
      initialValue={currentTodo.label}
      onSubmit={handleEditTodo}
    />
  );
}

export default EditTodoScreen;
