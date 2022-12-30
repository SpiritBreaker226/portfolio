import { Action, InitialState, Types } from '../types'

export const postReducer = (state: InitialState, action: Action) => {
  switch (action.type) {
    case Types.AddPosts:
      return {
        ...state,
        posts: action.payload.posts,
      }
    default:
      return state
  }
}
