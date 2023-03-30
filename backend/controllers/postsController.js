const Post = require('../models/postModel')
const mongoose = require('mongoose')


// get all posts

const getPosts = async (req, res) => {
    const posts = await Post.find({}).sort({createdAt: -1})

    res.status(200).json(posts)
}


// get user posts

const getUserPosts = async (req, res) => {
    const user_id = req.user._id.toString()

    const posts = await Post.find({ user_id }).sort({createdAt: -1})

    res.status(200).json(posts)
}

// get a single post

const getPost = async (req, res) => {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        res.status(400).json({error: 'Invalid id'})
    }

    const post = await Post.findOne({ _id: id })

    if (!post) {
        return res.status(400).json({error: 'No such post'})
    }

    res.status(200).json(post)
}

// create a post

const createPost = async (req, res) => {
    const { title, content, author } = req.body

    const user_id = req.user._id.toString()
    
    try {
        const post = await Post.create({
            title,
            content,
            author,
            user_id
        })
        res.status(200).json(post)
    } catch (error) {
        res.status(400).json({error: 'All fields must be filled'})
    }

}

// delete a post

const deletePost = async (req, res) => {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        res.status(400).json({ error: 'Invalid id' })
    }

    const post = await Post.findByIdAndDelete(id)

    if (!post) {
        res.status(400).json({ error: 'No such post' })
    }

    res.status(200).json(post)
}

// update post

const updatePost = async (req, res) => {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        res.status(400).json({ error: 'Invalid id' })
    }

    const post = await Post.findByIdAndUpdate(id, {...req.body})

    if (!post) {
        res.status(400).json({ error: 'No such post' })
    } else {
        const newPost = await Post.findById(id)
        res.status.json(newPost)
    }
    
}


// add comment

const addComment = async (req, res) => {
    const { author, body } = req.body
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        res.status(400).json({ error: 'Invalid id' })
    }

    
    if (!body) {
        res.status(400).json({ error: 'Field cannot be empty' })
    } else {
        await Post.findByIdAndUpdate(id, {
            $push: {
                comments: {
                    author,
                    body,
                    date: new Date()
                }
            }
        })

        const newPost = await Post.findById(id)
        res.status(200).json(newPost)
    }

}

// delete comment 

const deleteComment = async (req, res) => {
    const {author, body, date} = req.body
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        res.status(400).json({ error: 'Invalid id' })
    }

    const post = await Post.findByIdAndUpdate(id, {
        $pull: {
            comments: {
                author,
                body,
            }
        }
    })

    if (!post) {
        res.status(400).json({ error: 'No such post' })
    }
    
    const newPost = await Post.findById(id)
    res.status(200).json(newPost)
}

const likePost = async (req, res) => {
    const { id } = req.params
    const { user_email } = req.body
    const post = await Post.findByIdAndUpdate(id, {
        $push: {
            likes: user_email
        }
    })

    if (!post) {
        res.status(400).json({error: 'No such post'})
    } 
    
    const newPost = await Post.findOne({ _id: id })
        res.status(200).json(newPost)
}

// unlike

const unlikePost = async (req, res) => {
    const { id } = req.params
    const { user_email } = req.body
    const post = await Post.findByIdAndUpdate(id, {
        $pull: {
            likes: user_email
        }
    })

    if (!post) {
        res.status(400).json({error: 'No such post'})
    } 

    const newPost = await Post.findById({ _id: id })
    res.status(200).json(newPost)
}


module.exports = { getPosts, getUserPosts, getPost, createPost, deletePost, updatePost, addComment, deleteComment, likePost, unlikePost }