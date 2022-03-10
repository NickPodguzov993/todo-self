import React, {useState} from 'react';

import './App.css';
import {TodoList} from "./TodoList";
import {v1} from "uuid";

export  type FilterValueType = 'ALL' | 'ACTIVE' | 'COMPLETED'

function App() {



    let [tasks, setTasks] = useState(
        [
            {id: v1(), title:'HTML&CSS', isDone: true},
            {id: v1(), title:'JS', isDone: true},
            {id: v1(), title:'React', isDone: false},
            {id: v1(), title:'Redux', isDone: false},
            {id: v1(), title:'GraphQL', isDone: false},
        ]
    )
    let [filter,setFilter] = useState<FilterValueType>('ALL')
    let taskForTodoList = tasks;
     if(filter === 'ACTIVE') {
         taskForTodoList = tasks.filter(t=> t.isDone === false)
     } if(filter === 'COMPLETED') {
        taskForTodoList = tasks.filter(t=> t.isDone === true)
    }


    const removeTask = (tID:string) => {
        tasks = tasks.filter(f=> f.id !== tID)
        setTasks(tasks)
    }

     const changeFilter = (value: FilterValueType)=> {
         setFilter(value)
     }

     const addTask = (title:string)=> {
         let task = {id: v1(), title:title, isDone: false}
         setTasks([task, ...tasks])
     }

     const changeTaskStatus = (id:string, isDone:boolean) => {
         let task = tasks.find(f=> f.id === id)
         if(task) {
             task.isDone = isDone
             setTasks([...tasks])
         }
     }

  return (
    <div className="App">
      <TodoList title={'What to learn'}
                tasks={taskForTodoList}
                changeFilter={changeFilter}
                addTask={addTask}
                removeTask={removeTask}
                changeTaskStatus={changeTaskStatus}
                filter={filter}/>
    </div>
  );
}

 export default App;
