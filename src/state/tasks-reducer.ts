import {TasksStateType} from '../App';
import {AddTodolistActionType, RemoveTodolistActionType, SetTodolistsActionType} from './todolists-reducer';
import {
    ResultCode,
    TaskPriorities,
    TaskStatuses,
    TaskType,
    todolistAPI,
    UpdateTaskModelType
} from "../api/todolists-api";
import {Dispatch} from "redux";
import {AppRootStateType} from "./store";
import {setErrorAC, SetErrorType, setLoadingStatusAC} from "../app/app-reducer";

export type SetTasksActionType = {
    type: 'SET-TASKS',
    tasks: Array<TaskType>
    todolistId: string
}

type ActionsType =
    | ReturnType<typeof removeTaskAC>
    | ReturnType<typeof addTaskAC>
    | ReturnType<typeof updateTaskAC>
    | ReturnType<typeof setTasksAC>

    | AddTodolistActionType
    | RemoveTodolistActionType
    | SetTodolistsActionType

    | SetErrorType

const initialState: TasksStateType = {}

export const tasksReducer = (state: TasksStateType = initialState, action: ActionsType): TasksStateType => {
    switch (action.type) {
        case 'REMOVE-TASK': {
            const stateCopy = {...state}
            const tasks = stateCopy[action.todolistId];
            const newTasks = tasks.filter(t => t.id !== action.taskId);
            stateCopy[action.todolistId] = newTasks;
            return stateCopy;
        }
        case 'ADD-TASK': {
            const stateCopy = {...state}
            const newTask = action.task;
            const tasks = stateCopy[newTask.todoListId];
            const newTasks = [newTask, ...tasks];
            stateCopy[newTask.todoListId] = newTasks;
            return stateCopy;
        }
        case 'UPDATE-TASK': {
            const todolistTasks = state[action.todolistId];
            state[action.todolistId] = todolistTasks.map(task => task.id === action.taskId
                ? {...task, ...action.model}
                : task)
            return {...state}
        }
        case 'ADD-TODOLIST': {
            return {
                ...state,
                [action.todolist.id]: []
            }
        }
        case 'REMOVE-TODOLIST': {
            const copyState = {...state};
            delete copyState[action.id];
            return copyState;
        }
        case 'SET-TODOLISTS': {
            const copyState = {...state};

            action.todolists.forEach(tl => {
                return copyState[tl.id] = [];
            })
            return copyState;
        }
        case 'SET-TASKS': {
            const copyState = {...state};
            copyState[action.todolistId] = action.tasks;
            return copyState;
        }
        default:
            return state;
    }
}

//actions

export const removeTaskAC = (taskId: string, todolistId: string) =>
    ({type: 'REMOVE-TASK', taskId, todolistId} as const)

export const addTaskAC = (task: TaskType) => ({type: 'ADD-TASK', task} as const)

export const updateTaskAC = (taskId: string, model: UpdateDomainTaskModelType, todolistId: string) =>
    ({type: 'UPDATE-TASK', model, todolistId, taskId} as const)

export const setTasksAC = (tasks: Array<TaskType>, todolistId: string) =>
    ({type: 'SET-TASKS', tasks, todolistId} as const)

//thunks
export const fetchTasksTC = (todolistId: string) => {
    return (dispatch: Dispatch) => {
        dispatch(setLoadingStatusAC('loading'))
        todolistAPI.getTasks(todolistId)
            .then(res => {
                dispatch(setTasksAC(res.data.items, todolistId))
                dispatch(setLoadingStatusAC('idle'))
            })
    }
}

export const removeTaskTC = (taskId: string, todolistId: string) => {
    return (dispatch: Dispatch) => {
        dispatch(setLoadingStatusAC('loading'))
        todolistAPI.deleteTask(todolistId, taskId)
            .then(res => {
                    const action = removeTaskAC(taskId, todolistId);
                    dispatch(action);
                    dispatch(setLoadingStatusAC('idle'))
                }
            )
    }
}

export const addTaskTC = (title: string, todolistId: string) => {
    return (dispatch: Dispatch) => {
        dispatch(setLoadingStatusAC('loading'))
        todolistAPI.createTask(todolistId, title)
            .then(res => {
                    if (res.data.resultCode === ResultCode.SUCCEEDED) {
                        dispatch(addTaskAC(res.data.data.item));
                        dispatch(setLoadingStatusAC('idle'))
                    } else if (res.data.messages.length) {
                        dispatch(setErrorAC(res.data.messages[0]))
                    } else dispatch(setErrorAC('Some Error ocured'))
                    dispatch(setLoadingStatusAC('failed'))
                }
            )
    }
}

export type UpdateDomainTaskModelType = {
    description?: string
    title?: string
    status?: TaskStatuses
    priority?: TaskPriorities
    startDate?: string
    deadline?: string
}

export const updateTaskTC = (taskId: string, domainModel: UpdateDomainTaskModelType, todolistId: string) => {
    return (dispatch: Dispatch, getState: () => AppRootStateType) => {
        const state = getState();
        const task = state.tasks[todolistId].find(t => t.id === taskId);
        if (!task) {
            console.warn("task not found in the state")
            return;
        }
        const apiModel: UpdateTaskModelType = {
            deadline: task.deadLine,
            description: task.description,
            priority: task.priority,
            startDate: task.startDate,
            title: task.title,
            status: task.status,
            ...domainModel
        }
        dispatch(setLoadingStatusAC('loading'));
        todolistAPI.updateTask(todolistId, taskId, apiModel)
            .then(res => {
                    const action = updateTaskAC(taskId, domainModel, todolistId);
                    dispatch(action);
                    dispatch(setLoadingStatusAC('idle'))
                }
            )
    }
}