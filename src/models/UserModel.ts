import * as Sequelize from 'sequelize';
import { genSaltSync, hashSync, compareSync } from 'bcryptjs';
import { BaseModelInterface } from '../Interfaces/BaseModelInterface';
import { ModelsInterface } from '../Interfaces/ModelsInterface';

export interface UserAttributes {
  id?: number;
  name?: string;
  email?: string;
  password?: string;
  photo?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface UserInstance extends Sequelize.Instance<UserAttributes>, UserAttributes {
  isPassword(encodedPassword: string, password: string): boolean;
}

export interface UserModel extends BaseModelInterface,
  Sequelize.Model<UserInstance, UserAttributes> { }


export default (sequelize: Sequelize.Sequelize, dataTypes: Sequelize.DataTypes): UserModel => {
  const user: UserModel = sequelize.define('User', {
    id: {
      type: dataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: dataTypes.STRING(128),
      allowNull: false,
    },
    email: {
      type: dataTypes.STRING(128),
      allowNull: false,
      unique: true,
    },
    password: {
      type: dataTypes.STRING(128),
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    photo: {
      type: dataTypes.BLOB({
        length: 'long',
      }),
      allowNull: true,
      defaultValue: null,
    },
  },
    // tslint:disable-next-line:align
    {
      tableName: 'users',
      hooks: {
        beforeCreate: (user: UserInstance, options: Sequelize.CreateOptions): void => {
          const salt = genSaltSync();
          user.password = hashSync(user.password, salt);
        },
        beforeUpdate: (user: UserInstance, options: Sequelize.CreateOptions): void => {
          if (user.changed('password')) {
            const salt = genSaltSync();
            user.password = hashSync(user.password, salt);
          }
        },
      },
    });

  user.associate = (models: ModelsInterface): void => { };

  user.prototype.isPassword =
    (encodedPassword: string, password: string): boolean => compareSync(password, encodedPassword);


  return user;
};
