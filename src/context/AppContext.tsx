import {
  createContext,
  Dispatch,
  FC,
  ReactNode,
  useContext,
  useReducer,
} from 'react'

import { usePortfolio } from '../hooks'
import { postReducer, projectReducer, searchReducer } from '../reducers'
import { Action, InitialState, Types } from '../types'

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
  const { getPortfolios } = usePortfolio()
  const [state, dispatch] = useReducer(
    mainReducer,
    initialState,
    /**
     * Loads the projects into the first state, so every route has them.
     * A project page opened from a bookmark, a shared link or a refresh
     * would otherwise find no project and redirect to Page Not Found.
     *
     * @example
     * withProjects(initialState).projects['pablo-honey'].name
     * // => 'Pablo Honey'
     */
    function withProjects(state: InitialState) {
      return projectReducer(state, {
        type: Types.AddProject,
        payload: { projects: getPortfolios() },
      })
    }
  )

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  )
}

export { AppContext, AppProvider }

export const useApp = () => useContext(AppContext)
