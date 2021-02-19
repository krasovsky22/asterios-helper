import Firebase from "firebase/app";
import { createContext } from "react";

type FirebaseContextType = {
  firebase?: Firebase.app.App;
};
export const FirebaseContext = createContext<FirebaseContextType>({});
