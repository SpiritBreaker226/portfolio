import { FC } from 'react'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
} from 'chart.js'
import { Bar } from 'react-chartjs-2'
import { useTheme } from 'styled-components'

import { skillSet } from '../data'
import { useObjectToChartData } from '../hooks'

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip)

const options = {
  indexAxis: 'y' as const,
  elements: {
    bar: {
      borderWidth: 2,
    },
  },
  responsive: true,
}

export const Skills: FC = () => {
  const theme = useTheme()
  const { labels, dataSet } = useObjectToChartData(skillSet)

  const data = {
    labels,
    datasets: [
      {
        data: dataSet,
        backgroundColor: theme.pageStyles.skills.barColor,
      },
    ],
  }

  return (
    <>
      <p>
        Those Skills are a rough estimation of what been doing. Over the course
        of my career and free time, those are updated yearly. So feel free to
        contact me about those and what I have been up to recently.
      </p>

      <Bar options={options} data={data} />
    </>
  )
}
