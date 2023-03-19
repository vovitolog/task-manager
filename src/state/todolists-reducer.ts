import {ResultCode, todolistAPI, TodolistType} from "../api/todolists-api";
import {Dispatch} from "redux";
import {RequestStatusType, setErrorAC, setLoadingStatusAC, SetLoadingStatusType} from "../app/app-reducer";

type ActionsType =
    | ReturnType<typeof removeTodolistAC>
    | ReturnType<typeof addTodolistAC>
    | ReturnType<typeof changeTodolistTitleAC>
    | ReturnType<typeof changeTodolistFilterAC>
    | ReturnType<typeof setTodolistAC>
    | SetLoadingStatusType

const initialState: Array<TodolistDomainType> = []

export type FilterValuesType = "all" | "active" | "completed";
export type TodolistDomainType = TodolistType & {
    filter: FilterValuesType,
    entityStatus: RequestStatusType
}

export const todolistsReducer = (state: Array<TodolistDomainType> = initialState, action: ActionsType): Array<TodolistDomainType> => {
    switch (action.type) {
        case 'REMOVE-TODOLIST': {
            return state.filter(tl => tl.id != action.id)
        }
        case 'ADD-TODOLIST': {
            const newTodolist: TodolistDomainType = {...action.todolist, filter: 'all', entityStatus: 'idle'};
            return [newTodolist, ...state]
        }
        case 'CHANGE-TODOLIST-TITLE': {
            const todolist = state.find(tl => tl.id === action.id);
            if (todolist) {
                todolist.title = action.title;
            }
            return [...state]
        }
        case 'CHANGE-TODOLIST-FILTER': {
            const todolist = state.find(tl => tl.id === action.id);
            if (todolist) {
                todolist.filter = action.filter;
            }
            return [...state]
        }
        case 'SET-TODOLISTS': {
            return action.todolists.map(tl => ({...tl, filter: 'all', entityStatus: 'idle'}))
        }
        default:
            return state;
    }
}

export const removeTodolistAC = (id: string) => ({type: 'REMOVE-TODOLIST', id} as const);

export const addTodolistAC = (todolist: TodolistType) => ({type: 'ADD-TODOLIST', todolist} as const)

export const changeTodolistTitleAC = (id: string, title: string) => ({
    type: 'CHANGE-TODOLIST-TITLE', id, title
} as const)

export const changeTodolistFilterAC = (id: string, filter: FilterValuesType) =>
    ({type: 'CHANGE-TODOLIST-FILTER', id, filter} as const)

export const setTodolistAC = (todolists: Array<TodolistType>) =>
    ({type: 'SET-TODOLISTS', todolists: todolists} as const)


export const fetchTodolistsTC = () => {
    return (dispatch: Dispatch) => {
        dispatch(setLoadingStatusAC('loading'))
        todolistAPI.getTodolists()
            .then(res => {
                dispatch(setTodolistAC(res.data));
                dispatch(setLoadingStatusAC('idle'))
            })
    }
}

export const removeTodolistsTC = (todolistId: string) => {
    return (dispatch: Dispatch) => {
        dispatch(setLoadingStatusAC('loading'))
        todolistAPI.deleteTodolist(todolistId)
            .then(res => {
                dispatch(removeTodolistAC(todolistId))
                dispatch(setLoadingStatusAC('idle'))
            })
    }
}

export const addTodolistTC = (title: string) => {
    return (dispatch: Dispatch) => {
        dispatch(setLoadingStatusAC('loading'))
        todolistAPI.createTodolist(title)
            .then(res => {
                    if (res.data.resultCode === ResultCode.SUCCEEDED) {
                        dispatch(addTodolistAC(res.data.data.item));
                        dispatch(setLoadingStatusAC('idle'))
                    } else if (res.data.messages.length) {
                        dispatch(setErrorAC(res.data.messages[0]))
                    } else dispatch(setErrorAC('Some Error ocured'))
                    dispatch(setLoadingStatusAC('failed'))
                }
            )
    }
}

export const changeTodolistTitleTC = (id: string, title: string) => {
    return (dispatch: Dispatch) => {
        dispatch(setLoadingStatusAC('loading'))
        todolistAPI.updateTodolist(id, title)
            .then(res => {
                dispatch(changeTodolistTitleAC(id, title))
                dispatch(setLoadingStatusAC('idle'))
            })
    }
}