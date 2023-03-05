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
    setTodolistId('Input ID to delete');
    }

    const inputOnchangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTodolistId(e.currentTarget.value)
    }

    return <div>
        {JSON.stringify(state)}
        <br/>
        <input value={todolistId} onChange={inputOnchangeHandler}/>
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
    const todolistId = 'dc3a3fe0-2954-4ded-bf24-194d40a4b9c4';
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
    const todolistId = 'dc3a3fe0-2954-4ded-bf24-194d40a4b9c4';
    const taskId = '298a28c1-6813-420c-acaf-9c044acb2199';
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
    const todolistId = 'dc3a3fe0-2954-4ded-bf24-194d40a4b9c4';
    const taskTitle = 'TEST TASK 2';
    useEffect(() => {
        todolistAPI.createTask(todolistId, taskTitle)
            .then((res) => {
                setState(res.data);
            })

    }, [])
    return <div>{JSON.stringify(state)}</div>
}

export const UpdateTask = () => {
    const [state, setState] = useState<any>(null);
    const todolistId = 'dc3a3fe0-2954-4ded-bf24-194d40a4b9c4';
    const taskId = '4a1c23fe-ffc8-4e30-bfd8-27fa51488edd';
    const newTaskTitle = 'NEW TASK TITLE111111111111';
    useEffect(() => {
        todolistAPI.updateTask(todolistId, taskId, newTaskTitle)
            .then((res) => {
                setState(res.data);
            })

    }, [])
    return <div>{JSON.stringify(state)}</div>
}