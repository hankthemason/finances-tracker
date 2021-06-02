const capitalizeFirstLeter = (s: string) => {
  let firstL = s.slice(0, 1).toUpperCase()
  let newString = firstL.concat(s.slice(1, s.length))
  return newString
}

export default capitalizeFirstLeter