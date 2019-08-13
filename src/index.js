import React, { Component } from 'react';
import App from "./containers/index";
import { Provider } from "react-redux";
import store from "./store/index";

export default class Index extends Component {
    render() {
        return <Provider store={store}>
            <App />
        </Provider>;
    }
}

