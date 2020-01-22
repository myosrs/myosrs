import { UserInterface } from "@pqt/components";
import React from "react";
import { ApolloProvider } from "react-apollo";
import { Provider } from "react-redux";
import { client } from "./api/Client";
import "./App.css";
import { Root } from "./components/Root/Root";
import { store } from "./store";

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <ApolloProvider client={client}>
        <UserInterface>
          <div className="App">
            <Root />
          </div>
        </UserInterface>
      </ApolloProvider>
    </Provider>
  );
};

export default App;
