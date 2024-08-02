import { useState } from 'react'
import {useNavigate} from 'react-router-dom'
import { useAuth } from './security/AuthContext'


function LoginComponent() {

    const [username, setUsername] = useState('user123')
    const [password, setPassword] = useState('')

    const [showErrorMessage, setShowErrorMessage] = useState(false)

    const navigate = useNavigate()

    const authContext = useAuth()

    function handleUsenameChange(event) {
        setUsername(event.target.value)
    }

    function handlePasswordChange(event) {
        setPassword(event.target.value)
    }

    function handleSubmit() {
        if(authContext.login(username, password)){
            setShowErrorMessage(false)
            navigate(`/welcome/${username}`)
        } else{
            setShowErrorMessage(true)
        }
    }

    return(
        <div className="Login">
            <h1>Time to login!</h1>
            {showErrorMessage && <div className="errorMessage">Authenticated Failed</div>}
            <div>
                <label>User Name:</label>
                <input type="text" name="username" value={username} onChange={handleUsenameChange}/>
            </div>
            <div>
                <label>Password:</label>
                <input type="password" name="password" value={password} onChange={handlePasswordChange}/>
            </div>
            <div>
                <button type="button" name="login" onClick={handleSubmit}>Login</button>
            </div>
        </div>
        

    )
}

export default LoginComponent