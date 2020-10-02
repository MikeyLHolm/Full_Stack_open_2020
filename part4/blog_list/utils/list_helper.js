const dummy = () => {
  return 1
}

const favoriteBlog = (blogs) => {
  const mostLikes = Math.max.apply(Math, blogs.map(function(o) { return o.likes; }))
  const objectWithMostLikes = blogs.find(function(o){ return o.likes == mostLikes})
  const {_id, url, __v, ...updatedObject} = objectWithMostLikes
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

module.exports = {
  dummy,
  favoriteBlog,
  totalLikes,
}
