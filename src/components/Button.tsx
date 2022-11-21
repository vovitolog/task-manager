import React from "react";

type PropsType = {
    buttonName: string
    callBack: () => void
}


export const Button = (props: PropsType) => {

    const onclickHandler = () => {
        props.callBack();
    }
    return (
        <button onClick={onclickHandler}>

        </button>
    )
}