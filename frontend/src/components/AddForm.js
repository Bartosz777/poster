import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { usePostContext } from '../hooks/usePostContext'
import useAuthContext from '../hooks/useAuthContext'


const AddForm = () => {
    const navigate = useNavigate()
    const [title, setTitle] = useState('')
    const [content, setContent] = useState('')
    const [error, setError] = useState(null)
    const { dispatch } = usePostContext()
    const { user } = useAuthContext()

    const handleSubmit = async (e) => {
        e.preventDefault()

        const response = await fetch('/api/posts', {
            method: 'POST',
            body: JSON.stringify({
                title,
                content,
                author: user.email
            }),
            headers: {
                "Content-Type": "application/json",
                'Authorization': `Bearer ${user.token}`
            }
        })

        const json = await response.json()

        if (!response.ok) {
            setError(json.error)
        }

        if (response.ok) {
            dispatch({type: "ADD_POST", payload: json})
            setTitle('')
            setContent('')
            setError(null)
            navigate('/')
        }
    }

    return (
        <div className='add-post'>
            <form 
                onSubmit={handleSubmit} 
                className='add-form'>
                <label>Title</label>
                <input 
                    type="text" 
                    value={title} 
                    onChange={e => setTitle(e.target.value)} />
                <label>Content</label>
                <textarea 
                    rows="10" 
                    value={content} 
                    onChange={e => setContent(e.target.value)}>
                    </textarea>
                <button>PUBLISH</button>
                {error && <div className='error'>{error}</div>}
            </form>
        </div>
    )
}

export default AddForm