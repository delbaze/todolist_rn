import { View, Text, StyleSheet } from "react-native";
import { Icon, ListItem } from "@rneui/themed";
import { useNavigation } from "@react-navigation/native";
function Item({ todo, onDelete, onToggle }) {
  // children (une clé créé par react si vous injectez un enfant dans le composant)
  const navigation = useNavigation();
  return (
    <ListItem
      bottomDivider
      containerStyle={{
        backgroundColor: todo.done ? "#fdfdfdf" : "white",
        alignSelf: "stretch",
      }}
    >
      <ListItem.CheckBox
        iconType="ionicon"
        checkedIcon="checkbox-outline"
        uncheckedIcon="square-outline"
        checked={todo.done}
        onPress={() => onToggle(todo.id)}
      />
      <ListItem.Content>
        <ListItem.Title
          style={{
            color: todo.done ? "gray" : "black",
            textDecorationLine: todo.done ? "line-through" : "none",
          }}
        >
          {todo.label}
        </ListItem.Title>
      </ListItem.Content>
      <ListItem.Content right style={styles.actions}>
        <Icon
          type="ionicon"
          name="pencil"
          color="gray"
          disabled={todo.done}
          onPress={() =>
            navigation.navigate("EditTodo", {
              id: todo.id,
              toto: "tata",
              titi: "tutu",
            })
          }
          // comme une route => params => route.params.id
        />
        <Icon
          type="ionicon"
          name="trash"
          color="red"
          disabled={todo.done}
          onPress={() => onDelete(todo.id)}
        />
      </ListItem.Content>
    </ListItem>
  );
}

const styles = StyleSheet.create({
  item: {
    backgroundColor: "#f9c2ff",
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 32,
  },
  actions: {
    flexDirection: "row",
    gap: 15,
  },
});

export default Item;
