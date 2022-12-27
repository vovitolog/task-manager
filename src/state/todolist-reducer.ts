import {FilterValuesType, TodolistsType} from "../App";
import {v1} from "uuid";

export const TodolistReducer = (state: Array<TodolistsType>, action: TodolistReducerTypes) => {
    switch (action.type) {
        case 'ADD-TODOLIST': {
            const newId = v1();
            const newTodolist: TodolistsType = {id: newId, title: action.payload.title, filter: 'all'};
            return [...state, newTodolist];
        }
        case 'REMOVE-TODOLIST': {
            return state.filter(tl => tl.id !== action.payload.todolistId);
        }
        case 'UPDATE-TODOLIST': {
            return state.map(tl => tl.id === action.payload.todolistId ? {...tl, title: action.payload.newTitle} : tl)

        }
        case 'CHANGE-FILTER-TODOLIST': {
            // function changeFilter(todolistId: string, value: FilterValuesType) {
            //     setTodolists(todolists.map(
            //         el => el.id === todolistId ? {...el, filter: value} : el
            //     ))
            // }
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

type removeTodolistACType = ReturnType<typeof removeTodolistAC>;
export const removeTodolistAC = (todolistId: string) => {
    return {
        type: 'REMOVE-TODOLIST',
        payload: {
            todolistId: todolistId
        }
    } as const
}

type addTodolistACType = ReturnType<typeof addTodolistAC>;
export const addTodolistAC = (title: string) => {
    return {
        type: 'ADD-TODOLIST',
        payload: {
            title
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
