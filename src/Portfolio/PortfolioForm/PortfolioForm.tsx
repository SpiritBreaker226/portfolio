import { ChangeEvent, FC } from 'react'
import styled from 'styled-components'
import { titleCase } from '../../AppBody/helpers'
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
import { Checkbox, RadioButton } from './Components'

const Container = styled.div`
  padding-bottom: 1rem;
`

const FieldsetLabel = styled.h4`
  padding-bottom: 0.25rem;
`

const NonDisplayFilterOptions = styled.fieldset`
  display: flex;
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

  const handleDisplayChange = (e: ChangeEvent<HTMLInputElement>) => {
    dispatch({
      type: UpdateSearchTypes.Display,
      payload: { display: e.target.value as DisplayOption },
    })

    dispatch({
      type: Types.Search,
      payload: {},
    })
  }

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

  const handleTypeChange = (e: ChangeEvent<HTMLInputElement>) => {
    const type =
      e.target.value === 'all' ? undefined : (e.target.value as ProjectType)

    dispatch({
      type: UpdateSearchTypes.Type,
      payload: { type },
    })

    dispatch({
      type: Types.Search,
      payload: {},
    })
  }

  const handlePlatformChange = (e: ChangeEvent<HTMLInputElement>) => {
    const platform = e.target.value as Platform
    const newSearchPlatforms = new Set(searchCriteria.platforms)

    if (newSearchPlatforms.has(platform)) {
      newSearchPlatforms.delete(platform)
    } else {
      newSearchPlatforms.add(platform)
    }

    dispatch({
      type: UpdateSearchTypes.Platform,
      payload: {
        platforms: newSearchPlatforms,
      },
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

  return (
    <Container>
      <fieldset>
        <FieldsetLabel>Display Projects:</FieldsetLabel>
        {displayOptions.map((display) => (
          <RadioButton
            key={display}
            label={titleCase(display)}
            id={display}
            value={display}
            name="display"
            onChange={handleDisplayChange}
            checked={searchCriteria.display === display}
          />
        ))}
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
        <SearchContainer>
          <FieldsetLabel>Types</FieldsetLabel>
          <RadioButton
            label="All"
            id="all"
            value="all"
            name="type"
            onChange={handleTypeChange}
            checked={!searchCriteria.type}
          />
          {Object.values(ProjectType).map((type) => (
            <RadioButton
              key={type}
              label={type}
              id={type}
              value={type}
              name="type"
              onChange={handleTypeChange}
              checked={searchCriteria.type === type}
            />
          ))}
        </SearchContainer>
        <SearchContainer>
          <FieldsetLabel>Platform</FieldsetLabel>

          {Object.values(Platform).map((platform) => (
            <Checkbox
              key={platform}
              label={platform}
              id={platform}
              value={platform}
              name="platform"
              onChange={handlePlatformChange}
              checked={searchCriteria.platforms?.has(platform)}
            />
          ))}
        </SearchContainer>
      </NonDisplayFilterOptions>
      <ResetSearchContainer>
        <Button onClick={handleResetSearch}>Reset Search</Button>
      </ResetSearchContainer>
    </Container>
  )
}
