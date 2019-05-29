// Error handling
// DB creation

// Table creation
    // rivals
        // id, name, speed, stamina, colour
    // birds
        // id, name, gender, hunger, speed, stamina, colour
    // bank
        // id, balance

// Drop tables
    // rivals
    // birds
    // bank

function errorHandler (tx, error){
    console.log("SQL error: " + tx + " (" + error.code + ") " + error.message);
}

var db;
var DB = {

    createDatabase: function(){

        var shortName = "BirdsDB";
        var version = "1.0";
        var displayName = "DB for Pigeon Racing Application";
        var dbSize = 2 * 1024 * 1024;

        function dbCreateSuccess(){
            console.info("Success: DB created successfully.");
        }

        db = openDatabase(shortName, version, displayName, dbSize, dbCreateSuccess);
    },
    createTables: function(){

        function txFunxtion(tx) {

            var options = [];

            // Drop rivals table
            var dropRivalSQL = "DROP TABLE IF EXISTS rivals;";

            function successDropRival(){
                console.info("Success: Dropping table rivals successfully");
            }

            tx.executeSql(dropRivalSQL, options, successDropRival, errorHandler);

            // Drop birds table
            var dropBirdSQL = "DROP TABLE IF EXISTS birds;";

            function successDropBird(){
                console.info("Success: Dropping table birds successfully");
            }

            tx.executeSql(dropBirdSQL, options, successDropBird, errorHandler);

            // Drop bank table
            var dropBankSQL = "DROP TABLE IF EXISTS bank;";

            function successDropBank(){
                console.info("Success: Dropping table bank successfully");
            }

            tx.executeSql(dropBankSQL, options, successDropBank, errorHandler);

            // Create rivals table
            var rivalSQL = "CREATE TABLE IF NOT EXISTS rivals(" +
                "id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT," +
                "name VARCHAR(20) NOT NULL," +
                "speed INTEGER NOT NULL," +
                "stamina INTEGER NOT NULL," +
                "colour INTEGER NOT NULL);";

            function successCreateRival() {
                console.info("Success: Created table rivals successfully");
            }

            tx.executeSql(rivalSQL, options, successCreateRival, errorHandler);

            // Populate table rival
            var insertSQL1 = "INSERT INTO rivals(name, speed, stamina, colour) VALUES('Delta', 5, 4, 1);";
            var insertSQL2 = "INSERT INTO rivals(name, speed, stamina, colour) VALUES('Alpha', 7, 5, 2);";

            function successRivalInsert(){
                console.info("Success: Row inserted into rivals successfully");
            }

            tx.executeSql(insertSQL1, options, successRivalInsert, errorHandler);
            tx.executeSql(insertSQL2, options, successRivalInsert, errorHandler);

            // Create table birds
            var birdSQL = "CREATE TABLE IF NOT EXISTS birds(" +
                "id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT," +
                "name VARCHAR(20) NOT NULL," +
                "gender VARCHAR(6) NOT NULL," +
                "hunger INTEGER NOT NULL," +
                "speed INTEGER NOT NULL," +
                "stamina INTEGER NOT NULL," +
                "colour INTEGER NOT NULL);";

            function successCreateBird() {
                console.info("Success: Created table birds successfully");
            }

            tx.executeSql(birdSQL, options, successCreateBird, errorHandler);

            // Populate birds table with two starter birds
            var maleSQL = "INSERT INTO birds(name, gender, hunger, speed, stamina, colour) VALUES('MyBirdM', 'male', 10, 4, 5, 1);";
            var femaleSQL = "INSERT INTO birds(name, gender, hunger, speed, stamina, colour) VALUES('MyBirdF', 'female', 10, 5, 4, 2);";

            function successBirdInsert(){
                console.info("Success: Row inserted into birds successfully");
            }

            tx.executeSql(maleSQL, options, successBirdInsert, errorHandler);
            tx.executeSql(femaleSQL, options, successBirdInsert, errorHandler);

            // Create bank table
            var bankSQL = "CREATE TABLE IF NOT EXISTS bank(" +
                "id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT," +
                "balance INTEGER NOT NULL);";

            function successCreateBank() {
                console.info("Success: Created table bank successfully");
            }

            tx.executeSql(bankSQL, options, successCreateBank, errorHandler);

            // Populate bank with starting balance of 25 coins
            var balanceSQL = "INSERT INTO bank(balance) VALUES(25);";

            function successBankInsert(){
                console.info("Success: Starting blance inserted successfully");
            }

            tx.executeSql(balanceSQL, options, successBankInsert, errorHandler);
        }

        function successCreate() {
            console.info("Tables created successfully");
        }

        db.transaction(txFunxtion, errorHandler, successCreate);
    },
    dropTables: function (){

        function txFunction(tx){

            var dropRival = "DROP TABLE rivals";
            var options = [];

            function successDrop() {
                console.info("Success: Dropping table successfully");
            }

            tx.executeSql(dropRival, options, successDrop, errorHandler);

            var dropBird = "DROP TABLE birds";

            tx.executeSql(dropBird, options, successDrop, errorHandler);

            var dropBank = "DROP TABLE bank";

            tx.executeSql(dropBank, options, successDrop, errorHandler);
        }

        function successTransaction(){
            console.info("Success: Dropped tables transaction successful");
        }

        db.transaction(txFunction, errorHandler, successTransaction);
    }
};