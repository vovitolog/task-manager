import {v1} from "uuid";
import {TaskType} from "../Todolist";
import {TasksStateType} from "../App";
import {addTodolistACType, removeTodolistAC, removeTodolistACType} from "./todolist-reducer";
import {stepClasses} from "@mui/material";

export const tasksReducer = (state: TasksStateType, action: TasksReducerTypes): TasksStateType => {
    switch (action.type) {

        case 'REMOVE-TASK': {
            const stateCopy = {...state};
            const tasks = state[action.todolistId];
            const filteredTasks = tasks.filter(t => t.id !== action.taskId)
            stateCopy[action.todolistId] = filteredTasks;
            return stateCopy;
        }
        case 'ADD-TASK': {
            const newTask: TaskType = {id: v1(), title: action.payload.title, isDone: false};
            return {...state, [action.payload.todolistId]: [newTask, ...state[action.payload.todolistId]]};
        }
        case 'CHANGE-STATUS': {
            return {
                ...state,
                [action.payload.todolistId]: state[action.payload.todolistId].map(t => t.id === action.payload.taskId ? {
                    ...t,
                    isDone: action.payload.isDone
                } : t)
            };
        }

        case 'UPDATE-TASK': {
            return {
                ...state,
                [action.payload.todolistId]: state[action.payload.todolistId].map(t => t.id === action.payload.taskId ? {
                    ...t,
                    title: action.payload.newTitle
                } : t)
            };
        }
        case 'ADD-TODOLIST': {
            const stateCopy = {...state}
            stateCopy[action.payload.todolistId] = [];
            return stateCopy;
        }

        case "REMOVE-TODOLIST": {
            const stateCopy = {...state}
            delete stateCopy[action.payload.todolistId];
            return  stateCopy;
        }

        default:
            throw new Error('Unknown type');
    }
}

type TasksReducerTypes =
    removeTaskACType
    | addTaskCType
    | updateTaskACType
    | changeTaskStatusACType
    | addTodolistACType
    | removeTodolistACType

type removeTaskACType = {
    type: 'REMOVE-TASK',
    todolistId: string,
    taskId: string
}

export const removeTaskAC = (todolistId: string, taskId: string): removeTaskACType => {
    return {
        todolistId: todolistId,
        taskId: taskId,
        type: 'REMOVE-TASK',
    } as const
}

type addTaskCType = ReturnType<typeof addTaskAC>;

export const addTaskAC = (title: string, todolistId: string) => {
    return {
        type: 'ADD-TASK',
        payload: {
            title,
            todolistId: todolistId,
        }
    } as const
}

type updateTaskACType = ReturnType<typeof updateTaskAC>;
export const updateTaskAC = (todolistId: string, taskId: string, newTitle: string) => {
    return {
        type: 'UPDATE-TASK',
        payload: {
            newTitle,
            todolistId,
            taskId
        }
    } as const
}

type changeTaskStatusACType = ReturnType<typeof changeTaskStatusAC>;

export const changeTaskStatusAC = (todolistId: string, taskId: string, isDone: boolean) => {
    return {
        type: 'CHANGE-STATUS',
        payload: {
            todolistId,
            taskId,
            isDone,
        }
    } as const
}
