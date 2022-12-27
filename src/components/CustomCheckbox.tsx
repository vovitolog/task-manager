import React, {ChangeEvent} from 'react';

type PropsType = {
    callback: (checkedValue: boolean) => void
    isDone: boolean
}

export const CustomCheckbox = (props: PropsType) => {

   const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        props.callback(event.currentTarget.checked);
    }
    return (
        <div>
            <input
                type={"checkbox"}
                checked={props.isDone}
                onChange={onChangeHandler}
            />
        </div>
    );
};