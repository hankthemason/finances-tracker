let months = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December'
]

export const DateAndTime = () => {

  const d = new Date()
  let h: string | number = parseInt(new Date().toTimeString().substring(0, 2))
  const m = new Date().toTimeString().substring(3, 5)

  let desc
  if (h > 12) {
    h -= 12
    desc = 'PM'
  } else {
    desc = 'AM'
  }
  let z = '0'
  if (h < 10) {
    h = z.concat(h.toString())
  } else {
    h = h.toString()
  }
  const date = `${months[d.getMonth()]} ${d.getDate()}, ${d.getFullYear()}, ${h}:${m} ${desc} `

  return (
    <div>
      {date}
    </div>
  )
}