import React from "react";
import {Provider} from "react-redux";
import {tasksReducer} from "../features/TodolistsList/tasks-reducer";
import {todolistsReducer} from "../features/TodolistsList/todolists-reducer";
import {v1} from 'uuid';
import {AppRootStateType} from "../app/store";
import {combineReducers, createStore} from "redux";
import {TaskPriorities, TaskStatuses} from "../api/todolists-api";
import {appReducer} from "../app/app-reducer";

const rootReducer = combineReducers({
    tasks: tasksReducer,
    todolists: todolistsReducer,
    app: appReducer
})

const initialGlobalState: AppRootStateType = {
    todolists: [
        {id: "todolistId1", title: "What to learn", filter: "all", addedDate: '', order: 0},
        {id: "todolistId2", title: "What to buy", filter: "all", addedDate: '', order: 0}
    ],
    tasks: {
        ["todolistId1"]: [
            {
                id: v1(), title: "JS", status: TaskStatuses.New, todoListId: "todolistId1",
                description: '', startDate: '', deadLine: '', addedDate: '', priority: TaskPriorities.Low, order: 0
            },
            {
                id: v1(), title: "HTML", status: TaskStatuses.New, todoListId: "todolistId1",
                description: '', startDate: '', deadLine: '', addedDate: '', priority: TaskPriorities.Low, order: 0
            },
        ],
        ["todolistId2"]: [
            {
                id: v1(), title: "Milk", status: TaskStatuses.New, todoListId: "todolistId2",
                description: '', startDate: '', deadLine: '', addedDate: '', priority: TaskPriorities.Low, order: 0
            },
            {
                id: v1(), title: "Book", status: TaskStatuses.New, todoListId: "todolistId2",
                description: '', startDate: '', deadLine: '', addedDate: '', priority: TaskPriorities.Low, order: 0
            },
        ],
    },
    // @ts-ignore
    app: {
        status: 'idle',
        error: null
    }
}

export const storyBookStore = createStore(rootReducer, initialGlobalState);

export const ReduxStoreProviderDecorator = (storyFn: any) => {
    return <Provider store={storyBookStore}>{storyFn()}</Provider>
}