import React from "react";
import {AddItemForm} from "./AddItemForm";

export default {
    title: 'AddItemForm component',
    component: AddItemForm
}

export const AddItemFormBaseExample = (props: any) => {
    return <AddItemForm addItem={(title)=>{alert(title)}}/>
    }
