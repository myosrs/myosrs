import { Container, UserInterface } from "@pqt/components";
import React from "react";
import { ApolloProvider } from "react-apollo";
import { client } from "./api/Client";
import "./App.css";
import { Login } from "./components/Login/Login";

const App: React.FC = () => {
  return (
    <ApolloProvider client={client}>
      <UserInterface>
        <div className="App">
          <Container>
            <Login />
          </Container>
        </div>
      </UserInterface>
    </ApolloProvider>
  );
};

export default App;
