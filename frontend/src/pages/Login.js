import { useState } from 'react'
import useLogin from '../hooks/useLogin'


const Login = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const { isLoading, error, login } = useLogin()

    const handleSubmit = async (e) => {
        e.preventDefault()

        await login(email, password)

        setEmail('')
        setPassword('')
    }

    return (
        <div className="login">
            <form onSubmit={handleSubmit} className="login-form">
                <label>Email</label>
                <input 
                    type="text" 
                    value={email} 
                    onChange={e => setEmail(e.target.value)} />
                <label>Password</label>
                <input 
                    type="password" 
                    value={password} 
                    onChange={e => setPassword(e.target.value)} />
                <button 
                    disabled={isLoading}>
                    Log in
                </button>
                {error && <div className='error'>{error}</div>}
            </form>
        </div>
    )
}


export default Login