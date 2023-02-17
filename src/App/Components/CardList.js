import styled from "styled-components"
import { cardsArr } from "../Utilities/Template"
import { CardInList } from "./Card"
import { useContext } from "react"
import { DeckContext } from "../Utilities/HelperFunctions"
import { addCard } from "../Utilities/HelperFunctions"

export function CardList() {
  const { deck, setDeck } = useContext(DeckContext)
  
  return (
    <Styled.CardList>
    {
      cardsArr.sort( (a, b) => {
        if (a.color === b.color) return a.name < b.name ? -1 : 1
        return a.color < b.color ? -1 : 1 
      }).map( (card, index) => (
        <CardInList key={index} name={card.name} effect={card.effect} height="130px" onClick={ (e) => addCard(e, deck, setDeck)} bottom={(index > 40) ? false : true}/>
      ))
    }
    </Styled.CardList>
  )
}

const Styled = {
  CardList: styled("div")`
    position: relative;
    display: flex;
    flex-wrap: wrap;
    width: 30%;
    min-width: 435px;
    padding: .5rem;
    gap: .5rem;


    background-color: hsl(215, 40%, 19%);
      
    border: 2px solid hsl(208, 31%, 35%);
    border-radius: 5px;

    overflow: auto;
    
    -ms-overflow-style: none;  /* IE and Edge */
    scrollbar-width: none;  /* Firefox */
    
    ::-webkit-scrollbar {
      display: none;
    }
`
}