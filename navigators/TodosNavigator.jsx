import { createStackNavigator } from "@react-navigation/stack";
import TodoListScreen from "../screens/TodosListScreen";
import CreateTodoScreen from "../screens/CreateTodoScreen";
import { SafeAreaView } from "react-native-safe-area-context";

import { StyleSheet, Text, View } from "react-native";
import EditTodoScreen from "../screens/EditTodoScreen";

const Stack = createStackNavigator();

function TodosNavigator() {
  return (
    <SafeAreaView style={styles.container} edges={["bottom"]}>
      <Stack.Navigator>
        <Stack.Screen
          name="TodosList"
          component={TodoListScreen}
          options={{ headerTitle: "Liste des todos" }}
        />
        <Stack.Screen name="CreateTodo" component={CreateTodoScreen} />
        <Stack.Screen name="EditTodo" component={EditTodoScreen} />
      </Stack.Navigator>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
  },
});
export default TodosNavigator;
