export const isValidDate = (date: string) => {
  return !isNaN(Number(new Date(date)))
}
