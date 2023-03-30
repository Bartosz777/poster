import useAuthContext from "../hooks/useAuthContext"
import formatDistanceToNow from 'date-fns/formatDistanceToNow'
import { usePostContext } from "../hooks/usePostContext"

const CommentDetails = ({ post }) => {
    const { user } = useAuthContext()
    const { dispatch } = usePostContext()
    const { comments } = post

    const handleClick = async (e) => {

        const response = await fetch('/api/posts/deletecomment/' + post._id, {
            method: 'PATCH',
            body: JSON.stringify({
                body: comments[e.target.id].body,
                author: user.email
            }),
            headers: {
                "Content-Type": "application/json",
                'Authorization': `Bearer ${user.token}`
            }
        })


        const json = await response.json()


        if (response.ok) {
            dispatch({ type: 'UPDATE_POST', payload: json })
        }
    }  
    
    return (
        <div className='comments'>
            {comments && comments.map((comment, index) => 
            <div key={index}>
            <div className='comment-body'>
                {comment.author === user.email && 
                <span 
                    id={index} 
                    onClick={handleClick} 
                    className='btn delete-button material-symbols-outlined'>
                    delete
                </span>}
                <div className='comment-info'>
                <p className={comment.author === user.email ? 'align' : ''}>{comment.body}</p>
                <p className={comment.author === user.email ? 'align time' : 'time'}>
                    {formatDistanceToNow(new Date(comment.date), { addSuffix: true })}
                </p> 
                </div>
            </div>
                <p>{comment.author.split('@')[0]}</p>
            </div>).reverse()}
        </div>
    )
}


export default CommentDetails