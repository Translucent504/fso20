import blogService from '../services/blogs'

const initialState = [

]

const SET_BLOGS = 'SET_BLOGS'
const CREATE_BLOG = 'CREATE_BLOG'
const LIKE_BLOG = 'LIKE_BLOG'
const COMMENT_BLOG = 'COMMENT_BLOG'

const blogReducer = (state = initialState, { type, payload }) => {
    switch (type) {

        case SET_BLOGS:
            // manually remapping payload to blogs this way is recommended rather than using
            // return [...payload] spread, this way the shape of state is in the hands of the reducer
            // rather than relying on the dispatch calling it with the correctly shaped payload.
            const blogs = payload.map(item => (
                {
                    likes: item.likes,
                    title: item.title,
                    author: item.author,
                    url: item.url,
                    user: item.user,
                    id: item.id,
                    comments: item.comments
                }
            ))
            return blogs

        case CREATE_BLOG:
            return [...state, {
                likes: payload.likes,
                title: payload.title,
                author: payload.author,
                url: payload.url,
                user: payload.user,
                id: payload.id,
                comments: []
            }]

        case LIKE_BLOG:
            const blogIndex = state.findIndex(blog => blog.id === payload.id)
            return state.map((blog, index) => {
                if (index !== blogIndex) {
                    return blog
                }
                return { ...blog, likes: blog.likes + 1 }
            })

        case COMMENT_BLOG:
            const idx = state.findIndex(blog => blog.id === payload.id)
            return state.map((blog, index) => {
                if (index !== idx) {
                    return blog
                }
                return payload
            })
        default:
            return state
    }
}

export const createBlog = (payload) => ({
    type: CREATE_BLOG,
    payload
})

export const refreshBlogs = () => {
    return (dispatch) => {
        blogService.getAll()
            .then(blogs => dispatch({
                type: SET_BLOGS,
                payload: blogs
            }))
    }
}

export const likeBlog = (payload) => {
    return async (dispatch) => {
        await blogService.likeBlog(payload)
        dispatch({
            type: LIKE_BLOG,
            payload
        })
    }
}

export const commentBlog = (payload) => {
    return async (dispatch) => {
        const result = await blogService.commentBlog(payload.id, payload.comment)
        dispatch({
            type: COMMENT_BLOG,
            payload: result
        })
    }
}


export default blogReducer