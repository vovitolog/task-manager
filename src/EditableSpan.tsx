import React, {ChangeEvent, useState} from 'react';

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
        ? <input value={newTitle} onChange={onChangeHandler} autoFocus onBlur={onEditClickHandler}></input>
        : <span onDoubleClick={onEditClickHandler}>{newTitle}</span>
};
