/*
 * Create a list that holds all of your cards
 */
var playingDeck = [
    "fa-diamond",
    "fa-diamond",
    "fa-paper-plane-o",
    "fa-paper-plane-o",
    "fa-anchor",
    "fa-anchor",
    "fa-bolt",
    "fa-bolt",
    "fa-cube",
    "fa-cube",
    "fa-bicycle",
    "fa-bicycle",
    "fa-bomb",
    "fa-bomb",
    "fa-leaf",
    "fa-leaf",
];

/*
Global Variable list.
 */
var openCard = [];
var matches = 0;
var attempts = 0;
var elapsedTime = 0;
var elapsed = 0;
var starRating = 3;
var timer = "";
var elapsedText = "";

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

/*function that creates the card in HTML and shuffles them for the game.*/
function createCard() {
    var gameList = shuffle(playingDeck);
    gameList.forEach(function(card) {
    $(".deck").append('<li class="card"><i class="fa ' + card + '"></i></li>');
    });
}


/*function flips the card over when player selects it*/
function revealCard() {
    $(".card").on("click", function() {
    if ($(this).hasClass("open show")) { return;}
      $(this).toggleClass("open show");
      openCard.push($(this));
      checkMatch();
});}


/*function that checks whether the cards selected by the player match.*/
function checkMatch() {
    if (openCard.length === 2) {
      $(".card").off("click");
      if (openCard[0].children().attr("class") === openCard[1].children().attr("class")) {
         openCard[0][0].classList.add("bounceIn", "match");
         openCard[1][0].classList.add("bounceIn", "match");
         $(openCard[0]).off("click");
         $(openCard[1]).off("click");
         matches += 1;
         attempts++;
         setTimeout(removeOpenCards, 800);
         setTimeout(revealCard, 1500);
         if(matches === 8) {
           window.clearInterval(timer);
           matchComplete();

       }
     }  else {
          openCard[0][0].classList.add("shake");
          openCard[1][0].classList.add("shake");
          attempts++;
          setTimeout(removeClasses, 800);
          removeOpenCards();
          setTimeout(revealCard, 1500);
       }
     }
    updateMoves();
  return;
}

/*function updates the moves and the star rating on the main game page as the game progresses.*/
function updateMoves() {
    document.getElementById("attemptsText").innerHTML = attempts;
    if (attempts > 0 && attempts < 16) {
      starRating = starRating;
    } else if (attempts >= 16 && attempts <= 20) {
      $("#starOne").removeClass("fa-star");
      starRating = "2";
    } else if (attempts > 20) {
      $("#starTwo").removeClass("fa-star");
      starRating = "1";
    }
}

/*function determines if all matches have been completed.  Also, creates variables that display on the modal popup.*/
function matchComplete() {
    elapsedTime = elapsed;
    var modal = document.getElementById("win-popup");
    var span = document.getElementsByClassName("close")[0];
    $("#totalAttempts").text(attempts);
    $("#totalStars").text(starRating);
    $("#elapsedTime").text(elapsed);
    modal.style.display = "block";
    // When the user clicks on <span> (close), close the modal
    span.onclick = function() {
      modal.style.display = "none";
    }
     $("#play-again-btn").on("click", function() {
         window.location.reload(true)
     });
   clearInterval(timer);
}

/*This function creates a restart button on the main game page so a player can start over if desired.*/
function reStart() {
    $(".re-start").on("click", function() {
        window.location.reload(true);
        document.getElementById("re-start").addEventListener("click");
});
    window.clearInterval(timer);

}

// Removes and cards that are in openCard whether by reStart or PlayAgain.*/
function removeOpenCards() {
    openCard = [];
}

// Removes classes from card after a match except for the class match.*/
function removeClasses() {
    $(".card").removeClass("show open bounceIn shake wrong");
    removeOpenCards();
}


/* Timer code from https://www.sitepoint.com/creating-accurate-timers-in-javascript/ */
var time = 0,
    elapsed = '0.0';

timer = window.setInterval(function()
{
    time += 100;

    elapsed = Math.floor(time / 100) / 10;
    if(Math.round(elapsed) == elapsed) { elapsed += '.0'; }

    document.getElementById("elapsedText").innerHTML = elapsed;

}, 100);








shuffle(playingDeck);
createCard();
revealCard();




/* * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */
