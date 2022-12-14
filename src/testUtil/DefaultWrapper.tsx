import { Formik } from 'formik'
import { FC, ReactNode } from 'react'

export type RenderProps = {
  children: ReactNode
}

export const DefaultWrapper: FC<RenderProps> = ({ children }) => {
  return (
    <Formik initialValues={{ requireField: '' }} onSubmit={() => {}}>
      {children}
    </Formik>
  )
}
