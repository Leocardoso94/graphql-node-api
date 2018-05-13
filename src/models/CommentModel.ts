import * as Sequelize from 'sequelize';
import { BaseModelInterface } from '../Interfaces/BaseModelInterface';
import { ModelsInterface } from '../Interfaces/ModelsInterface';

export interface CommentAttributes {
  id?: number;
  comment?: string;
  post?: string;
  user?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface CommentInstance
  extends Sequelize.Instance<CommentAttributes> {}

export interface CommentModel
  extends BaseModelInterface,
    Sequelize.Model<CommentInstance, CommentAttributes> {}

export default (
  sequelize: Sequelize.Sequelize,
  dataTypes: Sequelize.DataTypes,
): CommentModel => {
  const comment: CommentModel = sequelize.define(
    'Comment',
    {
      id: {
        type: dataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
      },
      comment: {
        type: dataTypes.TEXT,
        allowNull: false,
      },
    },
    {
      tableName: 'comments',
    },
  );

  comment.associate = (models: ModelsInterface): void => {
    comment.belongsTo(models.Post, {
      foreignKey: {
        allowNull: false,
        field: 'post',
        name: 'post',
      },
    });

    comment.belongsTo(models.User, {
      foreignKey: {
        allowNull: false,
        field: 'user',
        name: 'user',
      },
    });
  };

  return comment;
};
