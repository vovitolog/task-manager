import React, {useState} from 'react';
import './App.css';
import {TaskType, Todolist} from './Todolist';
import {v1} from "uuid";

export type FilterValuesType = "all" | "active" | "completed";

function App() {

    let [tasks, setTasks] = useState([
        {id: v1(), title: "HTML&CSS", isDone: true},
        {id: v1(), title: "JS", isDone: true},
        {id: v1(), title: "ReactJS", isDone: false},
        {id: v1(), title: "Rest API", isDone: false},
        {id: v1(), title: "GraphQL", isDone: false},
    ]);

    const addTask = (valueTitle: string) => {
        const newTask: TaskType = {id: v1(), title: valueTitle, isDone: false};
        setTasks([...tasks, newTask]);
    }

    function removeTask(id: string) {
        let filteredTasks = tasks.filter(t => t.id != id);
        setTasks(filteredTasks);
    }

    const [filter, setFilter] = useState<FilterValuesType>("all");

    let tasksForTodolist = tasks;

    if (filter === "active") {
        tasksForTodolist = tasks.filter(t => t.isDone === false);
    }
    if (filter === "completed") {
        tasksForTodolist = tasks.filter(t => t.isDone === true);
    }

    const getFilteredTasks = (tasks: Array<TaskType>, filter: FilterValuesType): Array<TaskType> => {
        switch (filter) {
            case 'completed':
                return tasks.filter(t => t.isDone);
            case "active":
                return tasks.filter(t => !t.isDone);
            default:
                return tasks;
        }
    }

    function changeFilter(value: FilterValuesType) {
        setFilter(value);
    }

    function changeStatus(id: string, isDone: boolean) {
        setTasks(tasks.map(t => t.id === id ? {...t, isDone: isDone} : t));
    }

    return (
        <div className="App">
            <Todolist title="What to learn"
                      tasks={getFilteredTasks(tasks, filter)}
                      removeTask={removeTask}
                      addTask={addTask}
                      changeFilter={changeFilter}
                      changeStatus={changeStatus}
                      filter={filter}
            />
        </div>
    );
}

export default App;

