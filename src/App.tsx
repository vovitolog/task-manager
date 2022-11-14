import React, {useState} from 'react';
import './App.css';
import TodoList from "./TodoList";

export type TaskType = {
    id: number;
    title: string;
    isDone: boolean;
}

function App() {

    const tasks = [
        {
            id: 1, title: "HTML&CSS", isDone: true,
        },
        {
            id: 2, title: "JS", isDone: true,
        },
        {
            id: 3, title: "React", isDone: false,
        },
    ]

    return (
        <div className="App">
            <TodoList title={'List 1'}  tasks={tasks}/>
            <TodoList title={'List 2'} tasks={tasks}/>
        </div>
    );
}

export default App;
