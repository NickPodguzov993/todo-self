import React from "react";

export const TodoList = () => {
    return (
        <div>
            <h3>What to learn</h3>
            <div>
                <input />
                <button>+</button>
            </div>
            <ul>
                <li><input type={"checkbox"} checked={true}/> HTML&Css</li>
                <li><input type={"checkbox"} checked={true}/>JS</li>
                <li><input type={"checkbox"} checked={false}/>React</li>
            </ul>
            <button>ALL</button>
            <button>ACTIVE</button>
            <button>COMPLETED</button>
        </div>
    )
}