import React, {ChangeEvent, useState, KeyboardEvent} from 'react';
import {FilterValuesType} from './App';
import {Input} from "./components/Input";
import {EditableSpan} from "./components/EditableSpan";
import {Button, Checkbox, IconButton, ListItem} from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import {List} from "@mui/icons-material";



export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type PropsType = {
    id: string
    title: string
    tasks: Array<TaskType>
    removeTask: (taskId: string, todolistId: string) => void
    changeFilter: (value: FilterValuesType, todolistId: string) => void
    addTask: (title: string, todolistId: string) => void
    changeTaskStatus: (id: string, isDone: boolean, todolistId: string) => void
    removeTodolist: (id: string) => void
    filter: FilterValuesType
    updateTask:(todolistId: string,taskId: string,updateTitle:string)=>void
    updateTodolist:(todolistId: string,updateTitle:string)=>void
}

export function Todolist(props: PropsType) {

    const removeTodolist = () => props.removeTodolist(props.id)

    const onAllClickHandler = () => props.changeFilter("all", props.id);
    const onActiveClickHandler = () => props.changeFilter("active", props.id);
    const onCompletedClickHandler = () => props.changeFilter("completed", props.id);

    const addTaskHandler=(newTitle:string)=>{
        props.addTask(newTitle,props.id)
    }

    const updateTodolistHandler=(updateTitle:string)=>{
        props.updateTodolist(props.id,updateTitle)
    }

    return <div>
        <h3>
            {/*{props.title}*/}
            <EditableSpan callBack={updateTodolistHandler} oldTitle={props.title}/>
            <IconButton size="small" onClick={removeTodolist}>
                <DeleteIcon />
            </IconButton>
        </h3>
        <Input name={"add new task"} callBack={addTaskHandler} />
          <div>
            {
                props.tasks.map(t => {
                    const onClickHandler = () => props.removeTask(t.id, props.id)
                    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
                        let newIsDoneValue = e.currentTarget.checked;
                        props.changeTaskStatus(t.id, newIsDoneValue, props.id);
                    }

                    const updateTaskHandler=(updateTitle:string, id:string)=>{
                         props.updateTask(props.id,t.id,updateTitle)
                    }


                    return <div key={t.id} className={t.isDone ? "is-done" : ""} style={{padding: 0}}>
                        <Checkbox color="primary" onChange={onChangeHandler} checked={t.isDone}/>
                        {/*<span>{t.title}</span>*/}
                        <EditableSpan callBack={(oldTitle)=>updateTaskHandler(oldTitle, t.id)} oldTitle={t.title}/>
                        <IconButton size="small" onClick={onClickHandler}>
                            <DeleteIcon />
                        </IconButton>
                    </div>
                })
            }
        </div>
        <div>
            <Button size="small" variant={props.filter === 'all' ? "contained" : "outlined"}
                    color="primary" onClick={onAllClickHandler}>All
            </Button>
            <Button size="small" variant={props.filter === 'active' ? "contained" : "outlined"}
                    color="primary" onClick={onActiveClickHandler}>Active
            </Button>
            <Button size="small" variant={props.filter === 'completed' ? "contained" : "outlined"}
                    color="primary" onClick={onCompletedClickHandler}>Completed
            </Button>
        </div>
    </div>
}


