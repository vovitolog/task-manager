import React, {useState} from 'react';
import './App.css';
import {TaskType, Todolist} from './Todolist';
import {v1} from 'uuid';
import {Input} from "./Input";
import ButtonAppBar from "./ButtonAppBar";
import Container from "@mui/material/Container";
import Grid from '@mui/material/Grid'
import {Paper} from "@mui/material";

export type FilterValuesType = "all" | "active" | "completed";
export type TodolistsType = {
    id: string,
    title: string,
    filter: FilterValuesType
}
export type TasksStateType = {
    [key: string]: Array<TaskType>
}

function App() {
    let todolistId1 = v1();
    let todolistId2 = v1();

    let [todolists, setTodolists] = useState<Array<TodolistsType>>([
        {id: todolistId1, title: "What to learn", filter: "all"},
        {id: todolistId2, title: "What to buy", filter: "all"}
    ])

    let [tasks, setTasks] = useState<TasksStateType>({
        [todolistId1]: [
            {id: v1(), title: "HTML&CSS", isDone: true},
            {id: v1(), title: "JS", isDone: true},
            {id: v1(), title: "ReactJS", isDone: false},
            {id: v1(), title: "Rest API", isDone: false},
            {id: v1(), title: "GraphQL", isDone: false},
        ],
        [todolistId2]: [
            {id: v1(), title: "Milk", isDone: true},
            {id: v1(), title: "React Book", isDone: true},
            {id: v1(), title: "Bread", isDone: false}
        ]
    });

    function removeTask(todolistId: string, taskId: string) {
        let filteredTasks = tasks[todolistId].filter(t => t.id != taskId);
        setTasks({...tasks, [todolistId]: filteredTasks});
    }

    function addTask(todolistId: string, title: string) {
        let task = {id: v1(), title: title, isDone: false};
        setTasks({...tasks, [todolistId]: [task, ...tasks[todolistId]]});
    }

    function updateTask(todolistId: string, taskId: string, newTitle: string) {
        setTasks({
            ...tasks, [todolistId]: tasks[todolistId].map(t => t.id === taskId ? {...t, title: newTitle} : t)
        })
    }

    function changeStatus(todolistId: string, taskId: string, isDone: boolean) {
        setTasks({...tasks, [todolistId]: tasks[todolistId].map(el => el.id === taskId ? {...el, isDone} : el)});
    }

    function addTodolist(title: string) {
        const newId = v1();
        const newTodolist: TodolistsType = {id: newId, title: title, filter: 'all'};
        setTodolists([...todolists, newTodolist]);

        setTasks({...tasks, [newId]: []})
    }

    function updateTodolist(todolistId: string, newTitle: string) {
        setTodolists(todolists.map(tl => tl.id === todolistId ? {...tl, title: newTitle} : tl));
    }

    function removeTodolist(todolistId: string) {
        setTodolists(todolists.filter(el => el.id !== todolistId));
        delete tasks[todolistId];
    }

    return (
        <div className="App">
            <ButtonAppBar/>
            <Container fixed>
                <Grid container style={{marginTop: "10px", marginBottom:'10px'}}>
                    <Input addItem={addTodolist} />
                </Grid>
                <Grid container spacing={3}>
                    {
                        todolists.map(el => {
                            let tasksForTodolist = tasks[el.id];

                            if (el.filter === "active") {
                                tasksForTodolist = tasks[el.id].filter(t => t.isDone === false);
                            }
                            if (el.filter === "completed") {
                                tasksForTodolist = tasks[el.id].filter(t => t.isDone === true);
                            }

                            function changeFilter(todolistId: string, value: FilterValuesType) {
                                setTodolists(todolists.map(
                                    el => el.id === todolistId ? {...el, filter: value} : el
                                ))
                            }

                            return (
                                <Grid item>
                                    <Paper style={{padding: '10px'}}>
                                        <Todolist title={el.title}
                                                  key={el.id}
                                                  todolistId={el.id}
                                                  removeTodolist={removeTodolist}
                                                  updateTodolist={updateTodolist}
                                                  tasks={tasksForTodolist}
                                                  removeTask={removeTask}
                                                  changeFilter={changeFilter}
                                                  addTask={addTask}
                                                  updateTask={updateTask}
                                                  changeTaskStatus={changeStatus}
                                                  filter={el.filter}
                                        />
                                    </Paper>
                                </Grid>
                            )
                        })
                        }
                        </Grid>
                        </Container>
                        </div>
                        );
                    }

                    export default App;
