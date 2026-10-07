const dateFormat = new Intl.DateTimeFormat('es-MX', { day: 'numeric', month: 'short', year: 'numeric' })

export const formatDate = (date: Date) => dateFormat.format(date)

export const initials = (name: string) =>
  name
    .split(' ')
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join('')

export const plural = (n: number, one: string, many: string) => `${n} ${n === 1 ? one : many}`
