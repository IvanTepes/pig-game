'use strict';

// Selecting the player element from the DOM
const player0El = document.querySelector('.player__0');
const player1El = document.querySelector('.player__1');

// Selecting the score elements from the DOM.
const score0El = document.getElementById('score__0');
const score1El = document.getElementById('score__1');

// Selecting the current score elements from the DOM.
const current0El = document.getElementById('current__0');
const current1El = document.getElementById('current__1');

// Selecting the dice from the DOM.
const diceEl = document.querySelector('.dice');

// Selecting the buttons from the DOM.
const btnNew = document.querySelector('.btn__new');
const btnRoll = document.querySelector('.btn__roll');
const btnHold = document.querySelector('.btn__hold');

// Declaring the variables that will be used in the game.
let scores, currentScore, activePlayer, playing;

const init = function () {
    // Reassign players score.
    scores = [0, 0];
    // Reassign current score.
    currentScore = 0;
    // Reassign the active player to 0.
    activePlayer = 0;
    // A reassign variable that is used to check if the game is still playing.
    playing = true;

    // Starting players score.
    score0El.textContent = 0;
    score1El.textContent = 0;

    // Setting the current score to 0.
    current0El.textContent = 0;
    current1El.textContent = 0;

    // Starting game by hide dices and hide hold btn.
    diceEl.classList.add('hidden');
    btnHold.classList.add('hidden');

    // Removing the class btn__roll-1 from the btnRoll element.
    btnRoll.classList.remove('btn__roll-1');

    /* Removing the winner class from both players 
    and then adding the active class to player 1
    and removing it from player 2. */
    player0El.classList.remove('player__winner');
    player1El.classList.remove('player__winner');
    player0El.classList.add('player__active');
    player1El.classList.remove('player__active');
};
init();

/**
 * If the active player is 0, then set the active player to 1, otherwise set the active player to 0
 */
const switchPlayer = function () {
    document.getElementById(`current__${activePlayer}`).textContent = 0;
    currentScore = 0;
    activePlayer = activePlayer === 0 ? 1 : 0;
    player0El.classList.toggle('player__active');
    player1El.classList.toggle('player__active');

    // Toggling the class btn__roll-1 on the btnRoll element. */
    btnRoll.classList.toggle(`btn__roll-1`);
};

// Rolling dice functionality
btnRoll.addEventListener('click', function () {
    if (playing) {
        // 1. Generating a random dice roll
        const dice = Math.trunc(Math.random() * 6) + 1;

        // 2. Display dice
        diceEl.classList.remove('hidden');
        btnHold.classList.remove('hidden');
        diceEl.src = `assets/img/dice-img/dice-${dice}.png`;
        // 3. Check for rolled 1
        if (dice !== 1) {
            // Add dice to current score
            currentScore += dice;
            document.getElementById(`current__${activePlayer}`).textContent =
                currentScore;
        } else {
            // Switch to next player
            switchPlayer();
        }
    }
});

// Hold score functionality
btnHold.addEventListener('click', function () {
    if (playing) {
        // 1. Add current score to active player's score
        scores[activePlayer] += currentScore;
        // scores[1] = scores[1] + currentScore
        document.getElementById(`score__${activePlayer}`).textContent =
            scores[activePlayer];
        // 2. Check if player's score is >= 100
        if (scores[activePlayer] >= 20) {
            // Finish the game
            // Setting the current score to 0.
            current0El.textContent = 0;
            current1El.textContent = 0;
            playing = false;
            diceEl.classList.add('hidden');
            document
                .querySelector(`.player__${activePlayer}`)
                .classList.add('player__winner');
            document
                .querySelector(`.player__${activePlayer}`)
                .classList.remove('player__active');
        } else {
            // Switch to next player
            switchPlayer();
        }
    }
});

// Calling the init function when the new game button is clicked.
btnNew.addEventListener('click', init);
