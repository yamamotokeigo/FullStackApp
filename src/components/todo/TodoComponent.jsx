import { useNavigate, useParams } from "react-router-dom"
import { createTodo, retrieveTodoById, updateTodo } from "./api/TodoApiService"
import { useAuth } from "./security/AuthContext"
import { useEffect, useState } from "react"
import { Formik, Form, Field, ErrorMessage } from "formik"
import moment from "moment"

export default function TodoComponent() {
    const {id} = useParams()

    const[description, setDescription] = useState('') 
    const[targetDate, setTargetDate] = useState('') 

    const authContext = useAuth()
    const navigate = useNavigate()

    const username = authContext.username

    useEffect(
        () => retrieveTodo(),
        [id]
    )

    function retrieveTodo(){
        if(id !== -1){
            retrieveTodoById(username, id)
            .then(response => {
                setDescription(response.data.description)
                setTargetDate(response.data.targetDate)
            })
        .catch(error => console.log(error))
        }
    }

    function onSubmit(values) {
        console.log(values)
        const todo = {
            id: id,
            username: username,
            description: values.description,
            targetDate: values.targetDate,
            done: false
        }
        console.log(todo)

        if(id === -1){
            createTodo(username, todo)
            .then(response => {
            navigate('/todo')
        })
        .catch(error => console.log(error))
    }else{
        updateTodo(username, id, todo)
        .then(response => {
            navigate('/todo')
        })
        .catch(error => console.log(error))
    }
}

    function validate(values) {
        let error = {
            // description: 'Enter a valid description',
            // targetDate: 'Enter a valid targetDate'
        }

        if(values.description.length<5) {
            error.description = 'Enter at least 5 characters'
        }
        if(values.targetDate === null || values.targetDate === '' || !moment(values.targetDate).isValid()) {
            error.targetDate = 'Choose date'
        }
        console.log(values)
        return error
    }

    return(
        <div className="container">
            <h1>Todo Details</h1>
            <div>
                <Formik initialValues={ { description, targetDate } }
                    enableReinitialize = {true}
                    onSubmit = {onSubmit}
                    validate = {validate}
                    validateOnChange = {false}
                    validateOnBlur = {false}
                >
                {
                    (props) => (
                        <Form>
                            <ErrorMessage 
                                name="description"
                                component="div"
                                className="alert alert-warning"
                            />
                             <ErrorMessage 
                                name="targetDate"
                                component="div"
                                className="alert alert-warning"
                            />
                            <fieldset className="form-group">
                                <label>Description</label>
                                    <Field type="text" className="form-control" name="description"/>
                            </fieldset>
                            <fieldset className="form-group">
                                <label>TargetDate</label>
                                    <Field type="date" className="form-control" name="targetDate"/>
                            </fieldset>
                            <div>
                                <button className="btn btn-success m-5" type="submit">Save</button>
                            </div>
                        </Form>
                    )
                }
                </Formik>
            </div>
        </div>
    )
}