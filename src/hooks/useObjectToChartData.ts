type RawData = { [key: string]: number }

export const useObjectToChartData = (rawDataSet: RawData) => {
  const labels: string[] = []
  const dataSet: number[] = []

  Object.entries(rawDataSet).forEach(([label, data]) => {
    labels.push(label)
    dataSet.push(data)
  })

  return { labels, dataSet }
}
