import React, {ChangeEvent, KeyboardEvent, useState} from "react"
import {FilterValueType, TaskType} from "./App";


export type TodolistPropsTypes={
    title:string
    tasks: Array<TaskType>
    addTask: (title:string) => void
    removeTask: (taskId:string) => void
    changeFilter: (filter:FilterValueType) => void
}

export const Todolist=(props:TodolistPropsTypes)=>{
    const [title, setTitle]=useState("")
    const tasksJSXItemsList = props.tasks.length
        ? <ul>
            {
                props.tasks.map((el)=>{
                    const removeTask = () => props.removeTask(el.id)
                    return(
                        <li key={el.id}>
                            <input type="checkbox" checked={el.isDone}/>
                            <span>{el.title}</span>
                            <button onClick={removeTask}>x</button>
                        </li>
                    )
                })
            }
        </ul>
        : <span>Your list empty</span>

    const onClickaddTask = () => {
        const trimmedTitle = title.trim()
        if (trimmedTitle) {
            props.addTask(title)
        }
        setTitle("")
    }

    const onChangeSetLocalTitle = (e:ChangeEvent<HTMLInputElement>) => setTitle(e.currentTarget.value)

    const changeFilterHandlerCreator = (filter: FilterValueType) => {
        return () => props.changeFilter(filter)
    }

    const onKeyDownEnterAddTask = (e:KeyboardEvent<HTMLInputElement>) => e.key === "Enter" && onClickaddTask()

    return (
        <div>
            <h3>{props.title}</h3>
            <div>
                <input
                    value={title}
                    onChange={onChangeSetLocalTitle}
                    onKeyDown={onKeyDownEnterAddTask}

                />
                <button onClick={onClickaddTask}>+</button>
            </div>
                {tasksJSXItemsList}
            <div>
            <button onClick={changeFilterHandlerCreator("all")}>All</button>
            <button onClick={changeFilterHandlerCreator("active")}>Active</button>
            <button onClick={changeFilterHandlerCreator("completed")}>Completed</button>
            </div>
        </div>
 )
}
