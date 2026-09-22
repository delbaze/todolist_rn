import { StyleSheet, Text, View } from "react-native";
import { Avatar, ListItem, Icon, Switch } from "@rneui/themed";

function ProfileScreen() {
  return (
    <View style={styles.container}>
      <Avatar
        containerStyle={{ backgroundColor: "gray" }}
        rounded
        size={150}
        icon={{ type: "ionicon", name: "person", color: "whitesmoke" }}
      />

      <View style={styles.list}>
        <ListItem bottomDivider>
          <Icon type="ionicon" name="settings" />
          <ListItem.Content>
            <ListItem.Title>
              <Text>Afficher les todos terminées</Text>
            </ListItem.Title>
          </ListItem.Content>
          <ListItem.Content right>
            <Switch />
          </ListItem.Content>
        </ListItem>
      </View>
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
  list: { width: 430, padding: 20 },
});

export default ProfileScreen;
