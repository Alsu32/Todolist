import React, {useState} from 'react';
import './App.css';
import {Todolist} from './Todolist';
import {v1} from 'uuid';



type TodolistType={
    id: string,
    title: string
}
type TasksStateType={
    [key:string]: InTasksType
}
type InTasksType={
    data:DataType[]
    filter:FilterValuesType
}
type DataType={
    id: string
    title: string
    isDone: boolean
}
export type FilterValuesType = "all" | "active" | "completed";

function App() {
    // let [tasks, setTasks] = useState([
    //     {id: v1(), title: "HTML&CSS", isDone: true},
    //     {id: v1(), title: "JS", isDone: true},
    //     {id: v1(), title: "ReactJS", isDone: false},
    //     {id: v1(), title: "Rest API", isDone: false},
    //     {id: v1(), title: "GraphQL", isDone: false},
    // ]);
    // let [filter, setFilter] = useState<FilterValuesType>("all");


    let todolistId1 = v1();
    let todolistId2 = v1();

    const [todolists, setTodolists] = useState<Array<TodolistType>>([
        {id: todolistId1, title: "What to learn"},
        {id: todolistId2, title: "What to buy"}
    ])

    const [tasks, setTasks] = useState<TasksStateType>({
        [todolistId1]:{
            data:[
                {id: v1(), title: "HTML&CSS", isDone: true},
                {id: v1(), title: "JS", isDone: false}
            ],
            filter: "all"
        } ,
        [todolistId2]:{
            data:[
                {id: v1(), title: "HTML&CSS", isDone: true},
                {id: v1(), title: "JS", isDone: false}
            ],
            filter: "all"
        }
    });

    function removeTask(todolistId:string, taskId: string) {
        setTasks({...tasks,[todolistId]:{...tasks[todolistId], data:[...tasks[todolistId].data.filter(el=>el.id!==taskId)]}});
    }
    function addTask(todolistId:string, title: string) {
        let newTask = {id: v1(), title: title, isDone: false};
        setTasks({...tasks, [todolistId]:{...tasks[todolistId], data: [...tasks[todolistId].data, newTask]}});
    }
    function changeStatus(todolistId:string, taskId: string, isDoneStatus: boolean) {

        setTasks({...tasks, [todolistId]:{...tasks[todolistId], data: tasks[todolistId].data.map(el=>el.id===taskId ? {...el, isDone:isDoneStatus} : el)}});
    }

    function changeFilter(todolistId:string, value: FilterValuesType) {
        setTasks({...tasks, [todolistId]:{...tasks[todolistId], filter:value}});
    }


    return (
        <div className="App">
            {todolists.map(el=>{
                let tasksForTodolist = tasks[el.id].data;
                if (tasks[el.id].filter === "active") {
                    tasksForTodolist = tasksForTodolist.filter(t => !t.isDone);
                }
                if (tasks[el.id].filter === "completed") {
                    tasksForTodolist = tasksForTodolist.filter(t => t.isDone);
                }
                return(
                    <Todolist title={el.title}
                              tasks={tasksForTodolist}
                              removeTask={removeTask}
                              changeFilter={changeFilter}
                              addTask={addTask}
                              changeTaskStatus={changeStatus}
                              filter={tasks[el.id].filter}
                              todolistId={el.id}
                    />
                )
            })}


        </div>
    );
}

export default App;
