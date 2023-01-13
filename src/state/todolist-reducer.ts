import {FilterValuesType, TodolistsType} from "../App";
import {v1} from "uuid";

export const todolistReducer = (state: Array<TodolistsType>, action: TodolistReducerTypes): Array<TodolistsType> => {
    switch (action.type) {
        case 'ADD-TODOLIST': {
            const newId = action.payload.todolistId;
            const newTodolist: TodolistsType = {id: newId, title: action.payload.title, filter: 'all'};
            return [newTodolist, ...state];
        }
        case 'REMOVE-TODOLIST': {
            return state.filter(tl => tl.id !== action.payload.todolistId);
        }
        case 'UPDATE-TODOLIST': {
            return state.map(tl => tl.id === action.payload.todolistId ? {...tl, title: action.payload.newTitle} : tl)

        }
        case 'CHANGE-FILTER-TODOLIST': {
            return state.map(tl => tl.id === action.payload.todolistId ? {
                ...tl,
                filter: action.payload.newFilterValue
            } : tl)
        }
        default:
            throw new Error('Unknown type');
    }
}

type TodolistReducerTypes = removeTodolistACType | addTodolistACType | updateTodolistACType | changeTodolistFilterACType

export type removeTodolistACType = ReturnType<typeof removeTodolistAC>;

export const removeTodolistAC = (todolistId: string) => {
    return {
        type: 'REMOVE-TODOLIST',
        payload: {
            todolistId: todolistId
        }
    } as const
}

export type addTodolistACType = ReturnType<typeof addTodolistAC>;

export const addTodolistAC = (title: string) => {
    return {
        type: 'ADD-TODOLIST',
        payload: {
            title,
            todolistId: v1()
        }
    } as const
}

type updateTodolistACType = ReturnType<typeof updateTodolistAC>;
export const updateTodolistAC = (todolistId: string, newTitle: string) => {
    return {
        type: 'UPDATE-TODOLIST',
        payload: {
            newTitle,
            todolistId
        }
    } as const
}

type changeTodolistFilterACType = ReturnType<typeof changeTodolistFilterAC>;
export const changeTodolistFilterAC = (todolistId: string, newFilterValue: FilterValuesType) => {
    return {
        type: 'CHANGE-FILTER-TODOLIST',
        payload: {
            todolistId,
            newFilterValue,
        }
    } as const
}
