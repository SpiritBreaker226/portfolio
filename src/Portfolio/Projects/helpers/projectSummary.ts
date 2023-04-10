export const projectSummary = (summary: string): string => {
  const endOfFirstSentence = summary.indexOf('.')

  return endOfFirstSentence > 0
    ? summary.slice(0, endOfFirstSentence + 1)
    : summary.slice(0, 140)
}
