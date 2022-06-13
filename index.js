let deckId
const cardsContainer = document.getElementById("cards")
const newDeckBtn = document.getElementById("new-deck")
const drawCardBtn = document.getElementById("draw-cards")

const header = document.getElementById("header")
const cardsRemaining = document.getElementById("cards-remaining")
const card1 = document.getElementById("card-1")
const card2 = document.getElementById("card-2")
const modal = document.getElementById("modal")
const overlay = document.getElementById("overlay")

let scoreComputer = 0
let scorePlayer = 0

overlay.addEventListener("click", () => overlay.style.display = "none")


function showModal(value) {
    overlay.style.display = "inline"
    modal.innerHTML = `
    <h4>${value}</h4>
    <button id="modal-btn">Click to Replay</button>
    `
    const modalBtn = document.getElementById("modal-btn")
    modalBtn.addEventListener("click", ()=> location.reload())
}


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

    if (cardValue1 > cardValue2) {
        scoreComputer += 1
        return "Computer Wins!"
    } else if (cardValue1 < cardValue2) {
        scorePlayer += 1
        return "You Win!"
    } else {
        return "War!"
    } 

}

function handleClick() {
    fetch("https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1")
        .then(res => res.json())
        .then(data => {
            drawCardBtn.classList.remove("disabled")
            drawCardBtn.disabled = false
            cardsRemaining.textContent = `Remaining Cards: ${data.remaining}`
            deckId = data.deck_id
        })
}

function handleDraw() {
    fetch(`https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=2`)
    .then(res => res.json())
    .then(data => {
        cardsRemaining.textContent = `Remaining Cards: ${data.remaining}`
        header.textContent = determineWinner(data.cards[0], data.cards[1])
        card1.innerHTML = `
        <h3>Computer: ${scoreComputer}</h3><div class="card-placeholder"><img src="${data.cards[0].image}" alt="${data.cards[0].value} ${data.cards[0].suit}"></div>
        `
        card2.innerHTML = `
        <h3>You: ${scorePlayer}</h3><div class="card-placeholder"><img src="${data.cards[1].image}" alt="${data.cards[1].value} ${data.cards[1].suit}"></div>
        `


        if (data.remaining == 0) {
            drawCardBtn.disabled = true
            drawCardBtn.classList.add("disabled")   
            let winningTxt = (scoreComputer > scorePlayer) ? "Computer Wins!" : (scoreComputer < scorePlayer) ? "You Win!" : "It's a Draw!"
            header.textContent = winningTxt
            showModal(winningTxt)
            newDeckBtn.textContent = "Click to Replay"
            newDeckBtn.addEventListener("click", ()=> location.reload())
        }
    })
}

newDeckBtn.addEventListener("click", handleClick)
drawCardBtn.addEventListener("click", handleDraw)
handleClick()


