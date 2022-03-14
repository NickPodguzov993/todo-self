import React, {ChangeEvent} from 'react';
import {FilterValueType} from "./App";
import {AddItemForm} from "./AddItemForm";
import {EditableSpan} from "./EditableSpan";
import {Button, Checkbox, IconButton} from "@material-ui/core";
import {Delete} from "@material-ui/icons";

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type propsType = {
    title: string
    tasks: TaskType[]
    removeTask: (tID: string, todoListId: string) => void
    changeFilter: (value: FilterValueType, todoListID: string) => void
    addTask: (title: string, todoListId: string) => void
    changeTaskStatus: (id: string, isDone: boolean, todoListId: string) => void
    filter: string
    todoListId: string
    removeTodoList: (todoListId: string) => void
    changeTaskTitle: (id: string, newTitle: string, todoListId: string) => void
    changeTodoListTitle: (todoListId: string, newTitle: string) => void

}

export const TodoList = (props: propsType) => {

    let addTask = (title: string) => {
        props.addTask(title, props.todoListId)
    }

    const removeTodolist = () => {
        props.removeTodoList(props.todoListId)
    }

    const changeTodoListTitleHandler = (newTitle: string) => {
        props.changeTodoListTitle(props.todoListId, newTitle)
    }


    const allTaskHandler = () => {
        props.changeFilter('ALL', props.todoListId)
    }

    const activeTaskHandler = () => {
        props.changeFilter('ACTIVE', props.todoListId)
    }

    const completedTaskHandler = () => {
        props.changeFilter('COMPLETED', props.todoListId)
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
                {props.tasks.map(t => {

                    const removeTaskHandler = () => {
                        props.removeTask(t.id, props.todoListId)
                    }
                    const oneChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
                        let newIsDoneValue = e.currentTarget.checked
                        props.changeTaskStatus(t.id, newIsDoneValue, props.todoListId)
                    }
                    const oneChangeTitleHandler = (newValue: string) => {
                        props.changeTaskTitle(t.id, newValue, props.todoListId)
                    }
                    return <li key={t.id} className={t.isDone ? 'is-done' : ''}>
                        <Checkbox
                            onChange={oneChangeHandler}
                            checked={t.isDone}
                            color={'primary'}/>
                        <EditableSpan title={t.title}
                                      onChange={oneChangeTitleHandler}/>
                        <IconButton onClick={removeTaskHandler}>
                            <Delete/>
                        </IconButton>
                    </li>
                })}
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
}

