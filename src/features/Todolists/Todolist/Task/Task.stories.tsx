import React from "react";
import {action} from '@storybook/addon-actions'
import {Task} from "./Task";
import {TaskPriorities, TaskStatuses} from "../../../../api/todolists-api";

export default {
    title: 'Task component',
    component: Task
}

const changeTaskTitleCallback = action('Title changed');
const changeTaskStatusCallback = action('Status changed');
const removeTaskCallback = action('Task removed');

export const TaskBaseExample = (props: any) => {
    return <>

        <Task task={{
            id: '1', status: TaskStatuses.Completed, title: 'CSS', todoListId: "1",
            description: '', startDate: '', deadLine: '', addedDate: '', priority: TaskPriorities.Low, order: 0
        }}
              changeTaskTitle={changeTaskTitleCallback}
              changeTaskStatus={changeTaskStatusCallback}
              removeTask={removeTaskCallback}
              todolistId={'todolistId1'}
        />
        <Task task={{
            id: '2', status: TaskStatuses.New, title: 'JS', todoListId: "2",
            description: '', startDate: '', deadLine: '', addedDate: '', priority: TaskPriorities.Low, order: 0
        }}
              changeTaskTitle={changeTaskTitleCallback}
              changeTaskStatus={changeTaskStatusCallback}
              removeTask={removeTaskCallback}
              todolistId={'todolistId2'}
        />
    </>
}
