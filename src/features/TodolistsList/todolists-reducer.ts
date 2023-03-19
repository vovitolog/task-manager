import {ResultCode, todolistAPI, TodolistType} from "../../api/todolists-api";
import {Dispatch} from "redux";
import {RequestStatusType, setErrorAC, setLoadingStatusAC, SetLoadingStatusType} from "../../app/app-reducer";

const initialState: Array<TodolistDomainType> = []

export const todolistsReducer = (state: Array<TodolistDomainType> = initialState, action: ActionsType): Array<TodolistDomainType> => {
    switch (action.type) {
        case 'REMOVE-TODOLIST':
            return state.filter(tl => tl.id != action.id)
        case 'ADD-TODOLIST':
            return [{...action.todolist, filter: 'all', entityStatus: 'idle'}, ...state]
        case 'CHANGE-TODOLIST-TITLE':
            return state.map(tl => tl.id === action.id ? {...tl, title: action.title} : tl)
        case 'CHANGE-TODOLIST-FILTER':
            return state.map(tl => tl.id === action.id ? {...tl, filter: action.filter} : tl)
        case 'SET-TODOLISTS':
            return action.todolists.map(tl => ({...tl, filter: 'all', entityStatus: 'idle'}))
        default:
            return state;
    }
}

//actions

export const removeTodolistAC = (id: string) => ({type: 'REMOVE-TODOLIST', id} as const);

export const addTodolistAC = (todolist: TodolistType) => ({type: 'ADD-TODOLIST', todolist} as const)

export const changeTodolistTitleAC = (id: string, title: string) => ({
    type: 'CHANGE-TODOLIST-TITLE', id, title
} as const)

export const changeTodolistFilterAC = (id: string, filter: FilterValuesType) =>
    ({type: 'CHANGE-TODOLIST-FILTER', id, filter} as const)

export const setTodolistsAC = (todolists: Array<TodolistType>) =>
    ({type: 'SET-TODOLISTS', todolists} as const)

//thunks

export const fetchTodolistsTC = () => {
    return (dispatch: Dispatch) => {
        dispatch(setLoadingStatusAC('loading'))
        todolistAPI.getTodolists()
            .then(res => {
                dispatch(setTodolistsAC(res.data));
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

//types

export type AddTodolistActionType = ReturnType<typeof addTodolistAC>
export type RemoveTodolistActionType = ReturnType<typeof removeTodolistAC>
export type SetTodolistsActionType = ReturnType<typeof setTodolistsAC>

export type FilterValuesType = "all" | "active" | "completed";
export type TodolistDomainType = TodolistType & {
    filter: FilterValuesType,
    entityStatus: RequestStatusType
}

type ActionsType =
    | RemoveTodolistActionType
    | AddTodolistActionType
    | SetTodolistsActionType
    | ReturnType<typeof changeTodolistTitleAC>
    | ReturnType<typeof changeTodolistFilterAC>
    | SetLoadingStatusType

