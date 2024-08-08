import { useEffect, useState } from "react";
import {deleteTodoById, retrieveTodoForUsername} from "./api/TodoApiService"

function ListTodoComponent() {

    const today = new Date();
    const targetDate = new Date(today.getFullYear()+12, today.getMonth(), today.getDay());

    const [todo, setTodo] = useState([])
    const [message, setMessage] = useState(null)

    // const todo = [
    //     {id: 1, description: 'Learn AWS', done: false, targetDate: targetDate},
    //     {id: 2, description: 'Learn React', done: false, targetDate: targetDate}
    // ]

    useEffect(
        () => {refreshTodo()
        }, []
    )

    function refreshTodo() {
        retrieveTodoForUsername('user123')
        .then(response => {
            console.log(response.data)
            setTodo(response.data)
        }
    )
        .catch(error => console.log(error))
    }

    function deleteTodo(id) {
        console.log('clicked' + id)
        deleteTodoById('user123', id)
        .then(
            () => {
                setMessage(`Deleted ${id}`)
                refreshTodo()
            }
        )
        .catch(error => console.log(error))
    }

    return(
        <div className="contaier">
            <h1>Choose things what you want to do.</h1>
            {message && <div className="alert alert-warning">{message}</div>}
            <div>
                <table className="table">
                    <thead>
                        <tr key={todo.id}>
                            <th>description</th>
                            <th>is done</th>
                            <th>target date</th>
                            <th>Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            todo.map(
                                todo => (
                                <tr>
                                    <td>{todo.description}</td>
                                    <td>{todo.done.toString()}</td>
                                    <td>{todo.targetDate.toString()}</td>
                                    <td> <button className="btn btn-warning" onClick={() => deleteTodo(todo.id)}>Delete</button></td>
                                </tr>
                                )
                            )
                        }

                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default ListTodoComponent