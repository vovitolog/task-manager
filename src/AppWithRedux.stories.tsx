import React from "react";
import AppWithRedux from "./AppWithRedux";
import {Provider} from "react-redux";
import {store} from "./state/store";

export default {
    title: 'AppWithRedux component',
    component: AppWithRedux
}

export const AppWithReduxBaseExample = (props: any) => {
    return <Provider store={store}> <AppWithRedux/> </Provider>
}


