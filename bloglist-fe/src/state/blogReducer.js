import blogService from '../services/blogs'

const initialState = []


const blogReducer = (state = initialState, action) => {

    switch(action.type){
        case 'SET_BLOGS':
            return action.payload
        case 'NEW_BLOG':
            return state.concat(action.payload)
        case 'LIKE_BLOG':
            return  state.map(blog =>
                    blog.id !== action.payload.id ? blog : action.payload)
        case 'COMMENT_BLOG':
            return  state.map(blog =>
                    blog.id !== action.payload.id ? blog : action.payload)        
        case 'DELETE_BLOG':
            return state.filter(b => 
                    b.id !== action.payload.id)
        default:
            return state
    }

}




export const setInitialBlogs =  () => {

    return async dispatch => {
        const blogs = await blogService.getAll()
        dispatch({
            type: "SET_BLOGS",
            payload: blogs
        })
     }
    
  }
export const createBlogg = (blogdata) => {
    return {
        type: "NEW_BLOG",
        payload: blogdata
    }
}

export const likeBlog = (likedBlog) => {
    return async dispatch => {
        dispatch({
            type: "LIKE_BLOG",
            payload: likedBlog
        })
        
    }
}
export const commentBlog = (commentedBlog) => {
    return async dispatch => {
        dispatch({
            type: "COMMENT_BLOG",
            payload: commentedBlog
        })
        
    }
}
export const deleteBlog = (blog) => {
    return {
        type: "DELETE_BLOG",
        payload: blog
    }
}

export default blogReducer