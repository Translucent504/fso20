const blog = require("../models/blog")
var _ = require('lodash')

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
            ? { title: blg.title, author: blg.author, likes: blg.likes }
            : tmp
    }, tmp)
    return favorite
}

const mostBlogs = (blogs) => {
    const countBlogs = _.countBy(blogs, 'author')
    const authorWithMostBlogs = _.maxBy(_.keys(countBlogs), (key) => countBlogs[key])
    return {
        author: authorWithMostBlogs,
        blogs: countBlogs[authorWithMostBlogs]
    }
}

const mostLikes = (blogs) => {
    const blogsByAuthor = _.groupBy(blogs, b => b.author)
    const likesByAuthor = _.keys(blogsByAuthor).map(author => {
        const likes = _.sumBy(blogsByAuthor[author], 'likes')
        return {
            author,
            likes
        }
    })
    return _.isEmpty(blogs)
    ? {}
    : _.maxBy(likesByAuthor, 'likes')
}


module.exports = {
    dummy, totalLikes, favoriteBlog, mostBlogs, mostLikes
}