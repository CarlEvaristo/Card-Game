let deckId
let imgWrapper = document.getElementById("cards")

function handleClick() {
    fetch("https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1")
        .then(res => res.json())
        .then(data => deckId = data.deck_id)
}

function handleDraw() {
    fetch(`https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=2`)
    .then(res => res.json())
    .then(data => {
        imgWrapper.innerHTML = ""
        imgWrapper.innerHTML += `
        <div class="card-placeholder" style="border:none"><img src="${data.cards[0].image}" alt="${data.cards[0].value} ${data.cards[0].suit}"></div>
        <div class="card-placeholder" style="border:none"><img src="${data.cards[1].image}" alt="${data.cards[1].value} ${data.cards[1].suit}"></div>
        `

    })
}

document.getElementById("new-deck").addEventListener("click", handleClick)
document.getElementById("draw-cards").addEventListener("click", handleDraw)
handleClick()

/**
 * Challenge:
 * 
 * Start making this look lots nicer :)
 * 
 * 1. Add a card table background with the img/table.png image provided.
 * 2. Move the draw button to the very bottom of the page, full width
 * 3. Add some button styles. You can use the photo on the slides
 * for one option.
 */