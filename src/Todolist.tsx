import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {FilterValuesType} from './App';

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type PropsType = {
    title: string
    tasks: Array<TaskType>
    removeTask: (taskId: string) => void
    changeFilter: (value: FilterValuesType) => void
    addTask: (valueTitle: string) => void
}

export function Todolist(props: PropsType) {
    const [title, setTitle] = useState('');
    const onchangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setTitle(event.currentTarget.value)
    }

    const addTaskHandler = () => {
        props.addTask(title);
        setTitle('')
    }

    const onKeyDownHandler = (event: KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') addTaskHandler();
        console.log(event.currentTarget.value)
    }

    const changeFilterHandlerAll = () => {
        props.changeFilter("all")
    }

    const changeFilterHandleCompleted = () => {
        props.changeFilter("completed")
    }

    const changeFilterHandleActive = () => {
        props.changeFilter("active")
    }

    const removeTaskHandler = (tID: string) =>
         {
            props.removeTask(tID);
        }

        const mappedTasks = () => {

        }

    return <div>
        <h3>{props.title}</h3>
        <div>
            <input onChange={onchangeHandler} value={title} onKeyDown={onKeyDownHandler}/>
            <button onClick={addTaskHandler}>+</button>
        </div>
        <ul>
            {
                props.tasks.map(
                    (t) => {
                        return (
                            <li key={t.id}>
                                <input type="checkbox" checked={t.isDone}/>
                                <span>{t.title}</span>
                                <button onClick={() =>
                                    removeTaskHandler(t.id)}>x
                                </button>
                            </li>
                        )
                    }
                )
            }
        </ul>
        <div>
            <button onClick={changeFilterHandlerAll}>
                All
            </button>
            <button onClick={changeFilterHandleActive}>
                Active
            </button>
            <button onClick={changeFilterHandleCompleted}>
                Completed
            </button>
        </div>
    </div>
}
