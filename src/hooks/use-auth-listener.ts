import { useContext, useEffect, useState } from "react";
import { FirebaseContext } from "@context/firebase";
import { AuthUserType } from "@/types";

export default function useAuthListener(): { user: AuthUserType } {
  const userJson = localStorage.getItem("authUser");
  const userInitial = userJson ? JSON.parse(userJson) : userJson;

  const [user, setUser] = useState<AuthUserType>(userInitial);

  const { firebase } = useContext(FirebaseContext);

  useEffect(() => {
    const listener = firebase?.auth().onAuthStateChanged((authUser) => {
      if (authUser) {
        localStorage.setItem("authUser", JSON.stringify(authUser));
        setUser(authUser);
      } else {
        localStorage.removeItem("authUser");
        setUser(null);
      }

      //clean up listener
      return () => listener && listener();
    });
  }, []);

  return { user };
}
