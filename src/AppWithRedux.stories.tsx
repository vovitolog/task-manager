import React from "react";
import AppWithRedux from "./AppWithRedux";
import {ReduxStoreProviderDecorator} from "./stories/ReduxStoreProviderDecorator";
import {Provider} from "react-redux";
import {store} from "./state/store";

export default {
    title: 'AppWithRedux component',
    component: AppWithRedux,
    decorators: [ReduxStoreProviderDecorator]
}

export const AppWithReduxBaseExample = (props: any) => {
    // return <Provider store={store}> <AppWithRedux/></Provider>
    return <AppWithRedux/>
}


