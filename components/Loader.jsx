import { ActivityIndicator, View, StyleSheet } from "react-native";

function Loader() {
  return (
    <View style={[styles.container, styles.horizontal]}>
      <ActivityIndicator size={48} color={"#f26d00"} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
  horizontal: {
    flexDirection: "row",
    justifyContent: "space-around",
    padding: 10,
  },
});
export default Loader;
