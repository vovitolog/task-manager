import {TasksStateType} from "../App";
import {addTaskAC, changeTaskStatusAC, removeTaskAC, tasksReducer, updateTaskAC} from "./tasks-reducer";
import {addTodolistAC, addTodolistACType, removeTodolistAC} from "./todolist-reducer";

test('Remove tasks tests',
    () => {

        const state: TasksStateType =
            {
                "todolistId1": [
                    {id: "1", title: "HTML&CSS", isDone: true},
                    {id: "2", title: "JS", isDone: true},
                    {id: "3", title: "ReactJS", isDone: false},
                ],
                "todolistId2": [
                    {id: "1", title: "Milk", isDone: true},
                    {id: "2", title: "React Book", isDone: true},
                    {id: "3", title: "Bread", isDone: false}
                ]
            }
        const action = removeTaskAC("todolistId2", "2");
        const endState = tasksReducer(state, action);

        expect(endState["todolistId1"].length).toBe(3)
        expect(endState["todolistId2"].length).toBe(2)
        expect(endState["todolistId2"].every(t => t.id !== "2")).toBeTruthy();
    })

test('Add tasks tests',
    () => {

        const state: TasksStateType =
            {
                "todolistId1": [
                    {id: "1", title: "HTML&CSS", isDone: true},
                    {id: "2", title: "JS", isDone: true},
                    {id: "3", title: "ReactJS", isDone: false},
                ],
                "todolistId2": [
                    {id: "1", title: "Milk", isDone: true},
                    {id: "2", title: "React Book", isDone: true},
                    {id: "3", title: "Bread", isDone: false}
                ]
            }
        const action = addTaskAC("juice", "todolistId2");
        const endState = tasksReducer(state, action);

        expect(endState["todolistId1"].length).toBe(3)
        expect(endState["todolistId2"].length).toBe(4)
        expect(endState["todolistId2"][0].id).toBeDefined();
        expect(endState["todolistId2"][0].title).toBe("juice");
        expect(endState["todolistId2"][0].isDone).toBe(false);
    })

test('Change task status tests',
    () => {

        const state: TasksStateType =
            {
                "todolistId1": [
                    {id: "1", title: "HTML&CSS", isDone: true},
                    {id: "2", title: "JS", isDone: true},
                    {id: "3", title: "ReactJS", isDone: false},
                ],
                "todolistId2": [
                    {id: "1", title: "Milk", isDone: true},
                    {id: "2", title: "React Book", isDone: true},
                    {id: "3", title: "Bread", isDone: false}
                ]
            }
        const action = changeTaskStatusAC("todolistId2", "2", false);
        const endState = tasksReducer(state, action);

        expect(endState["todolistId2"][1].isDone).toBeFalsy();
        expect(endState["todolistId1"][1].isDone).toBeTruthy();
    })

test('Change task title tests',
    () => {

        const state: TasksStateType =
            {
                "todolistId1": [
                    {id: "1", title: "HTML&CSS", isDone: true},
                    {id: "2", title: "JS", isDone: true},
                    {id: "3", title: "ReactJS", isDone: false},
                ],
                "todolistId2": [
                    {id: "1", title: "Milk", isDone: true},
                    {id: "2", title: "React Book", isDone: true},
                    {id: "3", title: "Bread", isDone: false}
                ]
            }
        const action = updateTaskAC("todolistId2", "2", "Marx");
        const endState = tasksReducer(state, action);

        expect(endState["todolistId2"][1].title).toBe('Marx');
        expect(endState["todolistId1"][1].title).toBe('JS');
    })

test('New todolist adding tests',
    () => {

        const state: TasksStateType =
            {
                "todolistId1": [
                    {id: "1", title: "HTML&CSS", isDone: true},
                    {id: "2", title: "JS", isDone: true},
                    {id: "3", title: "ReactJS", isDone: false},
                ],
                "todolistId2": [
                    {id: "1", title: "Milk", isDone: true},
                    {id: "2", title: "React Book", isDone: true},
                    {id: "3", title: "Bread", isDone: false}
                ]
            }
        const action = addTodolistAC("New Todolist");
        const endState = tasksReducer(state, action);

        const keys = Object.keys(endState);
        const newKey = keys.find(k=> k !== "todolistId1" && k !=="todolistId2");
        if (!newKey) throw Error("new key should be added");

        expect(keys.length).toBe(3);
        expect(endState[newKey]).toEqual([]);
    })

test('property with todolistId should be deleted', () => {
    const startState: TasksStateType = {
        'todolistId1': [
            {id: '1', title: 'CSS', isDone: false},
            {id: '2', title: 'JS', isDone: true},
            {id: '3', title: 'React', isDone: false}
        ],
        'todolistId2': [
            {id: '1', title: 'bread', isDone: false},
            {id: '2', title: 'milk', isDone: true},
            {id: '3', title: 'tea', isDone: false}
        ]
    }

    const action = removeTodolistAC('todolistId2')

    const endState = tasksReducer(startState, action)


    const keys = Object.keys(endState)

    expect(keys.length).toBe(1)
    expect(endState['todolistId2']).not.toBeDefined()
})