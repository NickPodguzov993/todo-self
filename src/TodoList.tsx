import React from "react";
import {FilterValueType} from "./App";

export type TaskType = {
    id: number
    title: string
    isDone: boolean
}

type propsType = {
    title: string
    tasks: TaskType[]
    removeTask: (tID:number)=> void
    changeFilter: (value:FilterValueType)=> void
}

export const TodoList = (props: propsType) => {
    return (
        <div>
            <h3>{props.title}</h3>
            <div>
                <input />
                <button>+</button>
            </div>
            <ul>
                {props.tasks.map(t=> <li key={t.id}>
                    <input type={"checkbox"} checked={t.isDone}/> {t.title}
                    <button onClick={()=> props.removeTask(t.id)}>x</button>
                </li>)}
            </ul>
            <button onClick={()=> props.changeFilter('ALL')}>ALL</button>
            <button onClick={()=> props.changeFilter('ACTIVE')}>ACTIVE</button>
            <button onClick={()=> props.changeFilter('COMPLETED')}>COMPLETED</button>
        </div>
    )
}