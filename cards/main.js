// Set-up for a Euchre deck
var ranks = ["9", "10", "J", "Q", "K", "A"];
var suits = ["&spades;", "&clubs;", "&hearts;", "&diams;"];
const Suit = {
    SPADES: "&spades;",
    CLUBS: "&clubs;",
    HEARTS: "&hearts;",
    DIAMS: "&diams;"
}

// returns a random in from min (inclusive) to max (exclusive)
function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
}

var gameState = 0;
var trump;

var cardTemplate = document.getElementById("cardTemplate");
var handTemplate = document.getElementById("handTemplate");

var handLeft = document.getElementsByClassName("handLeft")[0];
var handTop = document.getElementsByClassName("handTop")[0];
var handRight = document.getElementsByClassName("handRight")[0];
var handBottom = document.getElementsByClassName("handBottom")[0];
var handMiddle = document.getElementsByClassName("handMiddle")[0];
var hands = [handRight, handBottom, handLeft, handTop];

function changeHandsOrder(first) {
    var start = hands.indexOf(first);
    var newHands = [];
    for(var i = 0; i < hands.length; i++) {
        newHands[i % start] = hands[i];
    }
}

// TODO: make Game class that sets up certain games (Euchre, etc.) automatically (should allow for individual rank and suit arrays)

class Card {
    // if either rank, suit, or both are 0, they will be randomly selected
    constructor(rank, suit) {
        if(rank == 0 && suit == 0) { // random rank, random suit
            this.rank = ranks[getRandomInt(0, ranks.length)];
            this.suit = suits[getRandomInt(0, suits.length)];
        } else if(rank == 0) { // random rank, given suit
            this.rank = ranks[getRandomInt(0, ranks.length)];
            this.suit = suit;
        } else if(suit == 0) { // given rank, random suit
            this.rank = rank;
            this.suit = suits[getRandomInt(0, suits.length)];
        } else { // given rank, given suit
            this.rank = rank;
            this.suit = suit;
        }
        // 0 is black, 1 is red
        this.color = (suits.indexOf(this.suit) == 0 || suits.indexOf(this.suit) == 1) ? 0 : 1;
        this.card;
        // flipped over
        this.hidden = false;
    }

    generate() {
        // get contents of the card template (including children)
        this.card = cardTemplate.content.cloneNode(true);
        // set suit and rank text color to red if it should be
        // (color is black by default so we don't change anything if this.color is 0)
        if(this.color == 1 && !this.hidden) {
            this.card.querySelector("#left").style.color = "red";
            this.card.querySelector("#right").style.color = "red";
        }
    }

    // displays this card in the given parent
    display(parent) {
        // created so we ca use this object's this when in another function (forEach)
        var that = this;
        // set html rank text
        this.card.querySelectorAll(".rank").forEach(function(el) {
            if(that.hidden) {
                el.innerHTML = "?";
            } else {
                el.innerHTML = that.rank;
            }
        });
        // set html suit text
        this.card.querySelectorAll(".suit").forEach(function(el) {
            if(that.hidden) {
                el.innerHTML = "?";
            } else {
                el.innerHTML = that.suit;
            }
        });
        // cloning the card allows there to be multiple of the same card displayed at once
        parent.appendChild(this.card.cloneNode(true));
    }

    // displays a text-only version of this card in the given parent
    displaySmall(parent) {
        var pre = document.createElement("pre");
        if(this.hidden) {
            pre.innerHTML = "?? ";
        } else {
            pre.innerHTML = this.rank + this.suit + " ";
            if(this.color == 1) {
                pre.style.color = "red";
            }
        }
        parent.appendChild(pre);
    }
}
// used to keep track of already-selected cards in Deck
Card.prototype.toString = function() {
    return this.rank + this.suit;
}

class Deck {
    constructor() {
        this.deck = [];
        this.parent;
    }

    // generates/replaces the current deck with a deck of the given rank, suit, and size
    // rank and/or suit of 0 will cause the respective property to be randomized
    // if size is 0, the size will be set to the maximum number of unique cards
    generate(rank, suit, size) {
        this.deck = [];
        var used = [];
        var max = 1;
        if(rank == 0) {
            max *= ranks.length;
        }
        if(suit == 0) {
            max *= suits.length;
        }
        if(size < 0) {
            size = max;
        }
        for(var i = 0; i < size; i++) {
            var card;
            if(this.deck.length < max) { // haven't already selected all unique cards
                // keep generating cards until until the card generated is unique
                while(used.includes((card = new Card(rank, suit)).toString())) {
                }
            } else {
                card = new Card(rank, suit);
            }
            card.generate();
            this.deck.push(card);
            used.push(card.toString());
        }
    }

    // shuffles the deck
    shuffle() {
        var temp = [];
        for(var i = 0; i < this.deck.length; i++) {
            // using this.deck.length instead of this.size because this.deck.length changes accordingly
            var index = getRandomInt(0, this.deck.length);
            temp.push(this.deck[index]);
            // remove this card so it can't be chosen again
            this.deck = this.deck.slice(0, index).concat(this.deck.slice(index + 1));
        }
        this.deck = temp;
        this.updateSmall();
    }

    hideAll() {
        for(var i = 0; i < this.deck.length; i++) {
            this.deck[i].hidden = true;
        }
    }

    unhideAll() {
        for(var i = 0; i < this.deck.length; i++) {
            deck[i].hidden = false;
        }
    }

    // displays all the cards in this deck in the given parent
    display(parent) {
        this.parent = parent;
        this.deck.forEach(function(el) {
            el.display(parent);
        });
    }

    update() {
        this.parent.innerHTML = "";
        this.display(this.parent);
    }

    // displays a text-only version of the cards in this deck in the given parent
    displaySmall(parent) {
        this.parent = parent;
        this.deck.forEach(function(el) {
            el.displaySmall(parent);
        });
    }

    updateSmall() {
        this.parent.innerHTML = "";
        this.displaySmall(this.parent);
    }
}

// TODO: playCard: (check to make play order is followed) (should have hands other than player's just have first card in hand played)
// TODO: once trump suit is picked, reorganize hand
// TODO: create method to choose best card in a hand (for deiciding who wins the trick)
// TODO: write stuff for second round of bidding

class Hand {
    constructor(deck, parent, max) {
        this.hand = [];
        this.deck = deck;
        this.parent = parent;
        this.max = max;
        this.HTMLHand = handTemplate.content.cloneNode(true);
        this.HTMLHolder = this.HTMLHand.querySelector(".handHolder");
    }

    // takes cards from the given deck (removing the cards from that deck) and adds them to this hand
    // if the given size is greater than the current deck size or negative, the size will be set to the rest of the deck
    generate(size) {
        if(size > this.deck.deck.length || size < 0) {
            size = this.deck.deck.length;
        }
        if(size + this.hand.length > this.max) {
            size = this.max - this.hand.length;
        }
        for(var i = 0; i < size; i++) {
            this.hand.push(this.deck.deck[i]);
        }
        this.deck.deck = this.deck.deck.slice(size);
        this.deck.updateSmall();
        var that = this;
        this.parent.insertBefore(this.HTMLHand, this.parent.firstChild);

    }

    // takes the cards from start (inclusive) to end (exclusive) of this hand and moves them to the bottom of the deck it was drawn from
    // if start and end aren't specified, all cards will be returned
    returnToDeck(start, end) {
        if(start >= 0 && end > start) {
            for(var i = start; i < end; i++) {
                this.hide(i);
                this.deck.deck.push(this.hand[i]);
            }
            this.hand = this.hand.slice(0, start).concat(this.hand.slice(end));
            this.deck.updateSmall();
            this.updateSmall();
        } else {
            this.hideAll();
            for(var i = 0; i < this.hand.length; i++) {
                this.deck.deck.push(this.hand[i]);
            }
            this.hand = [];
            this.deck.updateSmall();
            this.updateSmall();
        }
    }

    moveToHand(start, end, hand, hide) {
        if(start >= 0 && end > start) {
            for(var i = start; i < end; i++) {
                if(hide) {
                    this.hide(i);
                }
                hand.hand.push(this.hand[i]);
            }
            this.hand = this.hand.slice(0, start).concat(this.hand.slice(end));
            hand.updateSmall();
            this.updateSmall();
        } else {
            if(hide) {
                this.hideAll();
            }
            for(var i = 0; i < this.hand.length; i++) {
                hand.hand.push(this.hand[i]);
            }
            this.hand = [];
            hand.updateSmall();
            this.updateSmall();
        }
    }

    hideAll() {
        for(var i = 0; i < this.hand.length; i++) {
            this.hand[i].hidden = true;
        }
    }

    hide(handIndex) {
        this.hand[handIndex].hidden = true;
    }

    unhideAll() {
        for(var i = 0; i < this.hand.length; i++) {
            this.hand[i].hidden = false;
        }
    }

    unhide(handIndex) {
        this.hand[handIndex].hidden = false;
    }

    // displays all the cards in this hand in the given parent
    display() {
        if(this.hand.length > 0) {
            var that = this;
            this.hand.forEach(function(el) {
                el.display(that.HTMLHolder);
            });
        }
    }

    update() {
        this.HTMLHolder.innerHTML = "";
        this.display();
    }

    // displays a text-only version of the cards in this hand in the given parent
    displaySmall() {
        if(this.hand.length > 0) {
            var that = this;
            this.hand.forEach(function(el) {
                el.displaySmall(that.HTMLHolder);
            });
        }
    }

    updateSmall() {
        this.HTMLHolder.innerHTML = "";
        this.displaySmall();
    }

    playCard(cardIndex, hide) {
        if(gameState > 0) {
            this.moveToHand(cardIndex, cardIndex + 1, handMiddleObj, hide);
        }
    }
}

document.querySelector(".shuffle").onclick = function(e) {
    deck.shuffle();
}

document.querySelector(".returnAll").onclick = function(e) {
    for(var i = 0; i < handsObj.length; i++) {
        handsObj[i].returnToDeck();
    }
    orderUp.style.display = "none";
    next = 0;
}

// Euchre deck
var deck = new Deck();
deck.generate(0, 0, -1);
deck.hideAll();
deck.displaySmall(document.querySelector(".deckHolder"));

var handLeftObj = new Hand(deck, handLeft, 5);
var handTopObj = new Hand(deck, handTop, 5);
var handRightObj = new Hand(deck, handRight, 5);
var handBottomObj = new Hand(deck, handBottom, 5);
var handMiddleObj = new Hand(deck, handMiddle, 5);

var orderUp = document.querySelector(".orderUp");
orderUp.style.display = "none";

orderUp.onclick = function(e) {
    trump = handMiddleObj.hand[0].suit; // set trump suit
    handTopObj.returnToDeck(0, 1); // move the first card (for testing purposes) of top's hand to the deck
    handMiddleObj.moveToHand(0, 1, handTopObj, true); // move the turned up middle card to the dealer's hand (top)
    handMiddleObj.returnToDeck(); // move the rest of middle's cards to the deck
    orderUp.style.display = "none";
    pass.style.display = "none";
    gameState = 1;
}

var pass = document.querySelector(".pass");
pass.style.display = "none";
pass.onclick = function(e) {
    handMiddleObj.returnToDeck();
    orderUp.style.display = "none";
    pass.style.display = "none";
    gameState = 1;
}

var handsObj = [handRightObj, handBottomObj, handLeftObj, handTopObj];

var findNext = function(val) {
    let next = val % 4;
    if(val == 8) {
        let next = 4;
        handMiddleObj.generate(4);
        handMiddleObj.hideAll();
        handMiddleObj.unhide(0);
        handMiddleObj.updateSmall();
        orderUp.style.display = "initial";
        pass.style.display = "initial";
        // make the player's hand interactive
        handBottomObj.HTMLHolder.onclick = function(e) {
            if(e.target != e.currentTarget) {
                var children = [].slice.call(e.currentTarget.children);
                handBottomObj.playCard(children.indexOf(e.target), false);
                e.stopPropagation();
            }
        }
    } else {
        if(hands[next].children[0].children.length == 3) {
            handsObj[next].generate(2);
        } else {
            handsObj[next].generate(3);
        }
        if(next == 1) {
            handsObj[next].unhideAll();
        } else {
            handsObj[next].hideAll();
        }
    }
    handsObj[next].updateSmall();
}

var next = 0;

document.querySelector(".deal").onclick = function(e) {
    if(deck.deck.length > 0) {
        if(next >= 0) {
            if(next == 8) { // last time cards should be dealt
                findNext(next);
                next = -1;
            } else {
                findNext(next % 4);
                next++;
            }
        }
    }
}

// generate empty containers
handsObj.forEach(function(el) {
    el.generate(0);
    el.displaySmall();
});
