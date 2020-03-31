const initialState = {
    blogs: []
}

export const blogReducer = (state = initialState, action) => {

    switch(action.type){
        case 'SET_BLOGS':
            return {
                ...state,
                blogs: action.payload
              }
        case 'NEW_BLOG':
            return {
                ...state,
                blogs: state.blogs.concat(action.payload)
            }
        case 'LIKE_BLOG':
            return {
                ...state,
                blogs: state.blogs.map(blog =>
                    blog.id !== action.payload.id ? blog : action.payload)
            }
        case 'DELETE_BLOG':
            return {
                ...state,
                blogs: state.blogs.filter(b => 
                    b.id !== action.payload.id)
            }
        default:
            return state
    }

}


export const setInitialBlogs = (content) => {
    return {
      type: "SET_BLOGS",
      payload: content
     }
  }
export const createBlogg = (blogdata) => {
    return {
        type: "NEW_BLOG",
        payload: blogdata
    }
}

export const likeBlog = (likedBlog) => {
    return {
        type: "LIKE_BLOG",
        payload: likedBlog
    }
}
export const deleteBlog = (blog) => {
    return {
        type: "DELETE_BLOG",
        payload: blog
    }
}