const blog = require("../models/blog")

const dummy = (blogs) => {
    return 1
}

const totalLikes = (blogs) => {
    const total = blogs.reduce((sum, blog) => {
        return sum + blog.likes
    }, 0)
    return total
}

const favoriteBlog = (blogs) => {
    const tmp = {
        title: "DUMMY TEMP",
        author: "DUMMY TEMP",
        likes: 0
      }
    const favorite = blogs.reduce((tmp, blg) => {
        return blg.likes >= tmp.likes
        ? {title: blg.title, author: blg.author, likes: blg.likes}
        : tmp
    }, tmp)
    return favorite
}

const mostBlogs = (blogs) => {
    
}

module.exports = {
    dummy, totalLikes, favoriteBlog, mostBlogs
}