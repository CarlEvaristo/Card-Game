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
const computerScore = document.getElementById("computer-score")
const playerScore = document.getElementById("player-score")
const confetti = document.getElementById("confettis")

let score = {
    computer: 0,
    player: 0
}

overlay.addEventListener("click", () => {
    overlay.style.display = "none"
    confetti.style.display = "none"
})

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
    cardArr = ["2", "3", "4", "5", "6", "7", "8", "9", "10", "JACK", "QUEEN", "KING", "ACE"]
    let cardValue1 =  cardArr.indexOf(card1.value)
    let cardValue2 =  cardArr.indexOf(card2.value)

    if (cardValue1 > cardValue2) {
        score.computer += 1
        return "Computer Wins!"
    } else if (cardValue1 < cardValue2) {
        score.player += 1
        return "You Win!"
    } else {
        return "It's a draw"
    } 

}


async function handleClick() {
    const response = await fetch("https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1")
    const data = await response.json()

    drawCardBtn.classList.remove("disabled")
    drawCardBtn.disabled = false
    cardsRemaining.textContent = `Remaining Cards: ${data.remaining}`
    deckId = data.deck_id
}


async function handleDraw() {
    const response = await fetch(`https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=2`)
    const data = await response.json()
    cardsRemaining.textContent = `Remaining Cards: ${data.remaining}`
    header.textContent = determineWinner(data.cards[0], data.cards[1])
    playerScore.textContent = `You: ${score.player}`
    computerScore.textContent = `Computer: ${score.computer}`
    card1.innerHTML = `<img src="${data.cards[0].image}" alt="${data.cards[0].value} ${data.cards[0].suit}">`
    setTimeout(() => {
        card2.innerHTML = `<img src="${data.cards[1].image}" alt="${data.cards[1].value} ${data.cards[1].suit}">`
    },200)

    if (data.remaining == 0) {
        drawCardBtn.disabled = true
        let winningTxt = (score.computer > score.player) ? "Computer Wins Game!" : (score.computer < score.player) ? "You Win Game!" : "It's a Tie Game!"
        header.textContent = winningTxt
        showModal(winningTxt)
        newDeckBtn.textContent = "Click to Replay"
        newDeckBtn.addEventListener("click", ()=> location.reload())
        if (score.computer < score.player) {
            confetti.style.display = "inline"
        }

    }
}

newDeckBtn.addEventListener("click", handleClick)
drawCardBtn.addEventListener("click", handleDraw)
handleClick()


