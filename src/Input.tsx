import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';

type InputPropsType = {
    addItem: (title: string) => void
}

export const Input = (props: InputPropsType) => {

    const [title, setTitle] = useState("")
    const [error, setError] = useState<string | null>(null)

    const addItem = () => {
        if (title.trim() !== "") {
            props.addItem(title.trim());
            setTitle("");
        } else {
            setError("Title is required");
        }
    }

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }

    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        setError(null);
        if (e.key === 'Enter') {
            props.addItem(title)
        }
    }

    return (
        <div>
            <TextField variant="outlined" value={title}
                       onChange={onChangeHandler}
                       onKeyDown={onKeyPressHandler}
                       size={"small"}
                       error={!!error}
                       label={error? 'Введите значение' : 'Введите текст'}
                // className={error ? "error" : ""}
            />
            <Button color={'primary'} style={{
                marginLeft: '10px',
                maxWidth: '38px',
                minWidth: '38px',
                maxHeight: '38px',
                minHeight: '38px',
                background: 'black'
            }} variant={'contained'} onClick={addItem}>+</Button>
            {/*{error && <div className="error-message">{error}</div>}*/}
        </div>
    );
};
