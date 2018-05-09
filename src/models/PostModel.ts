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


export default (sequelize: Sequelize.Sequelize, DataTypes: Sequelize.DataTypes): PostModel => {
  const Post: PostModel = sequelize.define('Post', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    photo: {
      type: DataTypes.BLOB({
        length: 'long',
      }),
      allowNull: false,
    },
  },
    // tslint:disable-next-line:align
    {
      tableName: 'posts',
    });

  Post.associate = (models: ModelsInterface): void => {
    Post.belongsTo(models.User, {
      foreignKey: {
        allowNull: false,
        field: 'author',
        name: 'author',
      },
    });
  };

  return Post;
};
