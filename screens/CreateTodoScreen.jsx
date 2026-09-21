import { StyleSheet, Text, View } from "react-native";
import { useEffect, useState } from "react";
import { Input, Button } from "@rneui/themed";
import { useNavigation } from "@react-navigation/native";
function CreateTodoScreen() {
  const [monTexte, setMonTexte] = useState(
    "Ici il y aura la création des todos",
  );
  const navigation = useNavigation();

  // ici je dis que monTexte peut être amené à changé, et que la vue devra s'actualisé si c'est le cas

  useEffect(() => {
    console.log("monTexte", monTexte);
  }, [monTexte]); // QUAND MON TEXTE CHANGE, je tombe dans ce callback

  useEffect(() => {
    console.log("Le screen est chargé"); // quand le composant est chargé

    // cleanup // une fonction jouée quand le composant est déchargé
    return () => {
      console.log("Le screen se décharge");
    };
  }, []); // si le tableau de dépendance est vide, on rentre dans ce callback uniquement au chargement du composant

  // useEffect(() => {
  //   console.log("Le screen est chargé OU le composant s'est re rendu");
  // }); // dangeureux, il faut faire attention aux effets de bords en cascade

  const handleChangeMonTexte = (nouveauTexte) => {
    setMonTexte(nouveauTexte);
    // ici vu qu'on vient de mettre monTexte à jour, on s'attendrait à voir la dernière valeur dans "monTexte"
    console.log("nouveauTexte", nouveauTexte);
  };

  const handleAddTodo = () => {
    console.log("Ici on fera l'ajout de tâche");
  }
  return (
    <View style={styles.container}>
      <Input
        placeholder="Indiquez votre tâche ici..."
        leftIcon={{ type: "ionicon", name: "rocket" }}
        onChangeText={handleChangeMonTexte}
      />
      <View style={styles.buttons}>
        <Button
          title="Annuler"
          buttonStyle={{
            borderColor: "blue",
          }}
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
          title="Ajouter la tâche"
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
          onPress={handleAddTodo}
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

export default CreateTodoScreen;
