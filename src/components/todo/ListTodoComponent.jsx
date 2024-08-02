function ListTodoComponent() {

    const today = new Date();
    const targetDate = new Date(today.getFullYear()+12, today.getMonth(), today.getDay());

    const todo = [
        {id: 1, description: 'Learn AWS', done: false, targetDate: targetDate},
        {id: 2, description: 'Learn React', done: false, targetDate: targetDate}
    ]

    return(
        <div className="contaier">
            <h1>Choose things what you want to do.</h1>
            <div>
                <table className="table">
                    <thead>
                        <tr>
                            <td>id</td>
                            <td>description</td>
                            <td>is done</td>
                            <td>target date</td>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            todo.map(
                                todo => (
                                <tr>
                                    <td>{todo.id}</td>
                                    <td>{todo.description}</td>
                                    <td>{todo.done.toString()}</td>
                                    <td>{todo.targetDate.toDateString()}</td>
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