import { StyleSheet, Text, View } from "react-native";
import { FAB } from "@rneui/themed";
import { useNavigation } from "@react-navigation/native";

function TodoListScreen() {
  const navigation = useNavigation();

  const handleCreateTodo = () => {
    navigation.navigate("CreateTodo");
  };

  return (
    <View style={styles.container}>
      <Text>Je suis l'accueil</Text>
      <FAB
        icon={{ name: "add", color: "white", type: "ionicon" }}
        color="orange"
        placement="right"
        onPress={handleCreateTodo}
        // onPress={() => {
        //   console.log("Coucou");
        // }}
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
