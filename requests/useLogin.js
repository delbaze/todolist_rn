import { useMutation } from "@tanstack/react-query";
import { useAuthStore } from "../store/authStore";

export function useLogin() {
  const setSession = useAuthStore((state) => state.setSession);

  return useMutation({
    mutationFn: async ({ username, password }) => {
      const response = await fetch("https://dummyjson.com/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      if (!response.ok) {
        throw new Error("Identifiants incorrects");
      }

      return response.json();
    },
    onSuccess: (data) => {
      setSession(
        {
          firstName: data.firstName,
          lastName: data.lastName,
          image: data.image,
        },
        data.accessToken
      );
    },
  });
}
