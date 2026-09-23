import { View, Text, StyleSheet } from "react-native";
import { Controller, useForm } from "react-hook-form";
import { Button, Input } from "@rneui/themed";
import { useLogin } from "../requests/useLogin";
function LoginScreen() {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: { username: "", password: "" },
  });

  const { mutate, isPending, isError, error } = useLogin();
  const onSubmit = (formData) => {
    console.log("FORM DATA", formData);
    mutate(formData);
  };
  return (
    <View style={styles.container}>
      <Controller
        control={control}
        name="username"
        rules={{ required: "Le nom de l'utilisateur est requis" }}
        render={({ field: { onChange, onBlur, value } }) => (
          <Input
            label="Nom d'utilisateur"
            value={value}
            onChangeText={onChange}
            onBlur={onBlur}
            errorMessage={errors.username?.message}
          />
        )}
      />
      <Controller
        control={control}
        name="password"
        rules={{
          required: "Le mot de passe est requis",
          minLength: { value: 4, message: "4 caractères minimum" },
        }}
        render={({ field: { onChange, onBlur, value } }) => (
          <Input
            secureTextEntry
            label="Mot de passe"
            value={value}
            onChangeText={onChange}
            onBlur={onBlur}
            errorMessage={errors.password?.message}
          />
        )}
      />
      {isError && <Text style={{ color: "red" }}>{error.message}</Text>}
      <Button
        title="Se connecter"
        onPress={handleSubmit(onSubmit)}
        loading={isPending}
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

export default LoginScreen;
