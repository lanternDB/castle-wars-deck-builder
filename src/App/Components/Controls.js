import styled from "styled-components"

import { useContext, useRef } from "react"

import { sortDeck, importDeck, DeckContext, exportDeck } from "../Utilities/HelperFunctions"

export function Controls() {
  const { deck, setDeck } = useContext(DeckContext)
  const inputElement = useRef()
  const anchorElement = useRef()
    
  return (
    <Styled.Controls>
      <Styled.Container>
        <Styled.Button onClick={()=> setDeck(sortDeck(deck))}><p>A-Z</p></Styled.Button>
        <Styled.Button><p>Total { deck.length }</p></Styled.Button>
      </Styled.Container>
      <Styled.Container>
        <Styled.Button onClick={() => inputElement.current.click()}>
          <Styled.Input type="file" accept=".json" onChange={(e) => importDeck(e).then((result) => setDeck(result))} ref={inputElement} />
          <p>Import</p>
        </Styled.Button>
        <Styled.Button onClick={() => {
          anchorElement.current.href = exportDeck(deck)
          anchorElement.current.click()
        }}>
          <Styled.Anchor href="#" download="new_deck" ref={anchorElement} /><p>Export</p>
        </Styled.Button>
      </Styled.Container>
    </Styled.Controls>
  )
}

const Styled = {
  Controls: styled("div")`
    display: flex;
    flex-direction: column;

    align-items: center;
    justify-content: space-between;
  `,

  Container: styled("div")`
    display: flex;
    flex-direction: column;

    gap: .5rem;
  `,

  Button: styled("div")`
    width: 60px;
    height: 60px;
    
    display: flex;

    align-items: center;
    justify-content: center;
    
    text-align: center;

    color: hsl(208, 31%, 35%);
    background-color: hsl(215, 40%, 19%);
    
    border: 2px solid hsl(208, 31%, 35%);
    border-radius: 5px;
  `,

  Input: styled("input")`
    display: none;
  `,

  Anchor: styled("a")`
    display: none;
  `
}