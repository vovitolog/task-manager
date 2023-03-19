import React from "react";
import App from "./App";
import {ReduxStoreProviderDecorator} from "../stories/ReduxStoreProviderDecorator";
import {Provider} from "react-redux";
import {store} from "./store";

export default {
    title: 'App component',
    component: App,
    decorators: [ReduxStoreProviderDecorator]
}

export const AppBaseExample = (props: any) => {
    // return <Provider store={store}> <App/></Provider>
    return <App/>
}


