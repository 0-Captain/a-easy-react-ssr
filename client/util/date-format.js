const dateFormat = (isoDate) => {
  const date = new Date(isoDate)
  const [
    year,
    month,
    day,
    hours,
    minutes,
  ] = [
    date.getFullYear(),
    date.getMonth() + 1,
    date.getDate(),
    date.getHours(),
    date.getMinutes() < 10 ? `0${date.getMinutes()}` : date.getMinutes(),
  ]
  return `${String(year).slice(2)}年${month}月${day}日\t${hours}:${minutes}`
}

export default dateFormat
