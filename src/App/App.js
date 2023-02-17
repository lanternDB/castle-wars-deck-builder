import styled from "styled-components"

import { useState } from "react"

import { DeckContext } from "./Utilities/HelperFunctions"

import { Controls } from "./Components/Controls"
import { CardList } from "./Components/CardList"
import { DeckList } from "./Components/DeckList"

export function App() {
  const [deck, setDeck] = useState([])
  const contextValue = { deck, setDeck }

  return (
    <Styled.App>
      <DeckContext.Provider value={contextValue}>
        <Controls />
        <DeckList />
        <CardList />
      </DeckContext.Provider>
    </Styled.App>
  )
}

const Styled = {
  App: styled("div")`
    position: relative;
    display: flex;
    gap: 1rem;

    padding: .5rem;

    width: 100vw;
    height: 100vh;
    
    font-size: 18px;
    font-family: 'Noto Sans', sans-serif;

    background-color: hsl(222, 43%, 9%);

    user-select: none;
  `
}