const mysql = require('mysql2')
const bcrypt = require('bcryptjs')

const USER_DATA_COLUMNS = 'user_id,user_name,user_surname,user_email,user_pwd'
const USER_ID_COLUMN = 'user_id'
const USER_TABLE = 'user_tb'

class User {
  constructor (id, name, surname, email, passwordHash, dbController = null) {
    this.id = id
    this.name = name
    this.surname = surname
    this.email = email
    this.pwdHash = passwordHash
    this.updated = false
    this.dbController = dbController
  }

  // Retrieves the data of user with the given id from the database, using the given controller
  static async getUserById (dbController, id) {
    const userData = await dbController.select(USER_TABLE, USER_DATA_COLUMNS, mysql.format('user_id=?', id))
    return new User(userData[0].user_id, userData[0].user_name, userData[0].user_surname, userData[0].user_email, userData[0].user_pwd, dbController)
  }

  // Retrieves the data of the user with the given email from the database, using the given controller
  static async getUserByEmail (dbController, email) {
    const userData = await dbController.select(USER_TABLE, USER_DATA_COLUMNS, mysql.format('user_email=?', email))
    return new User(userData[0].user_id, userData[0].user_name, userData[0].user_surname, userData[0].user_email, userData[0].user_pwd, dbController)
  }

  /*
        Adds an user with the given name, surname, email and password hash in the
        database, using the given controller. Returns a User object with
        the given data on success.
    */
  static async createNewUser (dbController, name, surname, email, password) {
    const passwordHash = await bcrypt.hash(password, 12)
    const newUser = new User(null, name, surname, email, passwordHash, dbController)
    await dbController.insert(USER_TABLE, [newUser.email, newUser.pwdHash, newUser.name, newUser.surname], 'user_email,user_pwd,user_name,user_surname')
    const id = await dbController.query('SELECT last_insert_id()')
    newUser.id = id[0]['last_insert_id()']
    return newUser
  }

  // Deletes the user with the given id of the database, using the given controller
  static async deleteUser (dbController, id) {
    await dbController.deleteEntry(USER_TABLE, USER_ID_COLUMN, id)
  }

  // Returns the unique identifier of the current user
  getId () {
    return this.id
  }

  /*
        Validates the password for the current user. Returns true if the
        given password matches with the current user's password and
        false otherwise.
    */
  validatePassword (password) {
    return bcrypt.compareSync(password, this.pwdHash)
  }

  // Gets the name of the current user
  getName () {
    return this.name
  }

  // Gets the surname of the current user
  getSurname () {
    return this.surname
  }

  // Gets the email of the current user
  getEmail () {
    return this.email
  }

  // Updates the current user's data on the database if any changes happened
  async saveUpdates () {
    if (this.updated) {
      await this.dbController.updateEntry(USER_TABLE, [USER_ID_COLUMN], [this.id], {
        user_name: this.name,
        user_surname: this.surname,
        user_email: this.email,
        user_pwd: this.pwdHash
      })
    }
  }

  // Updates the name of the current user with the given name (only on the object)
  changeName (newName) {
    this.updated = true
    this.name = newName
  }

  // Updates the surname of the current user with the given surname (only on the object)
  changeSurname (newSurname) {
    this.updated = true
    this.surname = newSurname
  }

  // Updates the email of the current user with the given email (only on the object)
  changeEmail (newEmail) {
    this.updated = true
    this.email = newEmail
  }

  // Updates the password (hash) of the current user with the given password (only on the object)
  changePassword (newPassword) {
    this.updated = true
    this.pwdHash = bcrypt.hashSync(newPassword, 12)
  }
}

module.exports = User
