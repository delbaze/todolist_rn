import { FlatList, StyleSheet, Text, View } from "react-native";
import { FAB } from "@rneui/themed";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { useCallback, useEffect, useState } from "react";
import storage from "../lib/storage";

function TodoListScreen() {
  const navigation = useNavigation();

  const [todos, setTodos] = useState([]);
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
        renderItem={({ item }) => (
          <View style={styles.item} key={item.id}>
            <Text style={styles.title}>{item.label}</Text>
          </View>
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
  item: {
    backgroundColor: "#f9c2ff",
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 32,
  },
});

export default TodoListScreen;
