import { Avatar, ListItem } from "@rneui/themed";
import { useQuery } from "@tanstack/react-query";
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  FlatList,
} from "react-native";
import { useEffect, useState } from "react";
function UsersListScreen() {

  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const recupData = async () => {
    const response = await fetch("https://dummyjson.com/users?limit=20", {
      // headers: {
      //   'Proxy-Authorization': '....'
      // }
    });
    if (!response.ok) {
      setError("impossible de récupérer les utilisateurs");
    }
    const data = await response.json();
    setUsers(data.users);
    setLoading(false);
  };

  useEffect(() => {
    recupData();
  }, []);

  
  if (loading) {
    return <ActivityIndicator size={"large"} style={{ flex: 1 }} />;
  }

  if (error) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>{error.message}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        style={{ alignSelf: "stretch" }}
        data={users}
        keyExtractor={(user) => user.id.toString()}
        // onRefresh={refetch}
        // refreshing={isRefetching}
        renderItem={({ item }) => (
          <ListItem>
            <Avatar rounded source={{ uri: item.image }} />
            <ListItem.Content>
              <ListItem.Title>{item.lastName}</ListItem.Title>
              <ListItem.Subtitle>{item.email}</ListItem.Subtitle>
            </ListItem.Content>
          </ListItem>
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
export default UsersListScreen;
