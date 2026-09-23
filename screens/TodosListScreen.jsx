import {
  FlatList,
  StyleSheet,
  Text,
  View,
  Button,
  ActivityIndicator,
  Alert,
} from "react-native";
import { FAB } from "@rneui/themed";
import { useCallback, useMemo } from "react";
import storage from "../lib/storage";
import Item from "../components/Item";
import { useLoading } from "../contexts/LoaderContext";
import Loader from "../components/Loader";
import { useSettings } from "../contexts/SettingsContext";
import { useTodosStore } from "../store/todoStore";
function TodoListScreen({ navigation }) {
  const { preferences } = useSettings();

  const todosFromStore = useTodosStore((state) => state.todos);
  const addTodoFromStore = useTodosStore((state) => state.addTodo);
  const clearFromStore = useTodosStore((state) => state.clearTodos);
  const removeTodoFromStore = useTodosStore((state) => state.removeTodo);
  const toggleTodoFromStore = useTodosStore((state) => state.toggleTodo);
  const hasHydrated = useTodosStore((state) => state.hasHydrated);

  // addTodoFromStore("ma tache depuis le store");
  const handleCreateTodo = () => {
    navigation.navigate("CreateTodo");
  };
  const handleDelete = (id) => {
    Alert.alert(
      "Suppression d'une tâche",
      "Êtes vous sûr de vouloir supprimer cette tâche ? ",
      [
        { text: "Annuler", style: "cancel" },
        {
          text: "Supprimer",
          style: "destructive",
          onPress: () => removeTodoFromStore(id),
        },
      ],
    );
  };

  const handleToggleTodo = (id) => {
    toggleTodoFromStore(id);
  };

  const filteredTodos = useMemo(() => {
    return todosFromStore.filter((todo) => {
      if (!preferences?.showTodoDone && todo.done) {
        return false; // Si showTodoDone est false ET que la todo est terminée, on la masque
      }
      return true; // Sinon on l'affiche
    });
  }, [todosFromStore, preferences?.showTodoDone]); // ici le tableau de dépendance de useMemo dit : "seulement si todos OU preferences.showTodoDone changent, on recalcule le tableau (autrement dit on refait le filter)"

  return (
    <View style={styles.container}>
      {!hasHydrated ? (
        <Loader />
      ) : (
        <FlatList
          keyExtractor={(todo) => todo.id}
          style={{ alignSelf: "stretch" }}
          data={filteredTodos}
          renderItem={({ item }) => (
            <Item
              todo={item}
              onDelete={handleDelete}
              onToggle={handleToggleTodo}
            />
          )}
        />
      )}
      <FAB
        icon={{ name: "add", color: "white", type: "ionicon" }}
        color="orange"
        placement="right"
        onPress={handleCreateTodo}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
});

export default TodoListScreen;
