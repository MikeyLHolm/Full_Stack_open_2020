const _ = require('lodash')

const dummy = () => {
  return 1
}

const favoriteBlog = (blogs) => {
  const mostLikes = Math.max.apply(Math, blogs.map(function(o) { return o.likes }))
  const objectWithMostLikes = blogs.find(function(o){ return o.likes === mostLikes})
  const { _id, url, __v, ...updatedObject } = objectWithMostLikes
  return updatedObject
}

const totalLikes = (blogs) => {
  const reducer = (sum, { likes } ) => {
    return sum + likes
  }

  if (blogs.length === 0)
    return 0
  else if (blogs.length === 1)
    return blogs[0].likes
  else
    return blogs.reduce(reducer, 0)
}

const mostBlogs = (blogs) => {
  if (blogs.length === 0) {
    return undefined
  }

  const authorMostBlogs = _.chain(_.map(blogs, 'author'))
    .countBy()
    .toPairs()
    .maxBy(_.last)
    .value()

  return { author: authorMostBlogs[0], blogs: authorMostBlogs[1] }
}

const mostLikes = (blogs) => {
  if (blogs.length === 0) {
    return undefined
  }

  const authorMostLikes = _(blogs)
    .groupBy('author')
    .map((group, author) => {
      return {
        author: author,
        likes: _.sum(_.map(group, 'likes'))
      }
    })
    .value()

  return _.maxBy(authorMostLikes, 'likes')
}

module.exports = {
  dummy,
  favoriteBlog,
  mostBlogs,
  mostLikes,
  totalLikes
}
