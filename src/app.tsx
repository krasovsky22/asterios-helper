import { Home } from "@/pages";
import React from "react";
import { BrowserRouter as Router, Switch } from "react-router-dom";

const App: React.FC = () => {
  return (
    <Router>
      <Switch>
        {/* <IsUserRedirect user={user} loggedInPath={ROUTES.BROWSE} path={ROUTES.SIGN_UP} exact>
          <SignUp />
        </IsUserRedirect>

        <IsUserRedirect user={user} loggedInPath={ROUTES.BROWSE} path={ROUTES.SIGN_IN} exact>
          <SignIn />
        </IsUserRedirect>

        <IsUserRedirect user={user} loggedInPath={ROUTES.BROWSE} path={ROUTES.HOME} exact> */}
        <Home />
        {/* </IsUserRedirect>

        <ProtectedRoute exact path={ROUTES.BROWSE} user={user}>
          <Browse />
        </ProtectedRoute> */}
      </Switch>
    </Router>
  );
};

export default App;
