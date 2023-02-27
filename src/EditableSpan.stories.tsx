import React from "react";
import {action} from '@storybook/addon-actions'
import {Task} from "./Task";
import { EditableSpan } from "./EditableSpan";

export default {
    title: 'EditableSpan component',
    component: EditableSpan
}

const changeCallback = action('Value changed');

export const EditableSpanBaseExample = (props: any) => {
    return <EditableSpan value={'Start value'} onChange={changeCallback}/>
}
