const BASE_URL = "http://localhost:3000"
const TRAINERS_URL = `${BASE_URL}/trainers`
const POKEMONS_URL = `${BASE_URL}/pokemons`
const main = document.querySelector('main')

document.addEventListener('DOMContentLoaded', () => {

    getAllTrainers()

})

function getAllTrainers() {
    fetch(TRAINERS_URL)
        .then(resp => resp.json())
        .then(json => {
            generateAllTrainers(json)
        })
}

function generateAllTrainers(trainerArray) {
    // create all trainer cards, then append to the main div, defined above
    trainerArray.forEach( trainer => {
        // console.log(trainer)
        const trainerCard = createTrainerCard(trainer)
        main.appendChild(trainerCard)
    } )
}

function createTrainerCard(trainer) {
    // create AND RETURN a trainer card
    // console.log(trainer.id)
    const card = document.createElement('div')
    card.className = 'card'
    card.dataset.id = trainer.id
    
    const p = document.createElement('p')
    p.textContent = trainer.name

    const button = document.createElement('button')
    button.textContent = "Add Pokemon"
    // how do trainer-id ? 

    const ul = document.createElement('ul')

    for (const poke of trainer.pokemons) {
        const pokeItem = createPokemonListItem(poke)
        ul.appendChild(pokeItem)
    }

    card.append(p, button, ul)
    return card
}

function createPokemonListItem(pokeObj) {
    // create AND RETURN a pokemon list item

    const listItem = document.createElement('li')
    listItem.textContent = `${ pokeObj.nickname } (${ pokeObj.species }) `

    const pokeButton = document.createElement('button')
    pokeButton.className = 'release'
    pokeButton.dataset.pokemonID = pokeObj.id
    pokeButton.textContent = 'Release'

    listItem.appendChild(pokeButton)
    return listItem
}