
import {FilterValueType, TodoListsType} from "../App";
import {v1} from "uuid";


type ActionType = RemoveTodoListActionType |
    AddTodoListActionType |
    ChangeFilterTodoListActionType |
    ChangeTitleTodoListActionType

export type RemoveTodoListActionType = {
    type: 'REMOVE-TODOLIST'
    id:string
}

export type AddTodoListActionType = {
    type: 'ADD-TODOLIST'
    title:string
}

export type ChangeTitleTodoListActionType = {
    type: 'CHANGE-TODOLIST-TITLE'
    title:string
    id:string
}

export type ChangeFilterTodoListActionType = {
    type: 'CHANGE-TODOLIST-FILTER'
    filter: FilterValueType
    id:string
}

export const todoListsReducer = (state: TodoListsType[], action:ActionType) => {
    switch(action.type) {
        case 'REMOVE-TODOLIST' :{
            return state.filter(f => f.id !== action.id)
        }
        case 'ADD-TODOLIST' :{
            return [...state,{id: v1(), title: action.title, filter: 'ALL'}]
        }
        case 'CHANGE-TODOLIST-TITLE' :{
            let todoList = state.find(f => f.id === action.id)
            if (todoList) {
                todoList.title = action.title
                }
            return [...state]
        }
        case 'CHANGE-TODOLIST-FILTER' :{
            let todoList = state.find(f => f.id === action.id)
            if (todoList) {
                todoList.filter = action.filter
            }
            return [...state]
        }
        default:
            throw  new Error('I dont understand this type')
    }

}

export const RemoveTodolistAC = (todolistId: string): RemoveTodoListActionType => {
    return { type: 'REMOVE-TODOLIST', id: todolistId}
}

export const AddTodolistAC = (title: string): AddTodoListActionType => {
    return { type: 'ADD-TODOLIST', title: title}
}

export const ChangeTitleTodolistAC = (id:string,title: string): ChangeTitleTodoListActionType => {
    return { type: 'CHANGE-TODOLIST-TITLE',id:id, title: title}
}

export const ChangeFilterTodolistAC = (id:string,filter: FilterValueType): ChangeFilterTodoListActionType => {
    return { type: 'CHANGE-TODOLIST-FILTER',id:id, filter: filter}
}
