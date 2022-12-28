import { ChangeEvent, FC } from 'react'
import styled from 'styled-components'
import { Button, Textfield } from '../../Components'

import { useApp } from '../../context'
import {
  DisplayOption,
  displayOptions,
  Platform,
  ProjectType,
  Types,
  UpdateSearchTypes,
} from '../../types'
import Select from './Components/Select'

const Container = styled.div`
  padding-bottom: 1rem;
`

const NonDisplayFilterOptions = styled.fieldset`
  display: flex;
  justify-content: space-between;
  align-items: center;
`

const SearchContainer = styled.div`
  display: flex;
  flex-flow: column;
`

const ResetSearchContainer = styled.div`
  text-align: right;
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

  return (
    <Container>
      <fieldset>
        <Select<DisplayOption>
          name="display"
          label="Show"
          values={[searchCriteria.display]}
          options={[...displayOptions]}
          onSelectChange={handleDisplayChange}
        />
      </fieldset>

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
        />
      </NonDisplayFilterOptions>
      <ResetSearchContainer>
        <Button onClick={handleResetSearch}>Reset Search</Button>
      </ResetSearchContainer>
    </Container>
  )
}
