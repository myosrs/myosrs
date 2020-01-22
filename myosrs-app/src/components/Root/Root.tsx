import { Container } from "@pqt/components";
import gql from "graphql-tag";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { client } from "../../api/Client";
import { setSession } from "../../store/reducers/session";
import { AccountDetails } from "../Account/AccountDetails";
import { Register } from "../Register/Register";
const query = gql`
  query {
    userSession(me: true) {
      id
      user {
        id
        email
      }
    }
  }
`;

export const Root = () => {
  const dispatch = useDispatch();
  const [init, setInit] = useState(false);

  useEffect(() => {
    client.query({ query }).then(({ data }) => {
      if (data.userSession) {
        dispatch(setSession(data.userSession));
      }
    });

    setInit(true);
  }, [dispatch]);

  if (!init) return <div>Loading...</div>;

  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <Container>
            <AccountDetails />
          </Container>
        </Route>
        <Route exact path="/register">
          <Container>
            <Register />
          </Container>
        </Route>
      </Switch>
    </Router>
  );
};
