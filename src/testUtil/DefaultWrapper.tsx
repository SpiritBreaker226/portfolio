import { Formik } from 'formik'
import { FC, ReactNode } from 'react'
import { BrowserRouter } from 'react-router-dom'

import { ThemeProvider } from '../theme'

export type RenderProps = {
  children: ReactNode
}

export const DefaultWrapper: FC<RenderProps> = ({ children }) => {
  return (
    <BrowserRouter>
      <ThemeProvider>
        <Formik initialValues={{ requireField: '' }} onSubmit={() => {}}>
          {children}
        </Formik>
      </ThemeProvider>
    </BrowserRouter>
  )
}
