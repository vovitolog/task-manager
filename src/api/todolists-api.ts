import axios, {AxiosResponse} from 'axios';
import {FormDataType} from "../features/Login/Login";

const settings = {
    withCredentials: true,
    headers: {
        'API-KEY': '84e0a46d-9509-4576-90a0-665901e537e9'
    }
}
const instance = axios.create(
    {
        baseURL: "https://social-network.samuraijs.com/api/1.1",
        ...settings
    }
)

export const authAPI = {
    login(data: FormDataType) {
        return instance.post<ResponseType<{ userId?: number }>>('auth/login', data)
            .then(res => {
                return res.data
            })
    },
    me() {
        return instance.get<ResponseType<{ id: number; email: string; login: string }>>('auth/me')
            .then(res => {
                return res.data
            })
    },
    logout() {
        return instance.delete<ResponseType<{userId?: number}>>('auth/login')
            .then(res => {
                return res.data
            });
    }
}

//api

export const todolistAPI = {
    updateTodolist(todolistId: string, title: string) {
        const promise = instance.put<ResponseType>(
            `todo-lists/${todolistId}`,
            {title: title},
        )
        return promise
    },
    deleteTodolist(todolistId: string) {
        const promise = instance.delete<ResponseType>(
            `todo-lists/${todolistId}`,
        )
        return promise
    },
    getTodolists() {
        const promise = instance.get<Array<TodolistType>>(
            `todo-lists/`,
        )
        return promise
    },
    createTodolist(title: string) {
        const promise = instance.post<ResponseType<{ item: TodolistType }>>(
            `todo-lists/`,
            {title},
        )
        return promise
    },
    getTasks(todolistId: string) {
        const promise = instance.get<GetTasksResponse>(
            `todo-lists/${todolistId}/tasks`,
        )
        return promise
    },
    deleteTask(todolistId: string, taskId: string) {
        const promise = instance.delete<ResponseType>(
            `todo-lists/${todolistId}/tasks/${taskId}`,
        )
        return promise
    },
    createTask(todolistId: string, taskTitle: string) {
        const promise = instance.post<ResponseType<{ item: TaskType }>>(
            `todo-lists/${todolistId}/tasks/`,
            {title: taskTitle}
        )
        return promise
    },
    updateTask(todolistId: string, taskId: string, model: UpdateTaskModelType) {
        const promise = instance.put<ResponseType<TaskType>>(
            `todo-lists/${todolistId}/tasks/${taskId}`,
            {...model}
        )
        return promise
    }
}

//types

export type TodolistType = {
    id: string
    title: string
    addedDate: string
    order: number
}

export type ResponseType<D = {}> = {
    resultCode: number
    messages: Array<string>
    data: D
}

export enum TaskStatuses {
    New,
    InProgress,
    Completed,
    Draft
}

export enum ResultCode {
    SUCCEEDED = 0,
    FAILED = 1,
    CAPTCHA = 10
}

export enum TaskPriorities {
    Low,
    Middle,
    Hi,
    Urgently,
    Later
}

export type TaskType = {
    description: string
    title: string
    status: TaskStatuses
    priority: TaskPriorities
    startDate: string
    deadLine: string
    id: string
    todoListId: string
    order: number
    addedDate: string
}

export type UpdateTaskModelType = {
    description: string
    title: string
    status: TaskStatuses
    priority: TaskPriorities
    startDate: string
    deadline: string
}

type GetTasksResponse = {
    error: string | null
    totalCont: number
    items: TaskType[]
}

