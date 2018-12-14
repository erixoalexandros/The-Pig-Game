//GLOBAL VARIABLES//////////
var activePlayer = 0;
var score = [0, 0];
var current = 0;
var winnerScore = 100;
var playingGame = true;

//DOM ELEMENTS///////////
var rollDiceButton = document.getElementById('roll-btn');
var holdButton = document.getElementById('hold-btn');
var dice = document.querySelector('#dice img');
var playerOneCurrent = document.querySelectorAll('.player-current-box h2')[0];
var playerTwoCurrent = document.querySelectorAll('.player-current-box h2')[1];
var playerOneScore = document.querySelectorAll('.player-score-box h2')[0];
var playerTwoScore = document.querySelectorAll('.player-score-box h2')[1];
var playerOneHeading = document.querySelectorAll('.player-heading h2')[0];
var playerTwoHeading = document.querySelectorAll('.player-heading h2')[1];
var newGameButton = document.getElementById('new-game');
var newGameButtonText = document.querySelector('#new-game p');
playerOneHeading.classList.add('active-player');

function controlStateGame() {
    activePlayer = 0;
    score = [0, 0];
    current = 0;
    playerOneCurrent.textContent = '0';
    playerTwoCurrent.textContent = '0';
    playerOneScore.textContent = '0';
    playerTwoScore.textContent = '0';
    playerOneHeading.textContent = 'PLAYER 1';
    playerTwoHeading.textContent = 'PLAYER 2';
    dice.style.display = 'none';
    playingGame = true;
    playerOneHeading.classList.add('active-player');
    playerTwoHeading.classList.remove('active-player');
}

function checkWinner() {
    if (score[0] >= winnerScore || score[1] >= winnerScore) {
        if (activePlayer === 1) {
            playerOneHeading.textContent = 'WINNER!';
            playerOneHeading.classList.add('active-player');
            playerTwoHeading.textContent = 'LOOSER!';
            playerTwoHeading.classList.remove('active-player');
            playingGame = false;
        } else {
        	playerTwoHeading.classList.add('active-player');
            playerTwoHeading.textContent = 'WINNER!';
            playerOneHeading.classList.remove('active-player');   
            playerOneHeading.textContent = 'LOOSER!';
            playingGame = false;
        }
    }
}

//NEW GAME BUTTON OPERATION/////////////////////////////
newGameButton.addEventListener('click', controlStateGame);


//ROLL DICE BUTTON OPERATION/////////////////////////////
rollDiceButton.addEventListener('click', function() {
    if (playingGame) {
        dice.style.display = 'initial';
        var diceNumber = Math.floor(Math.random() * 6 + 1);
        dice.src = 'img/dice-' + diceNumber + '.png';

        if (activePlayer === 0) {
            if (diceNumber !== 1) {
                playerOneHeading.classList.add('active-player');
                playerTwoHeading.classList.remove('active-player');
                current += diceNumber;
                playerOneCurrent.textContent = current;
            } else {
                current = 0;
                playerOneCurrent.textContent = 0;
                activePlayer = 1;
            }
        } else {
            if (diceNumber !== 1) {
                playerTwoHeading.classList.add('active-player');
                playerOneHeading.classList.remove('active-player');
                current += diceNumber;
                playerTwoCurrent.textContent = current;
            } else {
                current = 0;
                playerTwoCurrent.textContent = 0;
                activePlayer = 0;
            }
        }
    }
});


//HOLD BUTTON OPERATION/////////////////////////////
holdButton.addEventListener('click', function() {
    if (playingGame) {
        if (activePlayer === 0) {
            playerOneHeading.classList.remove('active-player');
            playerTwoHeading.classList.add('active-player');
            score[0] += current;
            playerOneScore.textContent = score[0];
            current = 0;
            playerOneCurrent.textContent = 0;
            activePlayer = 1;
        } else {
            playerTwoHeading.classList.remove('active-player');
            playerOneHeading.classList.add('active-player');
            score[1] += current;
            playerTwoScore.textContent = score[1];
            current = 0;
            playerTwoCurrent.textContent = 0;
            activePlayer = 0;
        }
        checkWinner();
    }
});

//Change text on New Game Button

window.addEventListener('load', function() {

    if (window.innerWidth <= 480) {
        newGameButtonText.textContent = '+';
    } else {
        newGameButtonText.textContent = 'New Game';
    }

});