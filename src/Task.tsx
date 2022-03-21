import React, {ChangeEvent, useCallback} from "react";
import {Checkbox, IconButton} from "@material-ui/core";
import {EditableSpan} from "./EditableSpan";
import {Delete} from "@material-ui/icons";
import {TaskType} from "./TodoList";

type propsTaskType = {
    removeTask: (tID: string, todoListId: string) => void
    changeTaskStatus: (id: string, isDone: boolean, todoListId: string) => void
    changeTaskTitle: (id: string, newTitle: string, todoListId: string) => void
    todoListId: string
    task: TaskType
}
export const Task = React.memo((props: propsTaskType) => {
    const removeTaskHandler = useCallback(() => {
        props.removeTask(props.task.id, props.todoListId)
    },[props.removeTask,props.task.id, props.todoListId])
    const oneChangeHandler = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        let newIsDoneValue = e.currentTarget.checked
        props.changeTaskStatus(props.task.id, newIsDoneValue, props.todoListId)
    },[props.changeTaskStatus,props.task.id,props.todoListId])
    const oneChangeTitleHandler = useCallback((newValue: string) => {
        props.changeTaskTitle(props.task.id, newValue, props.todoListId)
    },[ props.changeTaskTitle,props.task.id, , props.todoListId])
    return <div key={props.task.id} className={props.task.isDone ? 'is-done' : ''}>
        <Checkbox
            onChange={oneChangeHandler}
            checked={props.task.isDone}
            color={'primary'}/>
        <EditableSpan title={props.task.title}
                      onChange={oneChangeTitleHandler}/>
        <IconButton onClick={removeTaskHandler}>
            <Delete/>
        </IconButton>
    </div>
})