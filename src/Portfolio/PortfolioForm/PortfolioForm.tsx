import { ChangeEvent, FC } from 'react'
import styled from 'styled-components'
import { Button, Textfield } from '../../Components'

import { useApp } from '../../context'
import {
  DisplayOption,
  displayOptions,
  Platform,
  ProjectType,
  Tag,
  Types,
  UpdateSearchTypes,
} from '../../types'
import Select from './Components/Select'

const Container = styled.div`
  padding-bottom: 1rem;
`

const NonDisplayFilterOptions = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
`

const SearchContainer = styled.div`
  display: flex;
  flex-flow: column;
`

const DisplayOptionContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
`

const DisplayOptionLabel = styled.h4`
  margin-right: 0.5rem;
`

export const PortfolioForm: FC = () => {
  const {
    state: { searchCriteria },
    dispatch,
  } = useApp()

  const handleSearchTextChange = (e: ChangeEvent<HTMLInputElement>) => {
    dispatch({
      type: UpdateSearchTypes.Text,
      payload: { searchText: e.target.value },
    })

    dispatch({
      type: Types.Search,
      payload: {},
    })
  }

  const handleResetSearch = () => {
    dispatch({
      type: Types.ResetSearchCriteria,
      payload: {},
    })

    dispatch({
      type: Types.Search,
      payload: {},
    })
  }

  const handleDisplayChange = (
    display: DisplayOption | Array<DisplayOption>
  ) => {
    dispatch({
      type: UpdateSearchTypes.Display,
      payload: { display: display as DisplayOption },
    })
  }

  const handleTypeChange = (
    type: ProjectType | string | Array<ProjectType | string>
  ) => {
    const newType =
      (type as string).toLowerCase() === 'all'
        ? undefined
        : (type as ProjectType)

    dispatch({
      type: UpdateSearchTypes.Type,
      payload: { type: newType },
    })
  }

  const handlePlatformChange = (currentPlatforms: Platform | Platform[]) => {
    const newSearchPlatforms = new Set(currentPlatforms as Platform[])

    dispatch({
      type: UpdateSearchTypes.Platform,
      payload: {
        platforms: newSearchPlatforms,
      },
    })
  }

  const handleTagChange = (currentTags: Tag | Tag[]) => {
    const newSearchTags = new Set(currentTags as Tag[])
    console.log('newSearchTags', newSearchTags)
    dispatch({
      type: UpdateSearchTypes.Tag,
      payload: {
        tags: newSearchTags,
      },
    })
  }

  return (
    <Container>
      <NonDisplayFilterOptions>
        <SearchContainer>
          <label htmlFor="searchText">Name / Description</label>

          <Textfield
            type="text"
            id="searchText"
            onChange={handleSearchTextChange}
            value={searchCriteria.searchText}
          />
        </SearchContainer>

        <Select<ProjectType | string>
          name="type"
          label="Type"
          values={[searchCriteria.type || 'all']}
          options={['all', ...Object.values(ProjectType)]}
          onSelectChange={handleTypeChange}
        />

        <Select<Platform>
          name="platform"
          label="Platforms"
          values={Array.from(searchCriteria.platforms)}
          options={Object.values(Platform)}
          onSelectChange={handlePlatformChange}
          noDataLabel="No platform found"
          multi
          style={{
            minWidth: '10rem',
          }}
        />

        <Select<Tag>
          name="tag"
          label="Tags"
          values={Array.from(searchCriteria.tags)}
          options={Object.values(Tag)}
          onSelectChange={handleTagChange}
          noDataLabel="No tag found"
          multi
          style={{
            minWidth: '10rem',
          }}
        />

        <Button onClick={handleResetSearch}>Reset Search</Button>
      </NonDisplayFilterOptions>
      <DisplayOptionContainer>
        <DisplayOptionLabel>Show:</DisplayOptionLabel>
        <Select<DisplayOption>
          name="display"
          values={[searchCriteria.display]}
          options={[...displayOptions]}
          onSelectChange={handleDisplayChange}
        />
      </DisplayOptionContainer>
    </Container>
  )
}
