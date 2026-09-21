import { StyleSheet, Text, View } from "react-native";

function ProfileScreen() {
  return (
    <View style={styles.container}>
      <Text>Ici il y aura le profil</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});

export default ProfileScreen;