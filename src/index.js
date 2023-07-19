import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { HashRouter, Route, Switch, Redirect } from 'react-router-dom'; 
import { ChakraProvider } from "@chakra-ui/react";
import { store } from "./Redux/store";
import { Provider } from "react-redux";
import theme from "../src/theme/theme";
import { ThemeEditorProvider } from '@hypertheme-editor/chakra-ui';
import "react-big-calendar/lib/css/react-big-calendar.css";
import "react-big-calendar/lib/addons/dragAndDrop/styles.css";
import AuthLayout from './layouts/auth'
import AdminLayout from './layouts/admin'
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
      <ChakraProvider theme={theme}>
        <ThemeEditorProvider>
           <HashRouter>
            <Switch>
              <Route path={`/auth`} component={AuthLayout}/>
              <Route path={`/admin`} component={AdminLayout}/>
            </Switch>
           </HashRouter>
        </ThemeEditorProvider>
      </ChakraProvider>
  </Provider>
);
