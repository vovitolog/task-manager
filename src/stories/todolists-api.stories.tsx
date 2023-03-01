import React, {useEffect, useState} from 'react'
import axios from "axios";

export default {
    title: 'API'
}

const settings = {
    withCredentials: true,
    headers: {
        'API-KEY': '84e0a46d-9509-4576-90a0-665901e537e9'
    }
}

export const GetTodolists = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        // здесь мы будем делать запрос и ответ закидывать в стейт.
        // который в виде строки будем отображать в div-ке

        axios.get('https://social-network.samuraijs.com/api/1.1/todo-lists', settings).then((res) => {
            console.log(res.data)
            setState(res.data);
        })

    }, [])
    return <div>{JSON.stringify(state)}</div>
}
export const CreateTodolist = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        axios.post('https://social-network.samuraijs.com/api/1.1/todo-lists', {title: 'test'}, settings)
            .then((res) => {
                console.log(res)
            })
    }, [])

    return <div>{JSON.stringify(state)}</div>
}

let todolistId = '368bdda0-a7b4-453e-bf0e-a3986c6b0c08'
export const DeleteTodolist = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        axios.delete(`https://social-network.samuraijs.com/api/1.1/todo-lists/${todolistId}`, settings)
            .then((res) => setState(res.data))
    }, [])

    return <div>{JSON.stringify(state)}</div>
}

//todolistId = '55f0dc07-9d56-4e0a-8820-6f8266bdaf19';
todolistId = '86bc8ff4-af4f-44a3-8b7d-ad853d6b1034';

export const UpdateTodolistTitle = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        axios.put(`https://social-network.samuraijs.com/api/1.1/todo-lists/${todolistId}`, {title: 'PUT'}, settings)
            .then((res) => setState(res.data));
    }, [])

    return <div>{JSON.stringify(state)}</div>
}

