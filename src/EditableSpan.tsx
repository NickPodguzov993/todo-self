import React, {ChangeEvent, useState} from "react";

type EditableSpanPropsType = {
    title:string
    onChange:(newValue:string)=> void

}

export const EditableSpan = (props: EditableSpanPropsType) => {
    let [change, setChange] =useState(false)
    let [title, setTitle] =useState('')
    const activateEditInput = () => {
        setChange(true)
        setTitle(props.title)
    }

    const activateViewMode = () => {
        setChange(false)
        props.onChange(title)
    }

    const onChangeInput = (e:ChangeEvent<HTMLInputElement>)=> {
        setTitle(e.currentTarget.value)
    }

    return ( change ?
            <input value={title} onChange={onChangeInput} autoFocus onBlur={activateViewMode}/>:
        <span onDoubleClick={activateEditInput}>{props.title}</span>
    )
}