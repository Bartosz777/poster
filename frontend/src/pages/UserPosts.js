import { useEffect } from 'react'
import { usePostContext } from '../hooks/usePostContext'
import useAuthContext from '../hooks/useAuthContext'

import PostDetails from "../components/PostDetails"

const UserPosts = () => {
    const { posts, dispatch } = usePostContext()
    const { user } = useAuthContext()

    useEffect(() => {
        const fetchPosts = async () => {
            const response = await fetch('/api/posts/user', {
                headers: {
                    'Authorization': `Bearer ${user.token}`
                }
            })

            const json = await response.json()
            dispatch({type: "SET_POSTS", payload: json})

        }

        if (user) {
            fetchPosts()
        }

    }, [dispatch, user])

    return (
        <div className="home">
            {posts.length > 0 ? 
            posts.map(post => (
                <PostDetails 
                    key={post._id} 
                    post={post}/>
            )) : 
            <h1 className='no-posts-info'>
                You don't have any posts yet
            </h1>}
        </div>
    )
}

export default UserPosts