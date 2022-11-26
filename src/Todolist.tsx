import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {FilterValuesType} from './App';
import {stat} from "fs";

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type PropsType = {
    title: string
    tasks: Array<TaskType>
    removeTask: (taskId: string) => void
    addTask: (valueTitle: string) => void
    changeFilter: (value: FilterValuesType) => void
    changeStatus: (id: string, isDone: boolean) => void
}

export function Todolist(props: PropsType) {
    const [title, setTitle] = useState('');
    const onchangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setTitle(event.currentTarget.value)
    }

    const addTaskHandler = () => {
        if (title.trim() !== '') {
            props.addTask(title);
            setTitle('')
        }
    }

    const onKeyDownHandler = (event: KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') addTaskHandler();
    }

    const changeFilterHandler = (filterValue: FilterValuesType) => {
        return () => props.changeFilter(filterValue);
    }

    const removeTaskHandler = (tID: string) => {
        props.removeTask(tID);
    }

    const changeStatusHandler = (tId: string, status: boolean) => {
        props.changeStatus(tId, status);
        console.log(tId + status)
    }


    return (
        <div>
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
                                    <input type="checkbox"
                                            checked={t.isDone}
                                           onChange={(e) => changeStatusHandler(t.id, e.currentTarget.checked)}/>
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
                <button onClick={changeFilterHandler('all')}>
                    All
                </button>
                <button onClick={changeFilterHandler('active')}>
                    Active
                </button>
                <button onClick={changeFilterHandler('completed')}>
                    Completed
                </button>
            </div>
        </div>
    )
}
