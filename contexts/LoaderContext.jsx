import { createContext, useContext, useState } from "react";

export function useLoading() {
  const contextLoader = useContext(ContextLoader);
  return contextLoader;
}

export const ContextLoader = createContext({
  loading: true,
  setLoading: () => {},
});

function LoaderProvider({ children }) {
  const [loading, setLoading] = useState(true);

  return (
    <ContextLoader.Provider value={{ loading, setLoading }}>
      {children}
    </ContextLoader.Provider>
  );
}

export default LoaderProvider;
// Zustand
// Redux
// => store
