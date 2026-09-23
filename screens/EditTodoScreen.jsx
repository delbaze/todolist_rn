import { useNavigation, useRoute } from "@react-navigation/native";
import { Text } from "@rneui/themed";
import { useEffect, useState } from "react";
import { View } from "react-native";
import storage from "../lib/storage";
import TodoForm from "../components/TodoForm";
import { useTodosStore } from "../store/todoStore";

function EditTodoScreen({ route, navigation }) {
  const { id } = route.params || {};

  const todoToEdit = useTodosStore((state) =>
    state.todos.find((t) => t.id === id),
  );
  const updateTodoFromStore = useTodosStore((state) => state.updateTodo);

  const handleEditTodo = async (newLabel) => {
    if (id) {
      updateTodoFromStore(id, newLabel);
    }
    navigation.goBack();
  };
  return (
    <TodoForm
      submitLabel="Éditer la tâche"
      initialValue={todoToEdit?.label || ""}
      onSubmit={handleEditTodo}
    />
  );
}

export default EditTodoScreen;
