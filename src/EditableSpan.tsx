import React, {ChangeEvent, useState} from 'react';
import TextField from "@mui/material/TextField";

type EditableSpanType = {
    title: string
    updateItem: (newTitle: string) => void
}

export const EditableSpan = (props: EditableSpanType) => {
    const [isEditable, seIsEditable] = useState<boolean>(false);
    const [newTitle, setNewTitle] = useState<string>(props.title);

    const onEditClickHandler = () => {
        seIsEditable(!isEditable);
        props.updateItem(newTitle);
    }

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setNewTitle(e.currentTarget.value);

    }

    return isEditable
        ? <TextField size={'small'}value={newTitle} onChange={onChangeHandler} autoFocus onBlur={onEditClickHandler}></TextField>
        : <span onDoubleClick={onEditClickHandler}>{newTitle}</span>
};
