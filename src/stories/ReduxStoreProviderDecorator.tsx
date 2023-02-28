import React from "react";
import {Provider} from "react-redux";
import {tasksReducer} from "../state/tasks-reducer";
import {todolistsReducer} from "../state/todolists-reducer";
import {v1} from 'uuid';
import {AppRootStateType} from "../state/store";
import {combineReducers, createStore} from "redux";

const rooReducer = combineReducers({
    tasks: tasksReducer,
    todolist: todolistsReducer
})

const initialGlobalState = {
    todolists: [
        {id: "todolistId1", title: "What to learn", filter: "all"},
        {id: "todolistId2", title: "What to buy", filter: "all"}
    ],
    tasks: {
        ["todolistId1"]: [
            {id: v1(), title: "JS", isDone: true },
            {id: v1(), title: "HTML", isDone: true },
        ],
        ["todolistId2"]: [
            {id: v1(), title: "Milk", isDone: true },
            {id: v1(), title: "Book", isDone: true },
        ],
    }
}

export const storyBookStore = createStore(rooReducer, initialGlobalState as AppRootStateType);

export const ReduxStoreProviderDecorator = (storyFn: any) => {
    return <Provider store={storyBookStore}>{storyFn()}</Provider>
}