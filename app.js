const cardsArray = document.querySelectorAll(".card")
let totalCards = cardsArray.length;
let cardA = null;
let cardB = null;
let cardsFlipped = 0;
let currentScore = 0;
let lowScore = localStorage.getItem("low-score");

//Load front image:
for (let i = 0; i < totalCards; i++) {
    let pathFront = "gifs/9.GIF";
    cardsArray[i].children[0].children[0].src = pathFront;
}
//Load back images:
loadBackImg();

for (let card of cardsArray) {
    card.addEventListener("click", cardClick);
}

let startBtn = document.getElementById("start-button");
startBtn.addEventListener("click", startGame);


function startGame() {
    setScore(0);
    location.reload(); // reseet once start button is pressed
}

function cardClick(e) {
    if (e.target.parentElement.classList.contains("front") === false) return;
    let currentCard = e.target.parentElement.parentElement;
    if (!cardA || !cardB) {
        if (currentCard.classList.contains("is-flipped") === false) {
            setScore(currentScore + 1);
        }
        currentCard.classList.add("is-flipped");
        cardA = cardA || currentCard;
        cardB = currentCard === cardA ? null : currentCard;
    }

    if (cardA && cardB) {
        let gifA = cardA.children[1].children[0].src;
        let gifB = cardB.children[1].children[0].src;

        if (gifA === gifB) {
            cardsFlipped += 2;
            cardA.children[1].removeEventListener("click", cardClick);
            cardB.children[1].removeEventListener("click", cardClick);
            cardA = null;
            cardB = null;
        } else {
            setTimeout(function() {
                cardA.classList.remove("is-flipped");
                cardB.classList.remove("is-flipped");
                cardA = null;
                cardB = null;
            }, 1000);
        }
    }

    if (cardsFlipped === totalCards) endGame();
}

function loadBackImg() {
    let indices = [];
    let pairs;
    for (let i = 1; i <= totalCards / 2; i++) {
        indices.push(i + "");
    }
    pairs = shuffle(indices.concat(indices));
    for (let i = 0; i < totalCards; i++) {
        let pathBack = "gifs/" + pairs[i] + ".gif";
        cardsArray[i].children[1].children[0].src = pathBack;
    }
}

function shuffle(array) {
    let arrayCopy = array.slice();
    for (let i = 0; i < totalCards; i++) {
        let j = Math.floor(Math.random() * (i + 1));
        let temp = arrayCopy[i];
        arrayCopy[i] = arrayCopy[j];
        arrayCopy[j] = temp;
    }
    return arrayCopy;
}

function setScore(newScore) {
    currentScore = newScore;
    document.getElementById("current-score").innerText = currentScore;
}

if (lowScore) {
    document.getElementById("best-score").innerText = lowScore;
}

function endGame() {
    let lowScore = +localStorage.getItem("low-score") || Infinity;
    if (currentScore < lowScore) {
        alert(`CONGRATULATIONS! YOU HOLD THE NEW RECORD: ${currentScore}`);
        localStorage.setItem("low-score", currentScore);
    } else {
        alert(`YOUR MOVES : ${currentScore}`);
    }
}