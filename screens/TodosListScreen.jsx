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
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { useCallback, useContext, useEffect, useState } from "react";
import storage from "../lib/storage";
import Item from "../components/Item";
import { useLoading } from "../contexts/LoaderContext";
import Loader from "../components/Loader";
function TodoListScreen({navigation}) {
  // const navigation = useNavigation();
  const { loading, setLoading } = useLoading();

  const [todos, setTodos] = useState([]);
  const handleCreateTodo = () => {
    navigation.navigate("CreateTodo");
  };

  const fetchTodos = async () => {
    setLoading(true);
    const todos = await storage.load({ key: "todoslist", defaultValue: [] });
    setTodos(todos);
    // setTimeout(() => {
      // simulation d'un temps long pour récupérer le loader
      setLoading(false);
    // }, 2000);
  };

  const deleteTodo = async (id) => {
    setLoading(true);
    const updatedTodos = await storage.removeTodo(id);
    if (updatedTodos) {
      setTodos(updatedTodos);
    }
    setLoading(false);
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
          onPress: () => deleteTodo(id),
        },
      ],
    );
  };
  useFocusEffect(
    useCallback(() => {
      fetchTodos();
    }, []),
  );
  return (
    <View style={styles.container}>
   

      {loading ? (
        <Loader />
      ) : (
        <FlatList
          keyExtractor={(todo) => todo.id}
          style={{ alignSelf: "stretch" }}
          data={todos}
          renderItem={({ item }) => (
            <Item todo={item} onDelete={handleDelete} />
          )}
          onRefresh={fetchTodos}
          refreshing={loading}
          // ListEmptyComponent={<View><Text>Il n'y a pas de todos</Text></View>}
          // ListFooterComponent={isFetchingNextPage ? <ActivityIndicator /> : null}
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
