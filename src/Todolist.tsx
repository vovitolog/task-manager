import React, {useState} from 'react';

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

    const [filterValueKey, setFilterValueKey] = useState('All');

    const filterTasks = (filterKey: string) => {
        setFilterValueKey(filterKey);
    }

    let filteredTasks = props.tasks;

    if (filterValueKey === 'Active') {
        filteredTasks = props.tasks.filter(el=> el.isDone);
    }

    if (filterValueKey === 'Completed') {
        filteredTasks = props.tasks.filter(el=> !el.isDone);
    }

    return <div>
        <h3>{props.title}</h3>
        <div>
            <input/>
            <button>+</button>
        </div>
        <ul>
            {filteredTasks.map(task => {

                return (
                    <li key={task.id}>
                        <button onClick={() => props.removeTask(task.id)}>X</button>
                        <input type="checkbox" checked={task.isDone}/> <span>{task.title}</span>
                    </li>
                )
            })}
        </ul>
        <div>
            <button onClick={() => filterTasks('All')}>All
            </button>
            <button onClick={() => filterTasks('Active')}>Active
            </button>
            <button onClick={() => filterTasks('Completed')}>Completed
            </button>
        </div>
    </div>
}
