// Facade functions will be called in GLOBAL for event handling

//
//  ADD BIRD IMAGE LATER
//  ADD GENDER IMAGE LATER
//

// Ideas for implementing feeding
/*
    - racing costs 5 hunger
    - breeding costs 5 hunger

    - if hunger to low to race/breed
        - bird will not appear in select list

    - restore hunger with feed button in modifyPage
        - costs 5 coins
        - hunger fully restored
*/

/*
    Weird select list bug
        - replaced all select lists with list views
            - displays stats which is actually very useful when selecting birds for actions
*/

// Display current balance
    // When certain pages are shown (coop, modify, race, breed, sell)
function showBalance(){
    var options = [1];

    function callback(tx, results){
        var row = results.rows[0];
        var currentBalance = row['balance'];

        document.getElementById("coopBalance").innerHTML = "Coins: " + currentBalance;
        document.getElementById("modifyBalance").innerHTML = "Coins: " + currentBalance;
        document.getElementById("raceBalance").innerHTML = "Coins: " + currentBalance;
        document.getElementById("breedBalance").innerHTML = "Coins: " + currentBalance;
        document.getElementById("femaleBalance").innerHTML = "Coins: " + currentBalance;
        document.getElementById("sellBalance").innerHTML = "Coins: " + currentBalance;
    }
    Bank.select(options, callback);
}

// Display list of birds
function showCoop(){
    var options = [];

    function callback(tx, results){
        var htmlCode = "";

        // Cycle through entire list of birds
        for(var i=0; i < results.rows.length; i++){
            var row = results.rows[i];

            // Print bird info in console
            console.info("ID : " + row['id']);
            console.info("Name : " + row['name']);
            console.info("Speed : " + row['speed']);
            console.info("Stamina : " + row['stamina']);
            console.info("Colour : " + row['colour']);
            var colour = row['colour'];

            // Create listview item for bird
                // These are clickable
            htmlCode += "<li>";
            htmlCode += "<a data-role='button' data-row-id=" + row['id'] + " href='#'>";

            if (colour == 1){
                htmlCode += "<img src='./img/bird1.png' height='100' width='100' />";
            } else {
                htmlCode += "<img src='./img/bird2.png' height='100' width='100' />";
            }

            htmlCode += "<h1>" + row['name'] + "</h1>" +
                "<p>Hunger: " + row['hunger'] + "/10</p>" +
                "</a>" +
                "</li>";
        }

        var lv = $("#lvMyBirds");
        lv = lv.html(htmlCode);
        lv.listview("refresh");

        function clickHandler() {
            localStorage.setItem("id", $(this).attr("data-row-id"));
            $(location).prop('href', '#modifyPage');
        }

        $("#lvMyBirds a").on("click", clickHandler);
    }
    Bird.selectAll(options, callback);
}

// Display selected birds' stats
function showSelectedBird(){
    var id = localStorage.getItem("id");
    console.info(id);
    var options = [id];

    function callback(tx, results){
        var row = results.rows[0];

        console.info("ID: " + row['id']);
        console.info("Name: " + row['name']);
        var name = row['name'];
        var gender = row['gender'];
        var hunger = row['hunger'];
        var speed = row['speed'];
        var stamina = row['stamina'];
        var colour = row['colour'];

        // Save hunger for feed validation
        localStorage.setItem("hunger", hunger);

        // Create listview item for current bird
            // This is non-clickable
        // Display name
        document.getElementById("myBirdName").innerHTML = name + "s' Stats";

        if (gender == "male"){
            document.getElementById("myBirdGender").src = "img/male.png"
        } else {
            document.getElementById("myBirdGender").src = "img/female.png"
        }

        // Display image & stats
        if (colour == 1){
            document.getElementById("myBirdImg").src = "img/bird1.png"
        } else {
            document.getElementById("myBirdImg").src = "img/bird2.png"
        }

        document.getElementById("myBirdHunger").innerHTML = "Hunger: " + hunger + "/10";
        document.getElementById("myBirdSpeed").innerHTML = "Speed: " + speed;
        document.getElementById("myBirdStamina").innerHTML = "Stamina: " + stamina;

        // Display name in edit box
        $("#txtNameModify").val(name);
    }
    Bird.select(options, callback);
}

// Update bird
function updateBird(){

    // Check validations
    if (validate_frmBirdModify()){
        console.info("Validation successful");

        var name = $("#txtNameModify").val();
        var id = localStorage.getItem("id");

        var options = [name, id];

        function callback(){
            console.info("Success: Record updated successfully");
        }

        Bird.update(options, callback);

        $(location).prop('href', '#coopPage');
    }
    else{
        console.info("Validation failed");
    }
}

// Display list of rivals
    // When racePage is shown
function showRivals(){
    var options = [];

    function callback(tx, results){
        var htmlCode = "";

        // Cycle through entire list of rivals
        for(var i=0; i < results.rows.length; i++){
            var row = results.rows[i];

            // Print rival data in console
            console.info("ID : " + row['id']);
            console.info("Name : " + row['name']);
            console.info("Speed : " + row['speed']);
            console.info("Stamina : " + row['stamina']);
            console.info("Colour : " + row['colour']);
            var colour = row['colour'];

            // Create listview item for current rival
                // These are non-clickable
                // Add bird image later !!
            htmlCode += "<li>";

            if (colour == 1){
                htmlCode += "<img src='./img/bird1.png' height='100' width='100' />";
            } else {
                htmlCode += "<img src='./img/bird2.png' height='100' width='100' />";
            }

            htmlCode += "<h1>Name: " + row['name'] + "</h1>" +
                "<p>Speed: " + row['speed'] + "</p>" +
                "<p>Stamina: " + row['stamina'] + "</p>" +
                "</a>" +
                "</li>";
        }
        htmlCode += "<p />";

        var lv = $("#lvRivalBirds");
        lv = lv.html(htmlCode);
        lv.listview("refresh");
    }

    Rival.selectAll(options, callback);
}

// Show bird LIST VIEW
function showBirdSelect(){

    var options = [];

    function callback(tx, results){
        var htmlCode = "";

        // Cycle through entire list of rivals
        for(var i=0; i < results.rows.length; i++){
            var row = results.rows[i];

            // Print rival data in console
            console.info("ID : " + row['id']);
            console.info("Name : " + row['name']);
            console.info("Speed : " + row['speed']);
            console.info("Stamina : " + row['stamina']);
            console.info("Colour : " + row['colour']);
            var hunger = row['hunger'];
            var colour = row['colour'];

            if (hunger != 0){
                // Create listview item for available racers
                // These are clickable
                htmlCode += "<li>";
                htmlCode += "<a data-role='button' data-row-id=" + row['id'] + " href='#'>";

                if (colour == 1){
                    htmlCode += "<img src='./img/bird1.png' height='100' width='100' />";
                } else {
                    htmlCode += "<img src='./img/bird2.png' height='100' width='100' />";
                }

                htmlCode += "<h1>" + row['name'] + "</h1>" +
                    "<p>Speed: " + row['speed'] + "</p>" +
                    "<p>Stamina: " + row['stamina'] + "</p>" +
                    "</a>" +
                    "</li>";
            }
        }
        htmlCode += "<p />";

        var lv = $("#lvRaceBirds");
        lv = lv.html(htmlCode);
        lv.listview("refresh");

        function clickHandler() {
            localStorage.setItem("id", $(this).attr("data-row-id"));
            calculateRace();
        }

        $("#lvRaceBirds a").on("click", clickHandler);
    }

    Bird.selectAll(options, callback);
}

// Calculate racing results
function calculateRace(){

    //var select = document.getElementById("selectRace");
    //var birdID = select.options[select.selectedIndex].value;
    var birdID = localStorage.getItem("id");

    var options = [birdID];

    var birdName;
    var birdSpeed;
    var birdStamina;
    var currentBalance = 0;
    var earnings = 0;

    console.info("Selected birds' stats");

    // Retrieve selected birds' information
    function callBackBird(tx, results) {
        var row = results.rows[0];

        birdName = row['name'];
        birdSpeed = row['speed'];
        birdStamina = row['stamina'];
    }
    Bird.select(options, callBackBird);

    options = [];

    // Retrieve all rival birds' information
    function callBackRivals(tx, results) {

        var birdsDefeated = 0;
        var placement;
        var totalRacers = results.rows.length + 1;

        for(var i=0; i < results.rows.length; i++){
            var row = results.rows[i];

            // Rival bird stats
            var rivalName = row['name'];
            var rivalSpeed = row['speed'];
            var rivalStamina = row['stamina'];

            // Compare stats
            if (birdSpeed > rivalSpeed
                && birdStamina > rivalStamina){
                console.info(rivalName + " defeated");
                birdsDefeated ++;
            }
            else if (birdSpeed == rivalSpeed
                && birdStamina > rivalStamina){
                console.info(rivalName + " defeated");
                birdsDefeated ++;
            }
            else if (birdSpeed > rivalSpeed
                && birdStamina == rivalStamina){
                console.info(rivalName + " defeated");
                birdsDefeated ++;
            }
            else if (birdSpeed == rivalSpeed
                && birdStamina == rivalStamina){
                var randomWinner = Math.floor(Math.random() * 2);
                console.info("Random winner #: " + randomWinner);

                if (randomWinner == 1){
                    console.info(rivalName + " defeated");
                    birdsDefeated ++;
                } else {
                    // myBird loses
                    console.info("Lost to " + rivalName);
                }
            }
            else {
                // myBird loses
                console.info("Lost to " + rivalName);
            }
        }

        placement = totalRacers - birdsDefeated;
        console.info("myBird finished in spot # " + placement);

        // Calculate earnings
        if (placement == 1){
            earnings = 25;
        }
        else if (placement == 2){
            earnings = 10;
        }
        else if (placement < 6){
            earnings = 5;
        }
        else {
            earnings = 0;
        }

        // Save results to localStorage
        localStorage.setItem("Bird", birdName);
        localStorage.setItem("Placement", placement);
        localStorage.setItem("Earnings", earnings);
    }
    Rival.selectAll(options, callBackRivals);

    // Select current balance
    function callBackBank(tx, results){
        var row = results.rows[0];

        // Add current balance & earnings to update the accounts' balance
        currentBalance = row['balance'];
        currentBalance += earnings;
        options = [currentBalance, 1];

        function callbackBalance() {
            console.info("Success: Bank balance updated successfully");
        }
        Bank.update(options, callbackBalance);
    }

    options = [1];
    Bank.select(options, callBackBank);

    localStorage.setItem("id", birdID);
    reduceHunger();

    $(location).prop('href', '#resultsPage');
}

// Display race results
function showResults() {

    // Get race results
    var birdName = localStorage.getItem("Bird");
    var placement = localStorage.getItem("Placement");
    var earnings = localStorage.getItem("Earnings");

    // Display results in h3/h5 tags
    document.getElementById("h3Results").innerHTML = birdName + " finished in spot # " + placement;
    document.getElementById("h5Results").innerHTML = "You eanred " + earnings + " coins!";

    // Clean localStorage
    localStorage.clear();
}

// Display birds to sell
function showSellSelect(){
    var options = [];

    function callback(tx, results){
        var htmlCode = "";

        // Cycle through entire list of rivals
        for(var i=0; i < results.rows.length; i++){
            var row = results.rows[i];

            // Print rival data in console
            console.info("ID : " + row['id']);
            console.info("Name : " + row['name']);
            console.info("Speed : " + row['speed']);
            console.info("Stamina : " + row['stamina']);
            console.info("Colour : " + row['colour']);
            var hunger = row['hunger'];
            var colour = row['colour'];

            // Create listview item for sell birds
            // These are clickable
            htmlCode += "<li>";
            htmlCode += "<a data-role='button' data-row-id=" + row['id'] + " href='#'>";

            if (colour == 1){
                htmlCode += "<img src='./img/bird1.png' height='100' width='100' />";
            } else {
                htmlCode += "<img src='./img/bird2.png' height='100' width='100' />";
            }

            htmlCode += "<h1>" + row['name'] + "</h1>" +
                "<p>Speed: " + row['speed'] + "</p>" +
                "<p>Stamina: " + row['stamina'] + "</p>" +
                "</a>" +
                "</li>";
        }
        htmlCode += "<p />";

        var lv = $("#lvSellBirds");
        lv = lv.html(htmlCode);
        lv.listview("refresh");

        function clickHandler() {
            localStorage.setItem("id", $(this).attr("data-row-id"));
            sellBird();
        }

        $("#lvSellBirds a").on("click", clickHandler);
    }

    Bird.selectAll(options, callback);
}

// Sell a bird for coins
function sellBird(){
    //var select = document.getElementById("selectSell");
    //var birdID = select.options[select.selectedIndex].value;
    var birdID = localStorage.getItem("id");
    var birdSpeed;
    var birdStamina;
    var currentBalance = 0;
    var earnings = 0;

    var options = [birdID];

    // Retrieve selected birds' stats
    console.info("Selected birds' stats");
    function callBackBird(tx, results) {
        var row = results.rows[0];

        birdSpeed = row['speed'];
        birdStamina = row['stamina'];
        earnings = birdSpeed + birdStamina;
    }
    Bird.select(options, callBackBird);

    // Select current balance
    function callBackBank(tx, results){
        var row = results.rows[0];

        // Add current balance & earnings to update the accounts' balance
        currentBalance = row['balance'];
        currentBalance += earnings;
        options = [currentBalance, 1];

        function callbackBalance() {
            console.info("Success: Bank balance updated successfully");
        }
        Bank.update(options, callbackBalance);
    }

    options = [1];
    Bank.select(options, callBackBank);

    options = [birdID]
    function callbackDelete() {
        console.info("Success: Record deleted successfully");
        $(location).prop('href', '#coopPage');
    }
    Bird.delete(options, callbackDelete);

    $(location).prop('href', '#resultsPage');
}

function showMale() {

    var options = [];

    function callback(tx, results){
        var htmlCode = "";

        // Cycle through entire list of birds
        for(var i=0; i < results.rows.length; i++){
            var row = results.rows[i];

            // Print bird info in console
            console.info("ID : " + row['id']);
            console.info("Name : " + row['name']);
            console.info("Speed : " + row['speed']);
            console.info("Stamina : " + row['stamina']);
            console.info("Colour : " + row['colour']);
            var hunger = row['hunger'];
            var colour = row['colour'];

            if (hunger != 0){
                // Create listview item for bird
                // These are clickable
                htmlCode += "<li>";
                htmlCode += "<a data-role='button' data-row-id=" + row['id'] + " href='#'>";

                if (colour == 1){
                    htmlCode += "<img src='./img/bird1.png' height='100' width='100' />";
                } else {
                    htmlCode += "<img src='./img/bird2.png' height='100' width='100' />";
                }

                htmlCode += "<h1>" + row['name'] + "</h1>" +
                    "<p>Speed: " + row['speed'] + "</p>" +
                    "<p>Stamina: " + row['stamina'] + "</p>" +
                    "</a>" +
                    "</li>";
            }

            // Replace ID so that the last birds' ID is saved
            localStorage.setItem("lastMaleID", row['id']);
        }

        var lv = $("#lvMale");
        lv = lv.html(htmlCode);
        lv.listview("refresh");

        function clickHandler() {
            localStorage.setItem("fatherID", $(this).attr("data-row-id"));
            $(location).prop('href', '#femalePage');
        }

        $("#lvMale a").on("click", clickHandler);
    }
    Bird.selectMale(options, callback);
}

function showFemale() {

    var options = [];

    function callback(tx, results){
        var htmlCode = "";

        // Cycle through entire list of birds
        for(var i=0; i < results.rows.length; i++){
            var row = results.rows[i];

            // Print bird info in console
            console.info("ID : " + row['id']);
            console.info("Name : " + row['name']);
            console.info("Speed : " + row['speed']);
            console.info("Stamina : " + row['stamina']);
            console.info("Colour : " + row['colour']);
            var hunger = row['hunger'];
            var colour = row['colour'];

            if (hunger != 0){
                // Create listview item for bird
                // These are clickable
                htmlCode += "<li>";
                htmlCode += "<a data-role='button' data-row-id=" + row['id'] + " href='#'>";

                if (colour == 1){
                    htmlCode += "<img src='./img/bird1.png' height='100' width='100' />";
                } else {
                    htmlCode += "<img src='./img/bird2.png' height='100' width='100' />";
                }

                htmlCode += "<h1>" + row['name'] + "</h1>" +
                    "<p>Speed: " + row['speed'] + "</p>" +
                    "<p>Stamina: " + row['stamina'] + "</p>" +
                    "</a>" +
                    "</li>";
            }

            // Replace ID so that the last birds' ID is saved
            localStorage.setItem("lastFemaleID", row['id']);
        }

        var lv = $("#lvFemale");
        lv = lv.html(htmlCode);
        lv.listview("refresh");

        function clickHandler() {
            localStorage.setItem("motherID", $(this).attr("data-row-id"));
            //$(location).prop('href', '#femalePage');
            breedBird();
        }

        $("#lvFemale a").on("click", clickHandler);
    }
    Bird.selectFemale(options, callback);
}

// Breed a new bird
function breedBird(){
    var options = [];
    // Parents' stats
    var fatherSpeed = 0;
    var fatherStamina = 0;
    var motherSpeed = 0;
    var motherStamina = 0;
    // Baby stat potential
    var babyMinSpd = 0;
    var babyMinStm = 0;
    var babyMaxSpd = 0;
    var babyMaxStm = 0;
    // Baby stats
    var ID = 0;
    var name = "MyNewBird";
    var gender = "";
    var hunger = 0;
    var babySpeed = 0;
    var babyStamina = 0;
    var colour = 0;

    // Get father ID
    var fatherID = localStorage.getItem("fatherID");

    // Get mother ID
    var motherID = localStorage.getItem("motherID");

    // Generate ID
    var lastMaleID = localStorage.getItem("lastMaleID");
    var lastFemaleID = localStorage.getItem("lastFemaleID");

    if (lastMaleID > lastFemaleID){
        lastMaleID++;
        ID = lastMaleID;
    } else {
        lastFemaleID++;
        ID = lastFemaleID;
    }

    // Call reduce hunger for father
    localStorage.setItem("id", fatherID);
    reduceHunger();
    // Call reduce hunger for mother
    localStorage.setItem("id", motherID);
    reduceHunger();

    // Get father info
    options = [fatherID];
    console.info("Selected fathers' stats");
    function callBackFather(tx, results) {
        var row = results.rows[0];

        fatherSpeed = row['speed'];
        fatherStamina = row['stamina'];

        console.info("Father Spd " + fatherSpeed);
        console.info("Father Stm " + fatherStamina);

        // Get mother info
        options = [motherID];
        console.info("Selected mothers' stats");
        function callBackMother(tx, results) {
            var row = results.rows[0];

            motherSpeed = row['speed'];
            motherStamina = row['stamina'];

            console.info("Mother Spd " + motherSpeed);
            console.info("Mother Stm " + motherStamina);

            // Determine min and max values of babys' potential stats
            // Based on parents' stats
            // SPEED
            if (fatherSpeed > motherSpeed){
                fatherSpeed++;
                fatherSpeed++;

                babyMaxSpd = fatherSpeed;
                console.info("Babys' max speed potential: " + babyMaxSpd);
                motherSpeed--;

                babyMinSpd = motherSpeed;
                console.info("Babys' min speed potential: " + babyMinSpd);
            } else {
                motherSpeed++;
                motherSpeed++;

                babyMaxSpd = motherSpeed;
                console.info("Babys' max speed potential: " + babyMaxSpd);
                fatherSpeed--;

                babyMinSpd = fatherSpeed;
                console.info("Babys' min speed potential: " + babyMinSpd);
            }
            // STAMINA
            if (fatherStamina > motherStamina){
                fatherStamina++;
                fatherStamina++;

                babyMaxStm = fatherStamina;
                console.info("Babys' max stamina potential: " + babyMaxStm);
                motherStamina--;

                babyMinStm = motherStamina;
                console.info("Babys' min stamina potential: " + babyMinStm);
            } else {
                motherStamina++;
                motherStamina++;

                babyMaxStm = motherStamina;
                console.info("Babys' max stamina potential: " + babyMaxStm);
                fatherStamina--;

                babyMinStm = fatherStamina;
                console.info("Babys' min stamina potential: " + babyMinStm);
            }

            // Determine babys' actual stats
            // SPEED
            babySpeed = Math.floor(Math.random() * (babyMaxSpd - babyMinSpd + 1)) + babyMinSpd;
            console.info("Babys' speed: " + babySpeed);
            // STAMINA
            babyStamina = Math.floor(Math.random() * (babyMaxStm - babyMinStm + 1)) + babyMinStm;
            console.info("Babys' stamina: " + babyStamina);

            // Determine babys' gender
            var genderID = Math.floor(Math.random() * 2) + 1;
            console.info("GenderID: " + genderID);
            if (genderID == 1){
                gender = "male";
            } else {
                gender = "female";
            }
            console.info("Gender: " + gender);

            // Determine babys' colour
            colour = Math.floor(Math.random() * 2) + 1;
            console.info("ColourID: " + colour);

            // Create new bird
            options = [name, gender, hunger, babySpeed, babyStamina, colour];
            function callBackHatchling() {
                console.info("Success: Bird record inserted successfully");
            }
            Bird.insert(options, callBackHatchling);
        }

        Bird.select(options, callBackMother);
    }

    Bird.select(options, callBackFather);

    localStorage.setItem("id", ID);
    $(location).prop('href', '#coopPage');
}

// Reduce hunger
function reduceHunger(){

    var birdID = localStorage.getItem("id");
    var options = [birdID];
    var hunger = 0;

    function callbackBird(tx, results) {
        var row = results.rows[0];

        hunger = row['hunger'];

        console.info(hunger);

        if (hunger == 10){
            options = [5, birdID];
        } else {
            options = [0, birdID];
        }

        function callbackHunger() {
            console.info("Success: Record updated successfully");
        }
        Bird.updateHunger(options, callbackHunger);
    }

    Bird.select(options, callbackBird);
}

// Restore hunger
function restoreHunger() {

    var birdID = localStorage.getItem("id");
    var currentBalance = 0;
    var options = [10, birdID];

    function callbackHunger() {
        console.info("Success: Record updated successfully");
    }
    Bird.updateHunger(options, callbackHunger);

    // Select current balance
    function callBackBank(tx, results){
        var row = results.rows[0];

        // Add current balance & earnings to update the accounts' balance
        currentBalance = row['balance'];
        currentBalance = currentBalance - 5;
        options = [currentBalance, 1];

        function callbackBalance() {
            console.info("Success: Bank balance updated successfully");
        }
        Bank.update(options, callbackBalance);
    }

    options = [1];
    Bank.select(options, callBackBank);

    $(location).prop('href', '#coopPage');
}

