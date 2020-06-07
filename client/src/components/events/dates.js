const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']

const displaydate = (date) =>  {
  const dateObj = new Date(date)
  return `${dateObj.getDate()} ${months[dateObj.getMonth()]} ${dateObj.getFullYear()}`
}

export const dates = (start, end) => {
  return start == end ? displaydate(start) : `${displaydate(start)} - ${displaydate(end)}`
}