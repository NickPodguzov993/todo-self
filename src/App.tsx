import React, {useState} from 'react';

import './App.css';
import {TaskType, TodoList} from "./TodoList";
import {v1} from "uuid";
import {AddItemForm} from "./AddItemForm";
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from "@material-ui/core";
import {Menu} from "@material-ui/icons";

export  type FilterValueType = 'ALL' | 'ACTIVE' | 'COMPLETED'

export type TodoListsType = {
    id: string
    title: string
    filter: FilterValueType
}

type TaskStateType = {
    [key: string]: TaskType[]
}


function App() {

    let todoList1 = v1()
    let todoList2 = v1()

    let [todoLists, setTodoLists] = useState<TodoListsType[]>([
        {id: todoList1, title: 'What to learn', filter: 'ALL',},
        {id: todoList2, title: 'What to buy', filter: 'ALL',},
    ])


    let [tasks, setTasks] = useState<TaskStateType>({
        [todoList1]: [
            {id: v1(), title: 'HTML&CSS', isDone: true},
            {id: v1(), title: 'JS', isDone: true},
            {id: v1(), title: 'React', isDone: false},
        ],
        [todoList2]: [
            {id: v1(), title: 'milk', isDone: true},
            {id: v1(), title: 'brain', isDone: true},
            {id: v1(), title: 'book', isDone: false},
        ],
    })


    const removeTask = (tID: string, todoListId: string) => {
        let todoListTask = tasks[todoListId]
        tasks[todoListId] = todoListTask.filter(f => f.id !== tID)
        setTasks({...tasks})
    }

    const changeFilter = (value: FilterValueType, todoListID: string) => {
        let todolist = todoLists.find(f => f.id === todoListID)
        if (todolist) {
            todolist.filter = value
            setTodoLists([...todoLists])
        }
    }

    const addTask = (title: string, todoListId: string) => {
        let todoListTask = tasks[todoListId]
        let task = {id: v1(), title: title, isDone: false}
        tasks[todoListId] = [task, ...todoListTask]
        setTasks({...tasks})
    }

    const changeTaskStatus = (id: string, isDone: boolean, todoListId: string) => {
        let todoListTask = tasks[todoListId]
        let task = todoListTask.find(f => f.id === id)
        if (task) {
            task.isDone = isDone
            setTasks({...tasks})
        }
    }

    const changeTaskTitle = (id: string, newTitle: string, todoListId: string) => {
        let todoListTask = tasks[todoListId]
        let task = todoListTask.find(f => f.id === id)
        if (task) {
            task.title = newTitle
            setTasks({...tasks})
        }
    }

    const removeTodoList = (todoListId: string) => {
        setTodoLists(todoLists.filter(f => f.id !== todoListId))
        delete tasks[todoListId]
        setTasks({...tasks})
    }

    const changeTodoListTitle = (todoListId: string, newTitle: string) => {
        let todoList = todoLists.find(f => f.id === todoListId)
        if (todoList) {
            todoList.title = newTitle
            setTodoLists([...todoLists])

        }

    }

    const addTodoList = (title: string) => {
        let newTodoList: TodoListsType = {id: v1(), title: title, filter: 'ALL'}
        setTodoLists([newTodoList, ...todoLists])
        setTasks({
            ...tasks,
            [newTodoList.id]: []
        })
    }

    return (
        <div className="App">
            <AppBar position="static">
                <Toolbar variant="dense">
                    <IconButton edge="start" color="inherit" aria-label="menu">
                        <Menu/>
                    </IconButton>
                    <Typography variant="h6" color="inherit" component="div">
                        News
                    </Typography>
                    <Button color={'inherit'}>Login</Button>
                </Toolbar>
            </AppBar>
            <Container>
                <Grid container style={{padding:'20px'}}>
                    <AddItemForm addItem={addTodoList}/>
                </Grid>
                <Grid container spacing={3}>
                    {todoLists.map(m => {
                        let allTodoListTasks = tasks[m.id];
                        let taskForTodoList = allTodoListTasks;
                        if (m.filter === 'ACTIVE') {
                            taskForTodoList = allTodoListTasks.filter(t => !t.isDone)
                        }
                        if (m.filter === 'COMPLETED') {
                            taskForTodoList = allTodoListTasks.filter(t => t.isDone)
                        }
                        return <Grid item>
                            <Paper style={{padding: '10px'}}>
                                <TodoList key={m.id}
                                          todoListId={m.id}
                                          title={m.title}
                                          tasks={taskForTodoList}
                                          changeFilter={changeFilter}
                                          addTask={addTask}
                                          removeTask={removeTask}
                                          changeTaskStatus={changeTaskStatus}
                                          filter={m.filter}
                                          removeTodoList={removeTodoList}
                                          changeTaskTitle={changeTaskTitle}
                                          changeTodoListTitle={changeTodoListTitle}
                                />
                            </Paper> </Grid>
                    })}</Grid>
            </Container>
        </div>
    );
}

export default App;
