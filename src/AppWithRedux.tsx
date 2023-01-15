import React, {useReducer, useState} from 'react';
import './App.css';
import {TaskType, Todolist} from './Todolist';
import {v1} from 'uuid';
import {Input} from "./Input";
import ButtonAppBar from "./ButtonAppBar";
import Container from "@mui/material/Container";
import Grid from '@mui/material/Grid'
import {Paper} from "@mui/material";
import {
    addTodolistAC,
    changeTodolistFilterAC,
    removeTodolistAC,
    todolistReducer,
    updateTodolistAC
} from "./state/todolist-reducer";
import {addTaskAC, changeTaskStatusAC, removeTaskAC, tasksReducer, updateTaskAC} from './state/tasks-reducer';
import {useDispatch, useSelector} from "react-redux";
import {AppRootType} from "./state/store";

export type FilterValuesType = "all" | "active" | "completed";
export type TodolistsType = {
    id: string,
    title: string,
    filter: FilterValuesType
}
export type TasksStateType = {
    [key: string]: Array<TaskType>
}

function AppWithRedux() {
    // let todolistId1 = v1();
    // let todolistId2 = v1();

    const todolists = useSelector<AppRootType, Array<TodolistsType>>(state => state.todolists);
    const tasks = useSelector<AppRootType, TasksStateType>(state => state.tasks);

    const dispatch = useDispatch();

    // let [todolists, dispatchTodolistsReducer] = useReducer(todolistReducer, [
    //     {id: todolistId1, title: "What to learn", filter: "all"},
    //     {id: todolistId2, title: "What to buy", filter: "all"}
    // ])

    // let [tasks, dispatchTasksReducer] = useReducer(tasksReducer, {
    //     [todolistId1]: [
    //         {id: v1(), title: "HTML&CSS", isDone: true},
    //         {id: v1(), title: "JS", isDone: true},
    //         {id: v1(), title: "ReactJS", isDone: false},
    //         {id: v1(), title: "Rest API", isDone: false},
    //         {id: v1(), title: "GraphQL", isDone: false},
    //     ],
    //     [todolistId2]: [
    //         {id: v1(), title: "Milk", isDone: true},
    //         {id: v1(), title: "React Book", isDone: true},
    //         {id: v1(), title: "Bread", isDone: false}
    //     ]
    // });

    function removeTask(todolistId: string, taskId: string) {
        dispatch(removeTaskAC(todolistId, taskId));
        //dispatchTasksReducer(action);
        // let filteredTasks = tasks[todolistId].filter(t => t.id != taskId);
        // setTasks({...tasks, [todolistId]: filteredTasks});
    }

    function addTask(todolistId: string, title: string) {

        dispatch(addTaskAC(title, todolistId));
        //dispatchTasksReducer(action);
        // let task = {id: v1(), title: title, isDone: false};
        // setTasks({...tasks, [todolistId]: [task, ...tasks[todolistId]]});
    }

    function updateTask(todolistId: string, taskId: string, newTitle: string) {
        dispatch(updateTaskAC(todolistId, taskId, newTitle));
        //dispatchTasksReducer(action);
        // setTasks({
        //     ...tasks, [todolistId]: tasks[todolistId].map(t => t.id === taskId ? {...t, title: newTitle} : t)
        // })
    }

    function changeStatus(todolistId: string, taskId: string, isDone: boolean) {
       dispatch(changeTaskStatusAC(todolistId, taskId, isDone));
      //  dispatchTasksReducer(action);
        //setTasks({...tasks, [todolistId]: tasks[todolistId].map(el => el.id === taskId ? {...el, isDone} : el)});
    }

    function addTodolist(title: string) {
       dispatch(addTodolistAC(title));
        // dispatchTodolistsReducer(action);
        // dispatchTasksReducer(action)

        // const newId = v1();
        // const newTodolist: TodolistsType = {id: newId, title: title, filter: 'all'};
        // setTodolists([...todolists, newTodolist]);
        //
        // setTasks({...tasks, [newId]: []})
    }

    function updateTodolist(todolistId: string, newTitle: string) {
       dispatch(updateTodolistAC(todolistId, newTitle));
      //  dispatchTodolistsReducer(action);
        //setTodolists(todolists.map(tl => tl.id === todolistId ? {...tl, title: newTitle} : tl));
    }

    function removeTodolist(todolistId: string) {
       dispatch(removeTodolistAC(todolistId));
        // dispatchTodolistsReducer(action);
        // dispatchTasksReducer(action);
        // setTodolists(todolists.filter(el => el.id !== todolistId));
        // delete tasks[todolistId];
    }

    function changeFilter(todolistId: string, value: FilterValuesType) {
        dispatch(changeTodolistFilterAC(todolistId, value));
        // dispatchTodolistsReducer(action);
    }

    return (
        <div className="App">
            <ButtonAppBar/>
            <Container fixed>
                <Grid container style={{marginTop: "10px", marginBottom: '10px'}}>
                    <Input addItem={addTodolist}/>
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

                            // function changeFilter(todolistId: string, value: FilterValuesType) {
                            //     setTodolists(todolists.map(
                            //         el => el.id === todolistId ? {...el, filter: value} : el
                            //     ))
                            // }

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

export default AppWithRedux;
