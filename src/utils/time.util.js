export const months = ['Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec']

export const formatDate = date => {
    date = new Date(date)
    return `${months[date.getUTCMonth()]} ${date.getUTCDate()} ${date.getUTCFullYear()}`
}

export const formatDateMY = date => {
    date = new Date(date)
    return `${months[date.getUTCMonth()]} ${date.getUTCFullYear()}`
}

export const formatDateTime = date => {
    date = new Date(date)
    return (`${months[date.getUTCMonth()]} ${date.getUTCDate()} ${date.getUTCFullYear()}, ${date.getHours() %12 ? date.getHours() %12 : 12}:${date.getUTCMinutes() < 10 ? '0'+date.getUTCMinutes() : date.getUTCMinutes()}`
    +` ${date.getHours() >= 12 ? 'PM' : 'AM'}`)
    
}