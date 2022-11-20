import React from 'react';

type TaskType = {
    id: number
    title: string
    isDone: boolean
}

type PropsType = {
    title: string
    tasks: Array<TaskType>
    removeTask: (id: number) => void
}

export function Todolist(props: PropsType) {
    console.log(props.removeTask)

    return <div>
        <h3>{props.title}</h3>
        <div>
            <input/>
            <button>+</button>
        </div>
        <ul>
            {props.tasks.map(task => {

                return (
                    <li key={task.id}>
                        <button onClick={() => props.removeTask(task.id)}>X</button>
                        <input type="checkbox" checked={task.isDone}/> <span>{task.title}</span>
                    </li>
                )
            })}
        </ul>
        <div>
            <button onClick={() => {
                console.log('All')
            }}>All
            </button>
            <button onClick={() => {
                console.log('Active')
            }}>Active
            </button>
            <button onClick={() => {
                console.log('Completed')
            }}>Completed
            </button>
        </div>
    </div>
}
