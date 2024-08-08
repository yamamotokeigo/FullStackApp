import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {updateTodoById, deleteTodoById, retrieveTodoForUsername} from "./api/TodoApiService"
import { useAuth } from "./security/AuthContext";

function ListTodoComponent() {

    const today = new Date();

    const authContext = useAuth()
    const username = authContext.username

    const navigate = useNavigate()

    const [todo, setTodo] = useState([])
    const [message, setMessage] = useState(null)


    useEffect(
        () => {refreshTodo()
        }, []
    )

    function refreshTodo() {
        retrieveTodoForUsername(username)
        .then(response => {
            console.log(response.data)
            setTodo(response.data)
        }
    )
        .catch(error => console.log(error))
    }

    function deleteTodo(id) {
        console.log('clicked' + id)
        deleteTodoById(username, id)
        .then(
            () => {
                setMessage(`Deleted ${id}`)
                refreshTodo()
            }
        )
        .catch(error => console.log(error))
    }

    function updateTodo(id) {
        console.log('clicked' + id)
        navigate(`/todo/${id}`)
    }

    function addNewTodo() {
        navigate(`/todo/-1`)
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
                            <th>Update</th>
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
                                    <td> <button className="btn btn-success" onClick={() => updateTodo(todo.id)}>Update</button></td>
                                </tr>
                                )
                            )
                        }

                    </tbody>
                </table>
            </div>
            <div className="btn btn-success m-5" onClick={addNewTodo}>Add New Todo</div>
        </div>
    )
}

export default ListTodoComponent