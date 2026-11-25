import { FC, ReactNode } from 'react'
import { BrowserRouter } from 'react-router-dom'

import { ThemeProvider } from '../theme'

export type RenderProps = {
  children: ReactNode
}

export const DefaultWrapper: FC<RenderProps> = ({ children }) => (
  <BrowserRouter>
    <ThemeProvider>{children}</ThemeProvider>
  </BrowserRouter>
)
