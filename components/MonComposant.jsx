import { View, Text } from "react-native";
import MonComposant2 from "./MonComposant2";
function MonComposant({ demo }) {
  return (
    <View>
      <Text>Je suis mon Composant</Text>
      <MonComposant2 demo={demo} />
    </View>
  );
}

export default MonComposant;
