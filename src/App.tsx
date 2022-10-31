import React from 'react';
import './App.css';
import {Todolist} from './Todolist';
import {v1} from "uuid";

// Read => part. pagination, filter, sort
// Crut
//Create
// Read - part, pagination, filtration, sort
//Update
//Delete


export type TaskType = {
    id: string
    title: string
    isDone: boolean
}
export type FilterValueType = "all"|"active"|"completed"


function App() {

    const todoListTitle: string ='What to learn'
    const[tasksForTodolist, setTasksForTodolist] = React.useState([
        { id: v1(), title: "HTML&CSS", isDone: true },
        { id: v1(), title: "JS", isDone: true },
        { id: v1(), title: "ReactJS", isDone: false }
    ])

    const removeTask = (taskId:string) => {
        setTasksForTodolist(tasksForTodolist.filter(task => task.id !== taskId))
    }

    const addTask = (title:string) => {
        const newTaskId: string = v1()
        const newTask:TaskType = {
            id: v1(),
            title,
            isDone: false
        }

        setTasksForTodolist([newTask, ...tasksForTodolist])
    }


    const [filter, setFilter] = React.useState<FilterValueType>("all")
    const changeFilter = (filter: FilterValueType) => {
        setFilter(filter)
    }

    const getFilteedrDone = (tasks: Array<TaskType>, filterValue: FilterValueType) => {
        let FilteredTasks = tasks
        if (filter === "active") {
            FilteredTasks = tasksForTodolist.filter(t=>!t.isDone)
        }
        if (filter === "completed") {
            FilteredTasks = tasksForTodolist.filter(t=>t.isDone)
        }
        return FilteredTasks;
    }

    const filteredTasks = getFilteedrDone(tasksForTodolist, filter)

    return (
        <div className="App">
            <Todolist
                title={todoListTitle}
                addTask={addTask}
                tasks={filteredTasks}
                removeTask={removeTask}
                changeFilter={changeFilter}
            />
        </div>
    );
}

export default App;
