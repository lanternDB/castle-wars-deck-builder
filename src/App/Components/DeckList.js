import styled from "styled-components"

import { useContext, useRef } from "react"
import { DeckContext } from "../Utilities/HelperFunctions"

import { Card } from "./Card"
import { handleDragStart, handleDragEnter, handleDropDeck } from "../Utilities/HelperFunctions"

export function DeckList() {
  const { deck, setDeck } = useContext(DeckContext)
  const dragItem = useRef()
  const dragOverItem = useRef()

  return (
    <Styled.DeckList>
      <Styled.Deck>
      { deck && deck.map((card, index) => (
        <Card key={card.uniqueID} id={card.uniqueID} name={card.name} height="150px" 
          onDragStart={ (e) => handleDragStart(index, dragItem) }
          onDragEnter={ (e) => handleDragEnter(index, dragOverItem) }
          onDragEnd={ (e) => handleDropDeck(dragItem, dragOverItem, deck, setDeck) }
        />
      ))}
      </Styled.Deck>
    </Styled.DeckList>
  )
}

const Styled = {
  DeckList: styled("div")`
    width: 100%;
    min-width: 1070px;
    height: 100%;

    padding: .5rem;

    background-color: hsl(215, 40%, 19%);
    
    border: 2px solid hsl(208, 31%, 35%);
    border-radius: 5px;

    overflow: auto;

    -ms-overflow-style: none;  /* IE and Edge */
    scrollbar-width: none;  /* Firefox */
    
    ::-webkit-scrollbar {
      display: none;
    }
  `,

  Deck: styled("div")`
    display: flex;
    flex-wrap: wrap;
    gap: .5rem;
  `
}