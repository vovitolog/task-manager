import {combineReducers, legacy_createStore} from "redux";
import {tasksReducer} from "./tasks-reducer";
import {todolistReducer} from "./todolist-reducer";
import {TasksStateType, TodolistsType} from "../AppWithRedux";

const rootReducer = combineReducers({
    todolists: todolistReducer,
    tasks: tasksReducer,
});

export type AppRootType = ReturnType<typeof rootReducer>

export const store = legacy_createStore(rootReducer);

// @ts-ignore
window.store = store;