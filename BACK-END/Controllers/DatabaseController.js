const mysql = require("mysql2/promise");

class DatabaseController{
    // Creates a new DatabaseController with the given configuration
    constructor(host = "localhost", port = 3306, user = "root", password = "", defaultDatabase = ""){
        this.host = host;
        this.port = port;
        this.user = user;
        this.password = password;
        this.selectedDatabase = defaultDatabase;
        this.connected = false; 
        this.connection = null;
    }

    // Change the login credentials for the current database
    changeUser(user, password){
        this.user = user;
        this.password = password;
        if(this.connected){
            try{
                this.connection.changeUser({
                    user: this.user,
                    password: this.password
                });
            }catch(error){
                console.error("Failed to switch the database user!");
                console.error("The database server returned an error message: ", error);
                this.connected = false;
            }
        }
    }

    // Change the selected database
    changeDatabase(newDatabase){
        this.selectedDatabase = newDatabase;
        if(this.connected){
            try{
                this.connection.changeUser({database: newDatabase});
            }catch(error){
                console.error(`Failed select the database ${newDatabase}!`);
                console.error("The database server returned an error message: ", error);
                this.connected = false;
            }
        }
    }
    
    // Starts a connection with the database server
    async connect(){
        if(!this.connected){
            try{
                this.connection = await mysql.createConnection({
                    host: this.host,
                    port: this.port,
                    user: this.user,
                    password: this.password,
                    database: this.selectedDatabase
                });
            }catch(error){
                console.error("A connection with the database server could not be established!")
                console.error("The server returned an error: ", error);
            }
            this.connected = true;
        }
    }

    // Get the connection status: "true" means connected and "false" means disconnected
    isConnected(){
        return this.connected;
    }

    // End the connection with the database server
    async disconnect(){
        if(this.connected){
            try{
                await this.connection.end();
            }catch(error){
                console.error("The connection with the database server could not be stopped gracefully!\nEnding the connection abruptly...");
                this.connection.destroy(); 
            }
        }
    }

    /*
        Shortcut to a select query. Retrieves data from the table whose 
        name is given, limiting to the columns given (as a comma separated list of 
        names) and filtering by the given condition (expressed as a string).
        If no columns specified, returns all columns and if no condition specified,
        returns all data. The table and columns parameters are escaped,
        but the CONDITION IS NOT ESCAPED, so pre-escaping is needed in this case.
    */
   async select(table, columns = '', condition = ''){
        let query = 'SELECT ';
        if(columns !== ''){
            const columnList = columns.split(',');
            let escapedColumns = '';
            for(let i = 0; i < columnList.length - 1; i++){
                escapedColumns += `${mysql.escapeId(columnList[i])},`;
            }
            escapedColumns += mysql.escapeId(columnList[columnList.length - 1]);
            query += escapedColumns + ' ';
        }else{
            query += '* ';
        }
        query += `FROM ${this.connection.escapeId(table)}`;
        if(condition !== ''){
            query += ` WHERE ${condition};`;
        }else{
            query += ';';
        }
        return await this.query(query);
   }

   /*
        Shortcut to a INSERT query. Adds the values of a given array
        (with one or two dimensions) with the new entry's data to 
        the specified table on the given fields. If no fields given, 
        adds the data on all table columns, following the table's column 
        order.
   */
   async insert(table, values, fields = ''){
        let query = `INSERT INTO ${this.connection.escapeId(table)} `;
        if(fields !== ''){
            const fieldList = fields.split(',');
            let escapedFields = '';
            for(let i = 0; i < fieldList.length - 1; i++){
                escapedFields += `${this.connection.escapeId(fieldList[i])},`;
            }
            escapedFields += this.connection.escapeId(fieldList[fieldList.length-1]);
            query += `(${escapedFields}) VALUE`;
        }else{
            query += 'VALUE';
        }
        let columns;
        if(!Array.isArray(values)){
            console.error("A malformed input was given to the insert query!");
            console.error(`Data of type ${typeof(values)} received instead of the expected Array!`);
            throw new Error("Invalid input given to the insert query!");
        }
        if(Array.isArray(values[0])){
            query += 'S ';
            columns = values[0].length;
            for(const value of values){
                if(!Array.isArray(value) || value.length !== columns){
                    console.error("A malformed input was given to the insert query!");
                    console.error(`Entries of ${columns} columns expected, but an entry of ${value.length} columns encountered!`);
                    throw new Error("Invalid input given to the insert query!");
                }
                query += '(';
                for(let i = 0; i < columns - 1; i++){
                    query += `${this.connection.escape(value[i])},`;
                }
                query += `${this.connection.escape(value[columns-1])}),`;
            } 
            query[query.length - 1] = ';';
        }else{
            query += ' (';
            columns = values.length;
            for(let i = 0; i < columns - 1; i++){
                query += `${this.connection.escape(values[i])},`;
            }
            query += `${this.connection.escape(values[columns-1])});`;
        }
        return await this.query(query);
   }

   // Deletes the entry whose id's value and column name are specified from the specified table
   async deleteEntry(table, idColumnName, idValue){
       return await this.query('DELETE FROM ?? WHERE ??=?',[table,idColumnName,idValue]);
   }
   /*
        Updates the entry whose id's value and column name are specified with 
        the new values that are given as a object following the 
        "columnName: newValue" format, on the specified table. 
   */
   async updateEntry(table, idColumnName, idValue, newValues){
        let query = `UPDATE ${this.connection.escape(table)} SET `;
        for(const column of newValues){
            query += `${this.connection.escape(column)}=${this.connection.escape(newValues[column])},`
        }
        query[query.length - 1] = ' ';
        query += `WHERE ${this.connection.escape(idColumnName)}=${this.connection.escape(idValue)};`;
        return await this.query(query);
    }

    /*
        Executes the given SQL query string on the database with the
        given input data. The input data is used to replace placeholders
        on the query string, on the same order that they are given.
        A placeholder is represented by a "?", if it represents data, 
        or by "??", if it represents a identifier. The results,
        if any, are returned as an array of .json objects representing 
        each entry returned.
    */ 
    async query(sqlQuery, inputData = []){
        try{
            const [rows, fields] = await this.connection.query(sqlQuery, inputData);
        }catch(error){
            console.error(`The execution of the query "${sqlQuery}" failed!`);
            console.error("The database server returned an error: ", error);
            throw error;
        }
        return rows;
    }
};

module.exports = DatabaseController;