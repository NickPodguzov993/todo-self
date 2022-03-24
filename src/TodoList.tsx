import React, { useCallback} from 'react';
import {FilterValueType} from "./App";
import {AddItemForm} from "./AddItemForm";
import {EditableSpan} from "./EditableSpan";
import {Button, IconButton} from "@material-ui/core";
import {Delete} from "@material-ui/icons";
import {Task} from "./Task";

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type propsType = {
    title: string
    tasks: TaskType[]
    removeTask: (tID: string, todoListId: string) => void
    changeTaskStatus: (id: string, isDone: boolean, todoListId: string) => void
    changeTaskTitle: (id: string, newTitle: string, todoListId: string) => void
    changeFilter: (value: FilterValueType, todoListID: string) => void
    addTask: (title: string, todoListId: string) => void
    filter: string
    todoListId: string
    removeTodoList: (todoListId: string) => void
    changeTodoListTitle: (todoListId: string, newTitle: string) => void

}

export const TodoList = React.memo((props: propsType) => {
    console.log('todoList called')

    let addTask = useCallback((title: string) => {
        props.addTask(title, props.todoListId)
    }, [props.addTask, props.todoListId])

    const removeTodolist = () => {
        props.removeTodoList(props.todoListId)
    }

    const changeTodoListTitleHandler = useCallback((newTitle: string) => {
        props.changeTodoListTitle(props.todoListId, newTitle)
    }, [props.changeTodoListTitle, props.todoListId])


    const allTaskHandler = useCallback(() => {
        props.changeFilter('ALL', props.todoListId)
    }, [props.changeFilter, props.todoListId])

    const activeTaskHandler = useCallback(() => {
        props.changeFilter('ACTIVE', props.todoListId)
    }, [props.changeFilter, props.todoListId])

    const completedTaskHandler = useCallback(() => {
        props.changeFilter('COMPLETED', props.todoListId)
    }, [props.changeFilter, props.todoListId])

    let taskForTodoList = props.tasks

    if (props.filter === 'ACTIVE') {
        taskForTodoList = props.tasks.filter(t => !t.isDone)
    }
    if (props.filter === 'COMPLETED') {
        taskForTodoList = props.tasks.filter(t => t.isDone)
    }

    return (
        <div>
            <h3><EditableSpan title={props.title} onChange={changeTodoListTitleHandler}/>

                <IconButton onClick={removeTodolist}>
                    <Delete/>
                </IconButton>
            </h3>
            <div>
                <AddItemForm addItem={addTask}/>
            </div>
            <ul>
                {taskForTodoList.map(t => <Task removeTask={props.removeTask}
                                                changeTaskStatus={props.changeTaskStatus}
                                                changeTaskTitle={props.changeTaskTitle}
                                                todoListId={props.todoListId}
                                                task={t}
                                                key={t.id}/>)}
            </ul>
            <Button variant={props.filter === 'ALL' ? 'outlined' : 'text'} onClick={allTaskHandler}>ALL</Button>
            <Button variant={props.filter === 'ACTIVE' ? 'outlined' : 'text'}
                    onClick={activeTaskHandler} color={'primary'}>ACTIVE
            </Button>
            <Button variant={props.filter === 'COMPLETED' ? 'outlined' : 'text'}
                    onClick={completedTaskHandler} color={'secondary'}>COMPLETED
            </Button>
        </div>
    )
})

