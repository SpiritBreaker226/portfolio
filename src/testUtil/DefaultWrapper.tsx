import { Formik } from 'formik'
import { FC, ReactNode } from 'react'
import { BrowserRouter } from 'react-router-dom'

export type RenderProps = {
  children: ReactNode
}

export const DefaultWrapper: FC<RenderProps> = ({ children }) => {
  return (
    <BrowserRouter>
      <Formik initialValues={{ requireField: '' }} onSubmit={() => {}}>
        {children}
      </Formik>
    </BrowserRouter>
  )
}
