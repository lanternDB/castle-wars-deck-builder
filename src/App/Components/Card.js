import styled from "styled-components"

import { useState, useContext } from "react"
import { DeckContext } from "../Utilities/HelperFunctions"

export function Card(props) {
  const { deck, setDeck } = useContext(DeckContext)

  return (
    <div name={props.name}
    onContextMenu={(e) => {
      e.preventDefault()
      setDeck(deck.filter( (card) => (card.uniqueID !== e.target.id)))
    }}
    onClick={props.onClick}
    onDragStart={props.onDragStart}
    onDragEnter={props.onDragEnter}
    onDragEnd={props.onDragEnd}
    draggable
    >
      <img id={props.id} src={"https://raw.githubusercontent.com/stom66/tts-castle-wars/master/Assets/images/cards/" + props.name.split(" ").join("_").toLocaleLowerCase() + ".png"} height={props.height} name={props.name} alt=""/>
    </div>
  )
}

export function CardInList(props) {
  const [showEffect, setShowEffect] = useState(false)
  let timeout
  console.log(props)

  const handleShowEffect = () => {
    timeout = setTimeout( () => { setShowEffect(true)}, 400)
  }
  const handleHideEffect = () => {
    clearInterval(timeout)
    setShowEffect(false)
  }

  return (
    <div onClick={props.onClick} style={{position: "relative"}} onMouseEnter={handleShowEffect} onMouseLeave={handleHideEffect}>
      <img src={"https://raw.githubusercontent.com/stom66/tts-castle-wars/master/Assets/images/cards/" + props.name.split(" ").join("_").toLocaleLowerCase() + ".png"} height={props.height} name={props.name} alt=""/>
      { showEffect && <ToolTip effect={props.effect} bottom={props.bottom}/> }
    </div>
  )
}

function ToolTip(props){
  return (
    <Styled.ToolTip bottom={props.bottom}>{props.effect}</Styled.ToolTip> 
  )
}

const Styled = {
  ToolTip: styled("p")`
    position: absolute;
    ${props => (props.bottom) ? "" : "bottom: 135px;"}

    padding: .3rem;

    background-color: white;

    border: 2px solid black;
    border-radius: 5px;

    z-index: 5;
  `
}