import React from 'react'

const BlogForm = ({handleAdd, handleTitleChange, handleAuthorChange, handleUrlChange, title, author, url}) => {
    return(
    <div>
      <h2>create new blog</h2>
      <form onSubmit={handleAdd}>
        <div>
          title
          <input
            type="text"
            name="newTitle"
            value={title}
            onChange={handleTitleChange}
          />
        </div>
        <div>
          author
          <input
            type="text"
            name="newAuthor"
            value={author}
            onChange={handleAuthorChange}
          />
        </div>
        <div>
          url
          <input
            type="text"
            name="newUrl"
            value={url}
            onChange={handleUrlChange}
          />
        </div>
        <button type="submit">create</button>
      </form>
  
      
    </div>
  )
  }


  export default BlogForm