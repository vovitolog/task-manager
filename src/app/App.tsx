import React from 'react';
import './App.css';
import {useAppSelector} from './store';
import {AppBar, Button, Container, IconButton, Toolbar, Typography} from "@mui/material";
import {Menu} from "@mui/icons-material";
import LinearProgress from "@mui/material/LinearProgress"
import {TaskType} from "../api/todolists-api";
import {ErrorSnackbar} from "../components/ErrorSnackBar/ErrorSnackbar";
import {TodolistsList} from "../features/TodolistsList/TodolistsList";

export type TasksStateType = {
    [key: string]: Array<TaskType>
}

function App() {


    const status = useAppSelector(state => state.app.status);

    return (
        <div className="App">
            <ErrorSnackbar/>
            <AppBar position="static">
                <Toolbar>
                    <IconButton edge="start" color="inherit" aria-label="menu">
                        <Menu/>
                    </IconButton>
                    <Typography variant="h6">
                        News
                    </Typography>
                    <Button color="inherit">Login</Button>
                </Toolbar>
            </AppBar>
            {status === 'loading' && <LinearProgress color={'secondary'}/>}
            <Container fixed>
                <TodolistsList/>
            </Container>
        </div>
    );
}


export default App;
