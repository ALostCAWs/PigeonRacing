// All event handlers will call FACADE functions
    // On pageshow
// COOP
function coopPage_show() {
    console.info("Now viewing: COOP");

    showBalance();
    showCoop();
}
// MODIFY
function modifyPage_show() {
    console.info("Now viewing: MODIFY");

    showBalance();
    showSelectedBird();
}
// RACE
function racePage_show() {
    console.info("Now viewing: RACE");

    showBalance();
    showRivals();
    showBirdSelect();
}
// RESULTS
function resultsPage_show() {
    console.info("Now viewing: RESULTS");

    showResults();
}
// BREED
function breedPage_show() {
    console.info("Now viewing: BREED");

    showBalance();
    showMale();

}
// FEMALE
function femalePage_show() {
    console.info("Now viewing: BREED");

    showBalance();
    showFemale();
}

// SELL
function sellPage_show() {
    console.info("Now viewing: SELL");

    showBalance();
    showSellSelect();
}


    // On click
// UPDATE
function btnUpdate_click() {
    console.info("Clicked: SAVE CHANGES");

    updateBird();
}
// FEED
function btnFeed_click() {
    console.info("Clicked: FEED");

    feedValidation();
    showBalance();
}
// BACK
function btnBack_click() {
    console.info("Clicked: RETURN TO COOP");

    $(location).prop('href', '#coopPage');
}

function init(){
    console.info("DOM is ready");

    // On pageshow
    $("#coopPage").on("pageshow", coopPage_show);
    $("#modifyPage").on("pageshow", modifyPage_show);
    $("#racePage").on("pageshow", racePage_show);
    $("#resultsPage").on("pageshow", resultsPage_show);
    $("#breedPage").on("pageshow", breedPage_show);
    $("#femalePage").on("pageshow", femalePage_show);
    $("#sellPage").on("pageshow", sellPage_show);

    // On click
    $("#btnUpdate").on("click", btnUpdate_click);
    $("#btnFeed").on("click", btnFeed_click);
    $("#btnBack").on("click", btnBack_click);
}

function initDB(){
    try{
        DB.createDatabase();
        if(db){
            console.info("Creating Tables. . .");
            DB.createTables();
        } else {
            console.error("Error: Cannot create DB. Cannot proceed.");
        }
    } catch(e) {
        console.error("Error: (Fatal) Error in initDB(). Cannot proceed.");
    }
}

$(document).ready(function () {
   init();
   initDB();
   showBalance();
   showCoop();
});