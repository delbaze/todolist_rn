import { View, Text, StyleSheet } from "react-native";
import MonComposant from "./MonComposant";

function Item({ todo, demo, children }) {
  // children (une clé créé par react si vous injectez un enfant dans le composant)
  return (
    <View style={styles.item} key={todo.id}>
      <Text style={styles.title}>{todo.label}</Text>
      {children}
      <MonComposant demo={demo} />
    </View>
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
});

export default Item;
