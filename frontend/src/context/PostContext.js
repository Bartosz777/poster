import { createContext, useReducer } from 'react'


export const PostContext = createContext()


export const postReducer = (state, action) => {
    switch (action.type) {
        case "SET_POSTS":
            return {
                posts: action.payload
            }
        case "ADD_POST": 
            return {
                posts: [action.payload, ...state.posts]
            }
        case "UPDATE_POST":
            return {
                posts: state.posts.map(p => p._id === action.payload._id ? action.payload : p)
            }
        case "DELETE_POST":
            return {
                posts: state.posts.filter(p => p._id !== action.payload._id)
            }
        default:
            return state
    }
}



export const PostContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(postReducer, { posts: [] })


    return (
        <PostContext.Provider value={{ ...state, dispatch }}>
            { children }
        </PostContext.Provider>
    )
}