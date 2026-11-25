import { FC, ReactNode } from 'react'
import { BrowserRouter } from 'react-router-dom'

import { ThemeProvider } from '../theme'

export type RenderProps = {
  children: ReactNode
}

export const DefaultWrapper: FC<RenderProps> = ({ children }) => (
  <BrowserRouter
    future={{ v7_startTransition: true, v7_relativeSplatPath: true }}
  >
    <ThemeProvider>{children}</ThemeProvider>
  </BrowserRouter>
)
