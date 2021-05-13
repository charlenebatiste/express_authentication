'use strict';
const bcrypt = require('bcrypt');
// can now use the bcrypt hashing package to hash out the password of a new user before it reaches the database (so the password will not be stored as a string in the db, it will be stored as a hash)

const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class user extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  user.init({
    name: {
      type: DataTypes.STRING,
      validate: {
        len: {
          args: [1,99],
          msg: 'Name must be between 1 and 99 characters' //what is returned is the input does not met the argument
        }
      }
    },
    email: {
      type: DataTypes.STRING,
      validate: {
          isEmail: { //will check if the string is an email (boolean check)
            msg: 'invalid email'
        }
      }
    },
      password: {
        type: DataTypes.STRING,
        validate: {
          len: {
            args: [8,99],
            msg: 'Passwords must be between 8 and 99 characters'
          }
        }
      }
  }, {
    sequelize,
    modelName: 'user',
  });
  // insert any functions needed before this model is created

  // Before a user is created, we are encrypting the password and using hash in its place
  user.addHook('beforeCreate', (pendingUser) => { // pendingUser is user object that gets passed to DB (addHook is grabbing the user from above)
    let hash = bcrypt.hashSync(pendingUser.password, 12) // will hash the password 12 times (NEVER CHANGE THIS NUMBER)
    pendingUser.password = hash; // this is the password that will go to the DB
  });

   // Check the password on Sign-In and compare it to the hashed password in the DB
  user.prototype.validPassword = function(typedPassword) {
    let isCorrectPassword = bcrypt.compareSync(typedPassword, this.password);

    return isCorrectPassword;
    // will return true or false
  }

    // function that, if someone tries to get data from database, can get model information but it will not include the password info in that return
    user.prototype.toJSON = function() {
      let userData = this.get(); //(.get()will only give raw data rather than previous data,etc...)
      delete userData.password; // it doesn't delete password from database
      
      return userData;
  }

  return user;
};