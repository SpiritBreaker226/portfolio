import { Post } from './Blog'
import { Types, UpdateSearchTypes } from './enum'
import { DisplayOption, Platform, Project, ProjectType, Tag } from './Project'

type PostPayload = {
  [Types.AddPosts]: {
    posts: Post[]
  }
}

type ProjectPayload = {
  [Types.AddProject]: {
    projects: Project[]
  }
}

type SearchPayload = {
  [Types.Search]: {}
  [Types.ResetSearchCriteria]: {}
  [UpdateSearchTypes.Text]: {
    searchText: string
  }
  [UpdateSearchTypes.Type]: {
    type?: ProjectType
  }
  [UpdateSearchTypes.Platform]: {
    platforms: Set<Platform>
  }
  [UpdateSearchTypes.Tag]: {
    tags: Set<Tag>
  }
  [UpdateSearchTypes.Display]: {
    display: DisplayOption
  }
}

type ActionMap<M extends { [index: string]: any }> = {
  [Key in keyof M]: M[Key] extends undefined
    ? {
        type: Key
      }
    : {
        type: Key
        payload: M[Key]
      }
}

export type PostActions = ActionMap<PostPayload>[keyof ActionMap<PostPayload>]

export type ProjectActions =
  ActionMap<ProjectPayload>[keyof ActionMap<ProjectPayload>]

export type SearchActions =
  ActionMap<SearchPayload>[keyof ActionMap<SearchPayload>]

export type Action = PostActions | ProjectActions | SearchActions
