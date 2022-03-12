import React, {ChangeEvent} from 'react';
import {FilterValueType} from "./App";
import {AddItemForm} from "./AddItemForm";
import {EditableSpan} from "./EditableSpan";

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
                <button onClick={() => props.removeTodoList(props.todoListId)}>x</button>
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
                        <input type={"checkbox"}
                               onChange={oneChangeHandler}
                               checked={t.isDone}/> <EditableSpan title={t.title}
                                                                  onChange={oneChangeTitleHandler}/>
                        <button onClick={removeTaskHandler}>x</button>
                    </li>
                })}
            </ul>
            <button className={props.filter === 'ALL' ? 'active-filter' : ''} onClick={allTaskHandler}>ALL</button>
            <button className={props.filter === 'ACTIVE' ? 'active-filter' : ''} onClick={activeTaskHandler}>ACTIVE
            </button>
            <button className={props.filter === 'COMPLETED' ? 'active-filter' : ''}
                    onClick={completedTaskHandler}>COMPLETED
            </button>
        </div>
    )
}

