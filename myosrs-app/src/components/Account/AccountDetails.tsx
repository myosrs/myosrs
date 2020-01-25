import { Dropdown } from "@pqt/components";
import gql from "graphql-tag";
import React, { Fragment } from "react";
import { useMutation } from "react-apollo";
import { useDispatch, useSelector } from "react-redux";
import { clearSession } from "../../store/reducers/session";
import { Login } from "../Login/Login";

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
        <Dropdown
          toggle={<div>Logged in as {session.user.email}</div>}
          menu={[
            <div
              onClick={e => {
                e.preventDefault();
                dispatch(clearSession());
                deleteUserSession({ variables: { sessionId: session.id } });
              }}
            >
              Logout
            </div>
          ]}
        />
      </Fragment>
    );

  return <Login />;
};
