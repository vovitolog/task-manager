import React from "react";
import {action} from '@storybook/addon-actions'
import {Task} from "./Task";

export default {
    title: 'Task component',
    component: Task
}

const changeTaskTitleCallback = action('Title changed');
const changeTaskStatusCallback = action('Status changed');
const removeTaskCallback = action('Task removed');

export const TaskBaseExample = (props: any) => {
    return <>

        <Task task={{id: '1', isDone: true, title: 'CSS'}}
              changeTaskTitle={changeTaskTitleCallback}
              changeTaskStatus={changeTaskStatusCallback}
              removeTask={removeTaskCallback}
              todolistId={'todolistId1'}
        />
        <Task task={{id: '2', isDone: false, title: 'JS'}}
              changeTaskTitle={changeTaskTitleCallback}
              changeTaskStatus={changeTaskStatusCallback}
              removeTask={removeTaskCallback}
              todolistId={'todolistId2'}
        />
    </>
}
