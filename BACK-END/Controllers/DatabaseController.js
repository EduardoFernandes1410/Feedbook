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
};

module.exports = DatabaseController;