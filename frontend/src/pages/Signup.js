import { useState } from 'react'
import useSignup from '../hooks/useSignup'

const Signup = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const { isLoading, error, signup } = useSignup()

    const handleSubmit = async (e) => {
        e.preventDefault()

        await signup(email, password)

        setEmail('')
        setPassword('')
    }

    return (
        <div className="signup">
            <form onSubmit={handleSubmit} className="signup-form">
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
                    Sign up
                </button>
                {error && <div className='error'>{error}</div>}
            </form>
        </div>
    )
}

export default Signup