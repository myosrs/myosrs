import React, { Fragment } from "react";
import gql from "graphql-tag";
import { useQuery } from "react-apollo";

const query = gql`
  query {
    accounts {
      id
    }
  }
`;

export const Accounts = () => {
  const { data, loading } = useQuery(query);

  if (loading) return <div>Loading ...</div>;

  if (data) {
    return (
      <div>
        <Fragment>
          <h1>Accounts</h1>
          <div>
            {data.accounts.map((account: any) => (
              <div>{account.name}</div>
            ))}
          </div>
        </Fragment>
      </div>
    );
  }

  return <div />;
};
