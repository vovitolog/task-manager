import axios from 'axios';

const settings = {
    withCredentials: true,
    headers: {
        'API-KEY': '84e0a46d-9509-4576-90a0-665901e537e9'
    }
}

export const todolistAPI = {
    updateTodolist(todolistId: string, title: string) {
        const promise = axios.put(
            `https://social-network.samuraijs.com/api/1.1/todo-lists/${todolistId}`,
            {title: title},
            settings
        )
        return promise
    },
    deleteTodolist(todolistId: string) {
        const promise = axios.delete(
            `https://social-network.samuraijs.com/api/1.1/todo-lists/${todolistId}`,
            settings
        )
        return promise
    },
    getTodolists() {
        const promise = axios.get(
            `https://social-network.samuraijs.com/api/1.1/todo-lists/`,
            settings
        )
        return promise
    },
    createTodolist(title: string) {
        const promise = axios.post(
            `https://social-network.samuraijs.com/api/1.1/todo-lists/`,
            {title},
            settings
        )
        return promise
    },
}