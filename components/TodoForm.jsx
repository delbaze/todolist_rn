import { View, StyleSheet } from "react-native";
import { Input, Button } from "@rneui/themed";
import { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";

function TodoForm({
  initialValue = "",
  submitLabel = "Ajouter la tâche",
  onSubmit,
}) {
  const navigation = useNavigation();
  const [monTexte, setMonTexte] = useState(initialValue);

  const handleChangeMonTexte = (nouveauTexte) => {
    setMonTexte(nouveauTexte);
  };
  const handleSubmit = () => {
    if (monTexte.trim()) {
      onSubmit(monTexte);
    }
  };
  useEffect(() => {
    setMonTexte(initialValue);
  }, [initialValue]);
  
  return (
    <View style={styles.container}>
      <Input
        placeholder="Indiquez votre tâche ici..."
        leftIcon={{ type: "ionicon", name: "rocket" }}
        onChangeText={handleChangeMonTexte}
        value={monTexte}
      />
      <View style={styles.buttons}>
        <Button
          title="Annuler"
          type="clear"
          raised
          titleStyle={{ color: "blue" }}
          containerStyle={{
            width: 100,
            marginVertical: 10,
          }}
          onPress={() => navigation.goBack()}
        />
        <Button
          title={submitLabel}
          buttonStyle={{
            borderColor: "blue",
          }}
          disabled={!monTexte.length}
          type="outline"
          raised
          titleStyle={{ color: "blue" }}
          containerStyle={{
            width: 200,
            marginVertical: 10,
          }}
          onPress={handleSubmit}
        />
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
  buttons: {
    flexDirection: "row",
    gap: 5,
    justifyContent: "center",
  },
});

export default TodoForm;
