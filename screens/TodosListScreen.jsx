import { FlatList, StyleSheet, Text, View, Button } from "react-native";
import { FAB } from "@rneui/themed";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { useCallback, useContext, useEffect, useState } from "react";
import storage from "../lib/storage";
import Item from "../components/Item";
import { useLoading } from "../contexts/LoaderContext";
// import { ContextLoader } from "../contexts/LoaderContext";
function TodoListScreen() {
  const navigation = useNavigation();
  // const contextLoader = useContext(ContextLoader)
  const {loading, setLoading} = useLoading();

  const [todos, setTodos] = useState([]);
  const [demo, setDemo] = useState("hello");
  const handleCreateTodo = () => {
    navigation.navigate("CreateTodo");
  };

  const fetchTodos = async () => {
    const todos = await storage.load({ key: "todoslist", defaultValue: [] });
    setTodos(todos);
  };

  // useEffect(() => {
  //   fetchTodos();
  // }, []);

  // useEffect(() => {
  //   const unsubscribe = navigation.addListener('focus', () => {
  //     console.log("je suis focus!");
  //     fetchTodos();
  //   })

  //   return unsubscribe;
  // }, [navigation]);

  useFocusEffect(
    useCallback(() => {
      fetchTodos();
    }, []),
  );
  return (
    <View style={styles.container}>
      <Text>Je suis l'accueil</Text>
      <FAB
        icon={{ name: "add", color: "white", type: "ionicon" }}
        color="orange"
        placement="right"
        onPress={handleCreateTodo}
      />
      {/* {todos.map((todo, index) => {
        return (
          <View style={styles.item} key={todo.id}>
            <Text style={styles.title}>{todo.label}</Text>
          </View>
        );
      })} */}
      <FlatList
        keyExtractor={(todo) => todo.id}
        data={todos}
        // renderItem={({ item }) => <Item todo={item} />}
        renderItem={({ item }) => (
          <Item todo={item} demo={demo}>
            <Text>Je suis l'enfant de item</Text>
          </Item>
        )}
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
