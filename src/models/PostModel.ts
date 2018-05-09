import * as Sequelize from 'sequelize';
import { BaseModelInterface } from '../Interfaces/BaseModelInterface';
import { ModelsInterface } from '../Interfaces/ModelsInterface';

export interface PostAttributes {
  id?: number;
  title?: string;
  content?: string;
  author?: string;
  photo?: string;
  createdAt?: string;
  updatedAt?: string;
}


export interface PostIntance extends Sequelize.Instance<PostAttributes> { }

export interface PostModel extends BaseModelInterface,
  Sequelize.Model<PostIntance, PostAttributes> { }


export default (sequelize: Sequelize.Sequelize, dataTypes: Sequelize.DataTypes): PostModel => {
  const post: PostModel = sequelize.define('Post', {
    id: {
      type: dataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    title: {
      type: dataTypes.STRING,
      allowNull: false,
    },
    content: {
      type: dataTypes.TEXT,
      allowNull: false,
    },
    photo: {
      type: dataTypes.BLOB({
        length: 'long',
      }),
      allowNull: false,
    },
  },
    // tslint:disable-next-line:align
    {
      tableName: 'posts',
    });

  post.associate = (models: ModelsInterface): void => {
    post.belongsTo(models.User, {
      foreignKey: {
        allowNull: false,
        field: 'author',
        name: 'author',
      },
    });
  };

  return post;
};
