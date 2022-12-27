import {
    addTodolistAC,
    changeTodolistFilterAC,
    removeTodolistAC,
    TodolistReducer,
    updateTodolistAC
} from './todolist-reducer'
import {v1} from "uuid";
import {useState} from "react";
import {FilterValuesType, TodolistsType} from "../App";

test('correct todolist should be removed', () => {

    let todolistId1 = v1();
    let todolistId2 = v1();

    const startState: TodolistsType[] = [
        {id: todolistId1, title: "What to learn", filter: "all"},
        {id: todolistId2, title: "What to buy", filter: "all"}
    ]

    const endState: TodolistsType[] = TodolistReducer(startState, removeTodolistAC(todolistId1));

    expect(endState.length).toBe(1);
    expect(endState[0].id).toBe(todolistId2);
})

test('correct todolist should be added', ()=>{
    let todolistId1 = v1();
    let todolistId2 = v1();

    const startState: TodolistsType[] = [
        {id: todolistId1, title: "What to learn", filter: "all"},
        {id: todolistId2, title: "What to buy", filter: "all"}
    ]

    const newTodolistTitle = 'New Todolist';
    const endState : TodolistsType[] = TodolistReducer(startState, addTodolistAC(newTodolistTitle));


    expect(endState.length).toBe(3);
    expect(endState[2].title).toBe(newTodolistTitle);
})

test('todolist should have correct new title', ()=> {
    let todolistId1 = v1();
    let todolistId2 = v1();

    const startState: TodolistsType[] = [
        {id: todolistId1, title: "What to learn", filter: "all"},
        {id: todolistId2, title: "What to buy", filter: "all"}
    ]
    const endState : TodolistsType[] = TodolistReducer(startState, updateTodolistAC(todolistId1, 'New Title'));

    expect(endState[0].title).toBe('New Title');
    expect(endState[1].title).toBe('What to buy');

})

test ('correct filter of todolist should be changed', ()=> {
    let todolistId1 = v1();
    let todolistId2 = v1();

    const startState: TodolistsType[] = [
        {id: todolistId1, title: "What to learn", filter: "all"},
        {id: todolistId2, title: "What to buy", filter: "all"}
    ]

    const newFilter: FilterValuesType = 'completed';
    const endState : TodolistsType[] = TodolistReducer(startState, changeTodolistFilterAC(todolistId1, newFilter));

    expect(endState[0].filter).toBe(newFilter);
    expect(endState[1].filter).toBe('all');
})