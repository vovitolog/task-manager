import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {FilterValuesType} from './App';
import {stat} from "fs";
import {Simulate} from "react-dom/test-utils";
import error = Simulate.error;

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
    filter: FilterValuesType
}

export function Todolist(props: PropsType) {
    const [title, setTitle] = useState('');
    const [error, setError] = useState<null | string>(null);

    const onchangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setTitle(event.currentTarget.value);
    }

    const addTaskHandler = () => {
        if (title.trim() !== '') {
            props.addTask(title);
            setTitle('');
        } else {
            setError('Field is Reqiured');
        }
    }

    const onKeyDownHandler = (event: KeyboardEvent<HTMLInputElement>) => {
        setError(null);
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

    const listLength = props.tasks.length;

    return (
        <div>
            <h3>{props.title}</h3>
            <div>
                <input
                    onChange={onchangeHandler}
                    value={title}
                    onKeyDown={onKeyDownHandler}
                    className={error ? 'error' : ''}
                />
                <button onClick={addTaskHandler}>+</button>
                {error && <div className={'error-message'}>{error}</div>}
            </div>
            {listLength ? <ul>
                    {
                        props.tasks.map(
                            (t) => {
                                return (
                                    <li
                                        className={t.isDone ? 'is-done' : ''}
                                        key={t.id}>
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
                : <span style={{color: 'red', margin: '20px', display: 'inline-block'}}> List is empty</span>
            }

            <div>
                <button
                    className={props.filter === 'all' ? 'active-filter' : ''}
                    onClick={changeFilterHandler('all')}>
                    All
                </button>
                <button
                    className={props.filter === 'active' ? 'active-filter' : ''}
                    onClick={changeFilterHandler('active')}>
                    Active
                </button>
                <button
                    className={props.filter === 'completed' ? 'active-filter' : ''}
                    onClick={changeFilterHandler('completed')}>
                    Completed
                </button>
            </div>
        </div>
    )
}
