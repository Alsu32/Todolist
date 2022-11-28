import React, {ChangeEvent, useState} from 'react';
import {TextField} from "@mui/material";

type PropsType = {
    callBack: (oldTitle: string) => void
    oldTitle: string
}

export const EditableSpan = (props: PropsType) => {
    let [updateTitle, setUpdateTitle] = useState(props.oldTitle)
    const [edit, setEdit] = useState(false)

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setUpdateTitle(e.currentTarget.value)
    }
    const addTask = () => {
        props.callBack(updateTitle);
    }
    const onDoubleClickHandler = () => {
        setEdit(!edit)
        edit && addTask()
    }


    return (
        edit
            ? <TextField variant="standard" color="secondary" onChange={onChangeHandler}
                         onBlur={onDoubleClickHandler} autoFocus value={updateTitle}/>
            : <span onDoubleClick={onDoubleClickHandler}>{props.oldTitle}</span>

    );
};

