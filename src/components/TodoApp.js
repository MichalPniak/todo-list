import { useState, useRef, useEffect } from 'react';
import TodoList from './TodoList';
import { v4 as uuidv4 } from 'uuid';

import Swal from 'sweetalert2';

const LOCAL_STORAGE_KEY = 'todoApp.todos';

export default function TodoApp() {

    const [todos, setTodos] = useState([])
    const todoNameRef = useRef()

    useEffect(() => {
        const storedTodos = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY))
        if (storedTodos) setTodos(storedTodos)
    }, [])

    useEffect(() => {
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(todos))
    }, [todos])

    function toggleTodo(id) {
        const newTodos = [...todos]
        const todo = newTodos.find(todo => todo.id === id)
        todo.complete = !todo.complete
        setTodos(newTodos)
    }

    function handleAddTodo(e) {
        const name = todoNameRef.current.value
        if (name === '') return

        setTodos(prevTodos => {
            return [...prevTodos, { id: uuidv4(), name: name, complete: false }]
        })

        Swal.fire({
            icon: 'success',
            title: 'You have added a new task',
            showConfirmButton: false,
            timer: 1000
        })

        todoNameRef.current.value = null
    }

    function handleClearTodos() {
        const newTodos = todos.filter(todo => !todo.complete)
        setTodos(newTodos)
    }

    return (
        <div className="container h-100">
            <div className="row justify-content-center align-items-center h-100">
                <div className="col-10 m-3">
                    <TodoList todos={todos} toggleTodo={toggleTodo} />

                    <div className="input-group mb-3">
                        <input className="form-control" ref={todoNameRef} type="text" />
                        <button className="btn btn-outline-success" onClick={handleAddTodo}>Add todo</button>
                        <button className="btn btn-outline-danger" onClick={handleClearTodos}>Clear Complete</button>
                    </div>

                    <div>{todos.filter(todo => !todo.complete).length} left</div>
                </div>
            </div>
        </div>
    )
}
