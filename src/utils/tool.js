/**
 * @return {string}
 */
export function Time(tempData, type) {
  const date = new Date(tempData)
  const year = date.getFullYear()
  let month = date.getMonth() + 1
  let day = date.getDate()
  let hour = date.getHours()
  let minute = date.getMinutes()
  month = month < 10 ? '0' + month : month
  day = day < 10 ? '0' + day : day
  hour = hour < 10 ? '0' + hour : hour
  minute = minute < 10 ? '0' + minute : minute
  if (type === 1) {
    return year + '-' + month + '-' + day
  } else {
    return year + '-' + month + '-' + day + '  ' + hour + ':' + minute
  }
}
