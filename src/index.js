import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { Grommet } from "grommet";
import { I18nextProvider } from "react-i18next";
import store from "./store";
import theme from "./theme";
import { App } from "./views";
import * as serviceWorker from "./serviceWorker";
import i18n from "./i18n";

ReactDOM.render(
    <React.StrictMode>
        <Provider store={store}>
            <I18nextProvider i18n={i18n}>
                <Grommet theme={theme} full>
                    <App />
                </Grommet>
            </I18nextProvider>
        </Provider>
    </React.StrictMode>,
    document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
