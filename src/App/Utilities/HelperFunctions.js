import { createContext } from "react"
import { cardsObj, cardsArr, cardsJSONData } from "../Utilities/Template"

export const DeckContext = createContext({
  deck: [],
  setDeck: () => {}
})

export function sortDeck(deck) {
  return [...deck.sort( (a, b) => {
    if (a.color === b.color) return a.name < b.name ? -1 : 1
    return a.color < b.color ? -1 : 1 
  })]
}

export function importDeck(onChangeEvent) {
  return new Promise((resolve, reject) => {
    const fileReader = new FileReader()
    fileReader.onload = () => {
      resolve(JSON.parse(fileReader.result).ObjectStates[0].ContainedObjects.map( (card) => { 
        return {uniqueID: crypto.randomUUID(), ...cardsObj[card.Nickname.split(" ").join("_").toLocaleLowerCase()]}
      }))
    }
    fileReader.onerror = reject
    fileReader.readAsText(onChangeEvent.target.files[0])
  })
}

export function exportDeck(deck) {
  return URL.createObjectURL(
    new Blob([
      generateJSONData(deck.map((card) => (
        cardsObj[card.name.split(" ").join("_").toLocaleLowerCase()].cardID
      )), [...deck])
    ], { type: "text/json;charset=utf-8"})
  )
}

function generateJSONData(cardIDsArr, cardsArr) {
  return JSON.stringify({
    "SaveName": "",
    "Date": "",
    "VersionNumber": "",
    "GameMode": "",
    "GameType": "",
    "GameComplexity": "",
    "Tags": [],
    "Gravity": 0.5,
    "PlayArea": 0.5,
    "Table": "",
    "Sky": "",
    "Note": "",
    "TabStates": {},
    "LuaScript": "",
    "LuaScriptState": "",
    "XmlUI": "",
    "ObjectStates": [
      {
        "GUID": "c5e610",
        "Name": "Deck",
        "Transform": {
          "posX": 41.0000229,
          "posY": 0.8301556,
          "posZ": 34.99999,
          "rotX": 1.44407153E-07,
          "rotY": 90.0003052,
          "rotZ": 180.0,
          "scaleX": 1.0,
          "scaleY": 1.0,
          "scaleZ": 1.0
        },
        "Nickname": "",
        "Description": "",
        "GMNotes": "",
        "AltLookAngle": {
          "x": 0.0,
          "y": 0.0,
          "z": 0.0
        },
        "ColorDiffuse": {
          "r": 0.713235259,
          "g": 0.713235259,
          "b": 0.713235259
        },
        "LayoutGroupSortIndex": 0,
        "Value": 0,
        "Locked": false,
        "Grid": true,
        "Snap": true,
        "IgnoreFoW": false,
        "MeasureMovement": false,
        "DragSelectable": false,
        "Autoraise": true,
        "Sticky": true,
        "Tooltip": true,
        "GridProjection": false,
        "HideWhenFaceDown": true,
        "Hands": false,
        "SidewaysCard": false,
        "DeckIDs": [...cardIDsArr],
        "CustomDeck": {
          "1492": {
            "FaceURL": "https://raw.githubusercontent.com/stom66/tts-castle-wars/master/AssetBundles/deck_gold.unity3d",
            "BackURL": "https://raw.githubusercontent.com/stom66/tts-castle-wars/master/AssetBundles/deck_gold_back.unity3d",
            "NumWidth": 4,
            "NumHeight": 3,
            "BackIsHidden": false,
            "UniqueBack": false,
            "Type": 0
          },
          "1489": {
            "FaceURL": "https://raw.githubusercontent.com/stom66/tts-castle-wars/master/AssetBundles/deck_blue.unity3d",
            "BackURL": "https://raw.githubusercontent.com/stom66/tts-castle-wars/master/AssetBundles/deck_blue_back.unity3d",
            "NumWidth": 5,
            "NumHeight": 4,
            "BackIsHidden": false,
            "UniqueBack": false,
            "Type": 0
          },
          "1490": {
            "FaceURL": "https://raw.githubusercontent.com/stom66/tts-castle-wars/master/AssetBundles/deck_red.unity3d",
            "BackURL": "https://raw.githubusercontent.com/stom66/tts-castle-wars/master/AssetBundles/deck_red_back.unity3d",
            "NumWidth": 4,
            "NumHeight": 4,
            "BackIsHidden": false,
            "UniqueBack": false,
            "Type": 0
          },
          "1491": {
            "FaceURL": "https://raw.githubusercontent.com/stom66/tts-castle-wars/master/AssetBundles/deck_green.unity3d",
            "BackURL": "https://raw.githubusercontent.com/stom66/tts-castle-wars/master/AssetBundles/deck_green_back.unity3d",
            "NumWidth": 4,
            "NumHeight": 4,
            "BackIsHidden": false,
            "UniqueBack": false,
            "Type": 0
          }
        },
        "LuaScript": "",
        "LuaScriptState": "",
        "XmlUI": "",
        "ContainedObjects": cardsArr.map( (card) => ( 
          cardsJSONData[card.name.split(" ").join("_").toLocaleLowerCase()]
        ))
      }
    ]
  })
}


export function handleDragStart(position, dragItem) {
  dragItem.current = position
}

export function handleDragEnter(position, dragOverItem) {
  dragOverItem.current = position
}

export function handleDropDeck(dragItem, dragOverItem, deck, stateHandler) {
  const deckList = [...deck]
  const dragItemContent = deckList[dragItem.current]
  deckList.splice(dragItem.current, 1)
  deckList.splice(dragOverItem.current, 0, dragItemContent)
  dragItem.current = null
  dragOverItem.current = null
  stateHandler(deckList)
}

export function handleDropCardList(dragItem, dragOverItem, deck, stateHandler) {
  const cardList = [...cardsArr]
  const deckList = [...deck]

  const dragItemContent = { uniqueID: crypto.randomUUID(), ...cardList[dragItem.current] }
  deckList.splice(dragOverItem.current, 0, dragItemContent)
  dragItem.current = null
  dragOverItem.current = null
  stateHandler(deckList)
}

export function addCard(e, deck, stateHandler){ 
  stateHandler([...deck, {uniqueID: crypto.randomUUID(), ...cardsObj[e.target.name.split(" ").join("_").toLocaleLowerCase()]}])
}