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

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip)

export const Skills: FC = () => {
  const theme = useTheme()

  const options = {
    indexAxis: 'y' as const,
    elements: {
      bar: {
        borderWidth: 2,
      },
    },
    responsive: true,
  }

  const labels = [
    'Ruby on Rails',
    'Ruby',
    'C++',
    'JavaScript',
    'ReactJS',
    'Redux',
    'JSON',
    'HTML5',
    'CSS3',
    'MUI',
    'SQL',
    'Git',
  ]

  const data = {
    labels,
    datasets: [
      {
        data: [6.5, 5.5, 5, 8.5, 8, 7.5, 7.5, 7.5, 6, 7.5, 7, 9],
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
