import useAuthContext from '../hooks/useAuthContext'
import { usePostContext } from '../hooks/usePostContext'
import formatDistanceToNow from 'date-fns/formatDistanceToNow'

import AddComment from './AddComment'
import CommentDetails from './CommentDetails'
import Like from './Like'

const PostDetails = ({ post }) => {
    const { user } = useAuthContext()
    const { dispatch } = usePostContext()

    const handleClick = async () => {
        const response = await fetch('/api/posts/' + post._id, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${user.token}`
            }
    })
    
    const json = await response.json()
    
    if (response.ok) {
        dispatch({ type: 'DELETE_POST', payload: json })
    }
    }

    return (
        <div className="post">
            <div>
            <h1>{post.title}</h1> 
            {user.email === post.author && 
            <span 
                onClick={handleClick} 
                className='delete-button material-symbols-outlined'>
                delete
            </span>}
        </div>
            <p>{post.content}</p>
            <div>
            <div>
                <Like post={post}/>
                <p>
                    {formatDistanceToNow(new Date(post.createdAt), { addSuffix: true })}
                </p>
            </div>
                <p>{post.author.split('@')[0]}</p>
            </div>
            <CommentDetails post={post}/>
            <AddComment _id={post._id}/>
        </div>
    )
}

export default PostDetails