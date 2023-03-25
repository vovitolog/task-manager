import React, {useEffect} from 'react';
import './App.css';
import {useAppDispatch, useAppSelector} from './store';
import {AppBar, Button, CircularProgress, Container, IconButton, Toolbar, Typography} from "@mui/material";
import {Menu} from "@mui/icons-material";
import LinearProgress from "@mui/material/LinearProgress"
import {TaskType} from "../api/todolists-api";
import {ErrorSnackbar} from "../components/ErrorSnackBar/ErrorSnackbar";
import {TodolistsList} from "../features/TodolistsList/TodolistsList";
import {Login} from "../features/Login/Login";
import {Navigate, Route, Routes} from 'react-router-dom';
import {RequestStatusType} from "./app-reducer";
import {initializeAppTC, logoutTC} from "../features/Login/auth-reducer";

export type TasksStateType = {
    [key: string]: Array<TaskType>
}

function App() {

    const status = useAppSelector<RequestStatusType>(state => state.app.status);
    const isInitialized = useAppSelector<boolean>(state => state.auth.isInitialized);
    const isLoggedIn = useAppSelector<boolean>(state => state.auth.isLoggedIn);
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(initializeAppTC()), []
    })
    const logoutHandler = () => {
        console.log('LOGOUT')
        dispatch(logoutTC());
    }

    console.log(isInitialized)

    if (!isInitialized) {
        return <div
            style={{position: 'fixed', top: '30%', textAlign: 'center', width: '100%'}}>
            <CircularProgress/>
        </div>
    }

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
                    {isLoggedIn && <Button color="inherit" onClick={logoutHandler}>Logout</Button>}
                </Toolbar>
                {status === 'loading' && <LinearProgress color={'secondary'}/>}
            </AppBar>
            <Container fixed>
                <Routes>
                    <Route path={'/'} element={<TodolistsList/>}/>
                    <Route path={'/login'} element={<Login/>}/>
                    <Route path='/404' element={<h1 style={{textAlign: "center"}}>404: PAGE NOT FOUND</h1>}/>
                    <Route path='*' element={<Navigate to='404'/>}/>

                </Routes>
            </Container>
        </div>
    );
}


export default App;
