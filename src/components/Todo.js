import React from 'react'

export default function Todo({ todo, toggleTodo }) {

    function handleTodoClick() {
        toggleTodo(todo.id)
    }

    return (
        <div className="input-group mb-2 mt-2">
            <div className="input-group-text">
                <input className="form-check-input mt-0" type="checkbox" checked={todo.complete} onChange={handleTodoClick} />
            </div>
            <input className="form-control" type="text" value={todo.name} disabled />
        </div>
    )
}
