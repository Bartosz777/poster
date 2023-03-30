import useAuthContext from "../hooks/useAuthContext"
import { usePostContext } from "../hooks/usePostContext"

const Like = ({ post }) => {
    const { user } = useAuthContext()
    const { dispatch } = usePostContext()

    const likeHandler = async () => {  
        const response = await fetch('/api/posts/like/' + post._id, {
            method: 'PATCH',
            body: JSON.stringify({
                user_email: user.email
            }),
            headers: {
                'Authorization': `Bearer ${user.token}`,
                'Content-Type': 'application/json'
            }
        })

        const json = await response.json()

        if (response.ok) {
            dispatch({type: 'UPDATE_POST', payload: json})
        }
    }

    const unlikeHandler = async () => {
        const response = await fetch('/api/posts/unlike/' + post._id, {
            method: 'PATCH',
            body: JSON.stringify({
                user_email: user.email
            }),
            headers: {
                'Authorization': `Bearer ${user.token}`,
                'Content-Type': 'application/json'
            }
        })

        const json = await response.json()

        if (response.ok) {
            dispatch({type: 'UPDATE_POST', payload: json})
        }
    }

    return (
        <div>
            {!post.likes.includes(user.email) && 
            <span 
                onClick={likeHandler} 
                className="heart material-symbols-outlined">
                favorite
            </span>}
            {post.likes.includes(user.email) && 
            <span 
                onClick={unlikeHandler} 
                className="red heart material-symbols-outlined">
                favorite
            </span>}
            <p className="like-info">{post.likes.length} {post.likes.length > 1 ? 'likes' : 'like'}</p>
        </div>
    )
}


export default Like