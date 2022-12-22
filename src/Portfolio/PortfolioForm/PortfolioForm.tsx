import { ChangeEvent, FC } from 'react'
import styled from 'styled-components'
import { titleCase } from '../../AppBody/helpers'

import { useApp } from '../../context'
import {
  DisplayOption,
  displayOptions,
  Types,
  UpdateSearchTypes,
} from '../../types'
import { RadioButton } from './Components'

const Container = styled.div`
  padding-bottom: 1rem;
`

const FieldsetLabel = styled.h4`
  padding-bottom: 0.25rem;
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
    </Container>
  )
}
