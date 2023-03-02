import axios from 'axios';

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

export type TodolistType = {
    id: string
    title: string
    addedDate: string
    order: number
}

type ResponseType<D = {}> = {
    resultCode: number
    messages: Array<string>
    data: D
}

export type TaskType = {
    description: string
    title: string
    status: number
    priority: number
    startDate: string
    deadLine: string
    id: string
    todolistId: string
    order: number
    addedDate: string
}

export type UpdateTaskModelType = {
    description: string
    title: string
    status: number
    priority: number
    startDate: string
    deadLine: string
}

type GetTasksResponse = {
    error: string | null
    totalCont: number
    items: TaskType[]
}


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
        const promise = instance.get <Array<TodolistType>>(
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
        const promise = instance.get <GetTasksResponse>(
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
        const promise = instance.post<any>(
            `todo-lists/${todolistId}/tasks/$`,
        )
        return promise
    }
}