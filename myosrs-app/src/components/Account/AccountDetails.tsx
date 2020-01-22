import React, { Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Login } from "../Login/Login";
import gql from "graphql-tag";
import { useMutation } from "react-apollo";
import { clearSession } from "../../store/reducers/session";
import { Button } from "@pqt/components";

const mutation = gql`
  mutation($sessionId: ID!) {
    deleteUserSession(sessionId: $sessionId)
  }
`;

export const AccountDetails = () => {
  const dispatch = useDispatch();
  const [deleteUserSession] = useMutation(mutation);
  // TODO: strongly type this
  const session = useSelector(state => (state as any).session);

  if (session)
    return (
      <Fragment>
        <div>Logged in as {session.user.email}</div>
        <Button
          onClick={e => {
            e.preventDefault();
            dispatch(clearSession());
            deleteUserSession({ variables: { sessionId: session.id } });
          }}
          text="Logout"
        />
      </Fragment>
    );

  return <Login />;
};
