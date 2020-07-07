export function formatTime(date) {
  date = new Date(date)
  const year = date.getFullYear()
  let month = date.getMonth() + 1
  let day = date.getDate()
  month = month < 10 ? '0' + month : month
  day = date < 10 ? '0' + day : day
  return year + '-' + month + '-' + day
}
