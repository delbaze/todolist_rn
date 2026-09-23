import { Avatar, ListItem } from "@rneui/themed";
import { useQuery } from "@tanstack/react-query";
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  FlatList,
} from "react-native";
function UsersListScreen() {
  const { data, isPending, isError, error, isRefetching, refetch } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const response = await fetch("https://dummyjson.com/users?limit=20");

      if (!response.ok) {
        throw new Error("impossible de récupérer les utilisateurs");
      }
      return response.json();
    },
  });

  if (isPending) {
    return <ActivityIndicator size={"large"} style={{ flex: 1 }} />;
  }

  if (isError) {
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
        data={data.users}
        keyExtractor={(user) => user.id.toString()}
        onRefresh={refetch}
        refreshing={isRefetching}
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
