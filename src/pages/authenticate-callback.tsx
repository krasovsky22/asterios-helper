import { useQueryParams } from "@/hooks";
import { fetchAccessToken, fetchAuthenticatedUser } from "@utils/access-token";
import { useDidMount } from "beautiful-react-hooks";
import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import { useAuthContext } from "@context/auth";

const AuthenticateCallback: React.FC = () => {
  const { code } = useQueryParams()!;
  const { setUser } = useAuthContext();

  const [state, setState] = useState({
    authorized: false,
    authorizationError: "",
  });

  useDidMount(async () => {
    const response = await fetchAccessToken(code as string);

    if (response.error && response.error_description) {
      setState({ ...state, authorizationError: response.error_description });
      return;
    }

    const user = await fetchAuthenticatedUser();

    user && setUser(user);
    console.log(user);

    setState({ ...state, authorized: true });
  });

  const { authorized, authorizationError } = state;
  if (authorized || authorizationError) {
    return (
      <Redirect
        to={{
          pathname: "/",
        }}
      />
    );
  }

  return <div>Loading...</div>;
};

export default AuthenticateCallback;
