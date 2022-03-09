import React, {useState} from 'react';

import './App.css';
import {TodoList} from "./TodoList";

export  type FilterValueType = 'ALL' | 'ACTIVE' | 'COMPLETED'

function App() {



    let [tasks, setTasks] = useState(
        [
            {id: 1, title:'HTML&CSS', isDone: true},
            {id: 2, title:'JS', isDone: true},
            {id: 3, title:'React', isDone: false},
            {id: 4, title:'Redux', isDone: false},
            {id: 5, title:'GraphQL', isDone: false},
        ]
    )
    let [filter,setFilter] = useState<FilterValueType>('ALL')
    let taskForTodoList = tasks;
     if(filter === 'ACTIVE') {
         taskForTodoList = tasks.filter(t=> t.isDone === false)
     } if(filter === 'COMPLETED') {
        taskForTodoList = tasks.filter(t=> t.isDone === true)
    }


    const removeTask = (tID:number) => {
        tasks = tasks.filter(f=> f.id !== tID)
        setTasks(tasks)
    }

     const changeFilter = (value: FilterValueType)=> {
         setFilter(value)
     }

  return (
    <div className="App">
      <TodoList title={'What to learn'}
                tasks={taskForTodoList}
                changeFilter={changeFilter}
                removeTask={removeTask}/>
    </div>
  );
}

 export default App;
