const bases = [[346, 84, 61], [42, 100, 70], [164, 95, 43], [195, 83, 38], [195, 83, 16]]
const upperBound = 80
const lowerBound = 20

const generateColors = (size) => {
  const neededPerBase = Math.ceil((size - bases.length) / bases.length)
  let result = new Array()

  //this is the degree by which the luminence will be (0)raised and (1)lowered
  let coefficients = []

  //populate beginning of array and get the coefficients for each base
  for (var i = 0; i < bases.length; i++) {
    result[i] = bases[i]
    let c = []
    let lum = bases[i][2]
    coefficients.push([(upperBound - lum) / neededPerBase, (lum - lowerBound) / neededPerBase])
  }

  for (var i = bases.length; i < size; i++) {
    //iterator value scaled
    let j = i % bases.length

    let multiplier = Math.floor(i / 5)

    let b = bases[j]
    //whether luminence will be raised or lowered
    let dir = i % 2 === 0 ? 0 : 1
    //new luminence
    let l
    if (dir === 0) {
      l = b[2] + (multiplier * coefficients[j][0])
    } else {
      l = b[2] - (multiplier * coefficients[j][1])
    }
    result.push([b[0], b[1], l])
  }

  for (var i = 0; i < result.length; i++) {
    let newStr = 'hsl('
    let a = result[i][0].toString().concat(', ')
    let b = result[i][1].toString().concat('%, ')
    let c = result[i][2].toString().concat('%)')
    result[i] = newStr.concat(a).concat(b).concat(c)
  }

  return result
}

export default generateColors
