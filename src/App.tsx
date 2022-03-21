import React, {useCallback, useReducer} from 'react';

import './App.css';
import {TaskType, TodoList} from "./TodoList";
import {v1} from "uuid";
import {AddItemForm} from "./AddItemForm";
import {AppBar, Button, Container,
    Grid, IconButton, Paper, Toolbar, Typography} from "@material-ui/core";
import {Menu} from "@material-ui/icons";
import {
    AddTodolistAC,
    ChangeFilterTodolistAC,
    ChangeTitleTodolistAC,
    RemoveTodolistAC,
    todoListsReducer
} from "./state/todolist-reducer";
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC, tasksReducer} from "./state/tasks-reducer";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "./state/store";

export  type FilterValueType = 'ALL' | 'ACTIVE' | 'COMPLETED'

export type TodoListsType = {
    id: string
    title: string
    filter: FilterValueType
}

export type TaskStateType = {
    [key: string]: TaskType[]
}


function App() {

    let todoList1 = v1()
    let todoList2 = v1()


    const todoLists = useSelector<AppRootStateType, TodoListsType[]>(state => state.todoLists)
    const tasks = useSelector<AppRootStateType, TaskStateType>(state => state.tasks)
    const dispatch = useDispatch()


    const removeTask = useCallback((tID: string, todoListId: string) => {
        dispatch(removeTaskAC(tID,todoListId))
    },[])

    const changeFilter = useCallback((value: FilterValueType, todoListID: string) => {
        const action = ChangeFilterTodolistAC(value, todoListID)
        dispatch(action)
    },[])

    const addTask = useCallback((title: string, todoListId: string) => {
        const action = addTaskAC(title,todoListId)
        dispatch(action)
    },[])

    const changeTaskStatus = useCallback((id: string, isDone: boolean, todoListId: string) => {
        const action = changeTaskStatusAC(id, isDone, todoListId)
        dispatch(action)
    },[])

    const changeTaskTitle = useCallback((id: string, newTitle: string, todoListId: string) => {
        const action = changeTaskTitleAC(id, newTitle, todoListId)
        dispatch(action)
    },[])

    const removeTodoList = useCallback((todoListId: string) => {
        const action = RemoveTodolistAC(todoListId)
        dispatch(action)

    },[])

    const changeTodoListTitle = useCallback((todoListId: string, newTitle: string) => {
            const action = ChangeTitleTodolistAC(todoListId,newTitle)
        dispatch(action)
    },[])

    const addTodoList = useCallback((title: string) => {
        const action = AddTodolistAC(title)
        dispatch(action)

    }, [])

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

                        return <Grid item key={m.id}>
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
