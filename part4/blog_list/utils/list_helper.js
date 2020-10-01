const dummy = () => {
  return 1
}

const totalLikes = (array) => {
  const reducer = (sum, { likes } ) => {
    return sum + likes
  }

  if (array.length === 0)
    return 0
  else if (array.length === 1)
    return array[0].likes
  else
    return array.reduce(reducer, 0)
}

module.exports = {
  dummy,
  totalLikes,
}