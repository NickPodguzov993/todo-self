import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {FilterValueType} from "./App";

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type propsType = {
    title: string
    tasks: TaskType[]
    removeTask: (tID: string) => void
    changeFilter: (value: FilterValueType) => void
    addTask: (title: string) => void
}

export const TodoList = (props: propsType) => {
    let [title, setTitle] = useState('')

    let addTask = () => {
        props.addTask(title)
        setTitle('')
    }
    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }

    const onKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            addTask()
        }
    }

    const allTaskHandler = () => {
        props.changeFilter('ALL')
    }

    const activeTaskHandler = () => {
        props.changeFilter('ACTIVE')
    }

    const completedTaskHandler = () => {
        props.changeFilter('COMPLETED')
    }

    return (
        <div>
            <h3>{props.title}</h3>
            <div>
                <input value={title}
                       onChange={onChangeHandler}
                       onKeyPress={onKeyPress}/>
                <button onClick={addTask}>+</button>
            </div>
            <ul>
                {props.tasks.map(t => {
                    const removeTaskHandler = ()=> {
                        props.removeTask(t.id)
                    }
                    return <li key={t.id}>
                        <input type={"checkbox"} checked={t.isDone}/> {t.title}
                        <button onClick={removeTaskHandler}>x</button>
                    </li>
                })}
            </ul>
            <button onClick={allTaskHandler}>ALL</button>
            <button onClick={activeTaskHandler}>ACTIVE</button>
            <button onClick={completedTaskHandler}>COMPLETED</button>
        </div>
    )
}