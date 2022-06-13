let deckId
const cardsContainer = document.getElementById("cards")
const newDeckBtn = document.getElementById("new-deck")
const drawCardBtn = document.getElementById("draw-cards")

function determineWinner(card1, card2) {
    cardArr = ["JACK", "QUEEN", "KING", "ACE"]
    let cardValue1 = card1.value
    let cardValue2 = card2.value
    
    if (cardArr.includes(cardValue1)) {
        cardValue1 = cardArr.indexOf(cardValue1) + 11
    }
    if (cardArr.includes(cardValue2)) {
        cardValue2 = cardArr.indexOf(cardValue2) + 11
    }
    let message = (cardValue1 > cardValue2) ? "Computer Wins!" : (cardValue1 < cardValue2) ? "You Win!" : "War!"
    return message
}

function handleClick() {
    fetch("https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1")
        .then(res => res.json())
        .then(data => deckId = data.deck_id)
}

function handleDraw() {
    fetch(`https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=2`)
    .then(res => res.json())
    .then(data => {
        cardsContainer.children[0].innerHTML = `
        <div class="card-placeholder"><img src="${data.cards[0].image}" alt="${data.cards[0].value} ${data.cards[0].suit}"></div>
        `
        cardsContainer.children[1].innerHTML = `
        <div class="card-placeholder"><img src="${data.cards[1].image}" alt="${data.cards[1].value} ${data.cards[1].suit}"></div>
        `
        document.getElementById("game-message").textContent = determineWinner(data.cards[0], data.cards[1])
    })
}

newDeckBtn.addEventListener("click", handleClick)
drawCardBtn.addEventListener("click", handleDraw)
handleClick()






