export const titleCase = (paths: string, pathIndex: number = 0): string => {
  const urls = paths.split('/').filter((path) => path !== '')

  if (!urls.length || !urls[pathIndex]) {
    return ''
  }

  return urls[pathIndex]
    .split('-')
    .map((word) => `${word[0].toUpperCase()}${word.slice(1).toLowerCase()}`)
    .join(' ')
}
