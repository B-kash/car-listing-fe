import React from "react";
import ReactDOM from "react-dom/client";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";

import App from "./App.tsx";
import "./index.css";
import { config } from "./config.ts";
import { CssBaseline, ThemeProvider } from "@material-ui/core";
import theme from "./Theme.tsx";

console.log("gateway", config.GATEWAY_URL);

const client = new ApolloClient({
  uri: config.GATEWAY_URL,
  cache: new InMemoryCache(),
});

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <ApolloProvider client={client}>
        <App />
      </ApolloProvider>
    </ThemeProvider>
  </React.StrictMode>
);
