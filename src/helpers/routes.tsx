import { SIGN_IN } from "@/constants/routes";
import { AuthUserType } from "@/types";
import React from "react";
import { Route, Redirect, RouteProps } from "react-router-dom";

interface IsUserRedirectType extends RouteProps {
  user: AuthUserType;
  loggedInPath: string;
  children: React.ReactNode;
}
export const IsUserRedirect: React.FC<IsUserRedirectType> = ({
  user,
  loggedInPath,
  children,
  ...rest
}) => {
  return (
    <Route
      {...rest}
      render={() => {
        if (!user) {
          return children;
        }

        //if use logged in, redirect to path
        if (user) {
          return <Redirect to={{ pathname: loggedInPath }} />;
        }

        return null;
      }}
    />
  );
};

interface ProtectedRouteType extends RouteProps {
  user: AuthUserType;
  children: React.ReactNode;
}

export const ProtectedRoute: React.FC<ProtectedRouteType> = ({ user, children, ...rest }) => {
  return (
    <Route
      {...rest}
      render={({ location }) => {
        if (user) {
          return children;
        }

        if (!user) {
          return <Redirect to={{ pathname: SIGN_IN, state: { from: location } }} />;
        }

        return null;
      }}
    />
  );
};
