const mysql = require('mysql2');

const USER_DATA_COLUMNS = 'user_id,user_name,user_email,user_pwd';
const USER_TABLE = 'user_tb';

class User{
    constructor(id, name, email, passwordHash, dbController = null){
        this.id = id;
        this.name = name;
        this.email = email;
        this.pwdHash = passwordHash;
        this.dbController = dbController;
    }

    // Retrieves the data of user with the given id from the database, using the given controller
    static async getUserById(dbController, id){
        const userData = await dbController.select(USER_TABLE, USER_DATA_COLUMNS, mysql.format('user_id=?',id));
        return new User(userData[0].user_id, userData[0].user_name, userData[0].user_email, userData[0].user_pwd, dbController);
    }

    // Retrieves the data of the user with the given email from the database, using the given controller
    static async getUserByEmail(dbController, email){
        const userData = await dbController.select(USER_TABLE, USER_DATA_COLUMNS, mysql.format('user_email=?',email));
        return new User(userData[0].user_id, userData[0].user_name, userData[0].user_email, userData[0].user_pwd, dbController);
    }

    // Adds an user with the given name, email and password hash in the database, using the given controller
    static async createNewUser(dbController, name, email, passwordHash){
        let newUser = new User(null, name, email, passwordHash, dbController);
        await dbController.insert(USER_TABLE, [newUser.email, newUser.pwdHash, newUser.name], "user_email,user_pwd,user_name");
        const id = await dbController.query("SELECT last_insert_id()");
        newUser.id = id[0]['last_insert_id()'];
        return newUser
    }

    // Returns the unique identifier of the current user
    getId(){
        return this.id;
    }

}

module.exports = User;