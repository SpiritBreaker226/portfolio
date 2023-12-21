import {
  createContext,
  Dispatch,
  FC,
  ReactNode,
  useContext,
  useReducer,
} from 'react'

import { postReducer, projectReducer, searchReducer } from '../reducers'
import { Action, InitialState } from '../types'

export const initialState: InitialState = {
  posts: [],
  projects: {},
  filteredProjects: [],
  searchCriteria: {
    searchText: '',
    platforms: new Set(),
    tags: new Set(),
  },
}

type AppProviderProps = {
  children: ReactNode
}

const AppContext = createContext<{
  state: InitialState
  dispatch: Dispatch<Action>
}>({
  state: initialState,
  // Add code coverage ignore to create context as there is no way for
  // developers nor the user to access the dispatch directly. As a result, no
  // test, require to test that path so that this line can safely ignore.
  dispatch: () => null,
})

const mainReducer = (state: InitialState, action: Action) => {
  let currentState = postReducer(state, action)

  currentState = projectReducer(currentState, action)

  return searchReducer(currentState, action)
}

const AppProvider: FC<AppProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer(mainReducer, initialState)

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  )
}

export { AppContext, AppProvider }

export const useApp = () => useContext(AppContext)
