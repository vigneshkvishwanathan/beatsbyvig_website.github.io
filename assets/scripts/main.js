// all cards on the site
let cards = document.getElementsByClassName("card");

// cards with more than one screen
let multiScreenCards = [];

// save the default paginator boilerplate
let paginatorBoilerplate = document.getElementsByClassName("pagination-container")[0];

// adds paginator modules to every multiscreen card
function addPaginatorsToMultiScreenCards() {

    // for every card on the page,
    for (let i = 0; i < cards.length; i++) {

        // if the card has multiple screens,
        if (cards[i].children.length > 1) {
            
            // build and insert a new paginator at the end of the cards inside
            cards[i].appendChild(buildPaginator(cards[i].children.length));

            // get the new paginator and its indicators
            let paginator = cards[i].getElementsByClassName("pagination-indicators-container")[0];
            let indicators = paginator.getElementsByClassName("pagination-indicator");

            // for every indicator in our new paginator,
            // add a "click" event listener that will trigger a screen switch
            for (let x = 0; x < indicators.length; x++) {
                indicators[x].addEventListener(
                    "click",
                    function(event) {
                        switchPaginatorScreen(cards[i], x);
                    }
                );
            }
        }
    }
}
addPaginatorsToMultiScreenCards();

// switches to a specified screen for a given card
function switchPaginatorScreen(cardElem, screenIndex) {

    // get all the screens & indicators for a given card
    let screens = cardElem.getElementsByClassName("card-screen");
    let indicators = cardElem.getElementsByClassName("pagination-indicator");

    // remove "card-screen-current" class from all screens in given card
    for (let i = 0; i < screens.length; i++) {
        screens[i].classList.remove("card-screen-current");
    }

    // remove "pagination-indicator-current" class from all indicators in given card
    for (let i = 0; i < indicators.length; i++) {
        indicators[i].classList.remove("pagination-indicator-current");
    }

    // add screen & indicator classes to the specified elements in the given card
    screens[screenIndex].classList.add("card-screen-current");
    indicators[screenIndex].classList.add("pagination-indicator-current");
}

// constructs a new paginator with the correct number of indicators
function buildPaginator(screensNumber) {

    // clone the paginator component, access its children
    let newPaginator = paginatorBoilerplate.cloneNode(true);
    let newPaginatorIndicatorsContainer = newPaginator.getElementsByClassName("pagination-indicators-container")[0];
    let newPaginatorIndicator = newPaginator.getElementsByClassName("pagination-indicator")[1];

    // add a new indicator to our newly cloned paginator until the
    // number of indicators matches the number of specified screens
    while (newPaginatorIndicatorsContainer.children.length !== screensNumber) {
        newPaginatorIndicatorsContainer.appendChild(newPaginatorIndicator.cloneNode(true));
    }

    // return the new paginator
    return newPaginator;
}
