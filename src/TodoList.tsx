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
    changeTaskStatus: (id:string, isDone:boolean)=> void
    filter:string
}

export const TodoList = (props: propsType) => {
    let [title, setTitle] = useState('')
    let [error, setError] = useState<string | null>(null)

    let addTask = () => {
        if(title.trim() !== ''){
            props.addTask(title)
            setTitle('')
        } else {
            setError('Title is required')
        }
    }
    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }

    const onKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
        setError(null)
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
                {error && <div className={'error-message'}>{error}</div>}
            </div>
            <ul>
                {props.tasks.map(t => {
                    const removeTaskHandler = ()=> {
                        props.removeTask(t.id)
                    }
                    const oneChangeHandler = (e:ChangeEvent<HTMLInputElement>) => {
                        let newIsDoneValue = e.currentTarget.checked
                        props.changeTaskStatus(t.id, newIsDoneValue)
                    }
                    return <li key={t.id} className={t.isDone ? 'is-done' : ''}>
                        <input type={"checkbox"}
                               onChange={oneChangeHandler}
                               checked={t.isDone}/> {t.title}
                        <button onClick={removeTaskHandler}>x</button>
                    </li>
                })}
            </ul>
            <button className={props.filter === 'ALL' ? 'active-filter' : ''} onClick={allTaskHandler}>ALL</button>
            <button className={props.filter === 'ACTIVE' ? 'active-filter' : ''} onClick={activeTaskHandler}>ACTIVE</button>
            <button className={props.filter === 'COMPLETED' ? 'active-filter' : ''} onClick={completedTaskHandler}>COMPLETED</button>
        </div>
    )
}