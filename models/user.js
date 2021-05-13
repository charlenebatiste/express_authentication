'use strict';
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
        lens: {
          args: [1,99],
          msg: 'Name must be between 1 and 99 characters' //what is returned is the input does not met the argument
        }
      }
    },
    email: {
      type: DataTypes.STRING,
      validate: {
        lens: {
          isEmail: { //will check if the string is an email (boolean check)
            msg: 'invalid email'
          }
        }
      }
    },
      password: {
        type: DataTypes.STRING,
        validate: {
          lens: {
            args: [8,99],
            msg: 'Passwords must be between 8 and 99 characters'
          }
        }
      }
  }, {
    sequelize,
    modelName: 'user',
  });
  return user;
};