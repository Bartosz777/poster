import { useState } from 'react'
import useAuthContext from '../hooks/useAuthContext'
import { usePostContext } from '../hooks/usePostContext'

const AddComment = ({ _id }) => {
    const { user } = useAuthContext()
    const { dispatch } = usePostContext()

    const [comment, setComment] = useState('')
    const [error, setError] = useState(null)

    const handleSubmit = async (e) => {
        e.preventDefault()
        
        const response = await fetch('/api/posts/addcomment/' + _id, {
            method: 'PATCH',
            body: JSON.stringify({
                body: comment,
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
            setComment('')
            dispatch({type: "UPDATE_POST", payload: json})
        }
    }
    
    return (
        <div className='add-comment'>
            <form 
            onSubmit={handleSubmit} 
            className='add-comment-form'>
                <textarea 
                    placeholder='Write a comment...' 
                    value={comment} 
                    onChange={e => setComment(e.target.value)} 
                    cols='80' 
                    rows="2">
                </textarea>
                <button>+</button>
            </form>
            {error && <div className='error'>{error}</div>}
        </div>
    )
}


export default AddComment