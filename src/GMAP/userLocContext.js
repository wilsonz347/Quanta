import { createContext } from "react";

export const UserLocationContext = createContext({
  userLocation: null,
  setUserLocation: () => {},
});
