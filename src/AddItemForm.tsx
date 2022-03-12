import React, {ChangeEvent, KeyboardEvent, useState} from "react";

type AddItemFormType = {
    addItem: (title:string)=> void
}

export const AddItemForm = (props:AddItemFormType) => {

    let [title, setTitle] = useState('')
    let [error, setError] = useState<string | null>(null)

    let addItem = () => {
        if (title.trim() !== '') {
            props.addItem(title)
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
            addItem()
        }
    }

return (
    <div>
        <input value={title}
               onChange={onChangeHandler}
               onKeyPress={onKeyPress}/>
        <button onClick={addItem}>+</button>
        {error && <div className={'error-message'}>{error}</div>}
    </div>
)
}