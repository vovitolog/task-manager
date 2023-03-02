import React, {ChangeEvent, useEffect, useState} from 'react'
import {todolistAPI} from "../api/todolists-api";

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
        todolistAPI.getTodolists()
            .then((res) => {
                setState(res.data);
            })

    }, [])
    return <div>{JSON.stringify(state)}</div>
}
export const CreateTodolist = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        todolistAPI.createTodolist('NEW TL')
            .then((res) => setState(res.data)
            )
    }, [])

    return <div>{JSON.stringify(state)}</div>
}

export const DeleteTodolist = () => {
    const [state, setState] = useState<any>(null);
    const [todolistId, setTodolistId] = useState('Input ID to delete');
    const handleDeleteTodolist = () => {
        todolistAPI.deleteTodolist(todolistId)
            .then((res) => setState(res.data))
        console.log('test')
    }

    const inputOnchangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTodolistId(e.currentTarget.value)
    }

    return <div>
        {JSON.stringify(state)}
        <br/>
        <input placeholder={'Input ID to delete'} value={todolistId} onChange={inputOnchangeHandler}/>
        <button onClick={handleDeleteTodolist}>Delete</button>
    </div>
}

export const UpdateTodolistTitle = () => {
    const [state, setState] = useState<any>(null);
    const todolistId = 'b52c46e1-7d94-43ed-8fe4-1aae07c48348';
    useEffect(() => {
        todolistAPI.updateTodolist(todolistId, 'TETETETETETETE')
            .then((res) => setState(res.data));
    }, [])

    return <div>{JSON.stringify(state)}</div>
}

export const GetTasks = () => {
    const [state, setState] = useState<any>(null);
    const todolistId = 'b52c46e1-7d94-43ed-8fe4-1aae07c48348';
    useEffect(() => {
        todolistAPI.getTasks(todolistId)
            .then((res) => {
                setState(res.data);
            })

    }, [])
    return <div>{JSON.stringify(state)}</div>
}

export const DeleteTask = () => {
    const [state, setState] = useState<any>(null);
    const todolistId = 'b52c46e1-7d94-43ed-8fe4-1aae07c48348';
    const taskId = '';
    useEffect(() => {
        todolistAPI.deleteTask(todolistId, taskId)
            .then((res) => {
                setState(res.data);
            })

    }, [])
    return <div>{JSON.stringify(state)}</div>
}

export const CreateTask = () => {
    const [state, setState] = useState<any>(null);
    const todolistId = 'b52c46e1-7d94-43ed-8fe4-1aae07c48348';
    const taskTitle = 'TEST TASK';
    useEffect(() => {
        todolistAPI.createTask(todolistId, taskTitle)
            .then((res) => {
                setState(res.data);
            })

    }, [])
    return <div>{JSON.stringify(state)}</div>
}