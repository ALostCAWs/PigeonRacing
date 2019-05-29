// BIRD
    // insert
    // delete
    // select
    // selectAll
    // update
    // updateHunger

// RIVAL
    // selectAll

// BANK
    // select
    // selectAll
    // update

var Bird = {
    insert: function(options,callBack){
        function txFunction(tx){
            var sql = "INSERT INTO birds(name, gender, hunger, speed, stamina, colour) VALUES(?, ?, ?, ?, ?, ?);";

            tx.executeSql(sql, options, callBack, errorHandler);
        }

        function successTransaction(){
            console.info("Success: Insert transaction successful");
        }
        db.transaction(txFunction, errorHandler, successTransaction);
    },
    delete: function(options,callBack){
        function txFunction(tx) {
            var sql = "DELETE FROM birds WHERE id=?;";
            tx.executeSql(sql, options, callBack, errorHandler);
        }

        function successTransaction() {
            console.info("Success: Delete transaction successful");
        }
        db.transaction(txFunction, errorHandler, successTransaction);
    },
    select: function(options,callBack){
        function txFunction(tx){
            var sql = "SELECT * FROM birds WHERE id=?;";
            tx.executeSql(sql, options, callBack, errorHandler);
        }

        function successTransaction() {
            console.info("Success: Select BIRD transaction successful");
        }
        db.transaction(txFunction, errorHandler, successTransaction);
    },
    selectAll: function(options,callBack){
        function txFuntion(tx){
            var sql = "SELECT * FROM birds;";
            tx.executeSql(sql, options, callBack, errorHandler);
        }

        function successTransaction(){
            console.info("Success: Select All BIRDS transaction successful");
        }
        db.transaction(txFuntion, errorHandler, successTransaction);
    },
    selectMale: function(options, callBack){
        function txFunction(tx){
            var sql = "SELECT * FROM birds WHERE gender='male';";
            tx.executeSql(sql, options, callBack, errorHandler);
        }

        function successTransaction() {
            console.info("Success: Select MALE BIRDS transaction successful");
        }
        db.transaction(txFunction, errorHandler, successTransaction);
    },
    selectFemale: function(options, callBack){
        function txFunction(tx){
            var sql = "SELECT * FROM birds WHERE gender='female';";
            tx.executeSql(sql, options, callBack, errorHandler);
        }

        function successTransaction() {
            console.info("Success: Select FEMALE BIRDS transaction successful");
        }
        db.transaction(txFunction, errorHandler, successTransaction);
    },
    update: function(options,callBack){
        function txFunction(tx){
            var sql = "UPDATE birds SET name=? WHERE id=?;";
            tx.executeSql(sql, options, callBack, errorHandler);
        }

        function successTransaction(){
            console.info("Success: Update transaction successful");
        }
        db.transaction(txFunction, errorHandler, successTransaction);
    },
    updateHunger: function(options,callBack){
        function txFunction(tx) {
            var sql = "UPDATE birds SET hunger=? WHERE id=?"
            tx.executeSql(sql, options, callBack, errorHandler);
        }

        function successTransaction(){
            console.info("Success: Update transaction successful");
        }
        db.transaction(txFunction, errorHandler, successTransaction);
    }
};

var Rival = {
    selectAll: function(options,callBack){
        function txFunction(tx){
            var sql = "SELECT * FROM rivals;";
            tx.executeSql(sql, options, callBack, errorHandler);
        }

        function successTransaction(){
            console.info("Success: Select All RIVALS transaction successful");
        }
        db.transaction(txFunction, errorHandler, successTransaction);
    }
};

var Bank = {
    select: function(options,callBack){
        function txFunction(tx){
            var sql = "SELECT * FROM bank WHERE id=?;";
            tx.executeSql(sql, options, callBack, errorHandler);
        }

        function successTransaction(){
            console.info("Success: Select transaction successful");
        }
        db.transaction(txFunction, errorHandler, successTransaction);
    },
    update: function(options,callBack){
        function txFunction(tx){
            var sql = "UPDATE bank SET balance=? WHERE id=?;";
            tx.executeSql(sql, options, callBack, errorHandler)
        }

        function successTransaction(){
            console.info("Success: Update transaction successful");
        }
        db.transaction(txFunction, errorHandler, successTransaction);
    }
};