// global dependencies
import { merge } from 'lodash';
import { ObjectID } from 'mongodb';
import { connect, Connection, Document, DocumentQuery, Model, Schema } from 'mongoose';
import * as validator from 'validator';
// local dependencies
import { ApiServiceInterface } from '../api-service.interface';
import { getMongoDbConnection } from '../../utils';
import {
  getSchema,
  UserDocument,
  UserInterface,
  UserPhoneDocument,
  UserPhoneInterface
} from './user.schema';
import {
  BaseCollection,
  BaseEntity,
  User,
  Users
} from './user.entity';
// (re)exports
export {
  ApiServiceInterface,
  BaseCollection,
  BaseEntity,
  getSchema,
  User,
  UserDocument,
  UserInterface,
  UserPhoneDocument,
  UserPhoneInterface,
  Users
};

/**
 * User Service
 *
 * Usage:
 *   const connection = connect('mongodb://localhost/test')
 *
 *   const users = new UserService(connection)
 *   users.create({ name: 'Kaiser Sosay' })
 *
 *   const beatles = new UserService(connection, 'Beatle', 'beatles')
 *   beatles.create({ name: 'John Lennon' })
 *
 * @param  {Connection}  connection
 * @param  {string='User'}        modelName
 * @param  {string='users'}       collection
 */
export class UserService implements ApiServiceInterface {

  private _collection = 'users';
  private _modelName = 'User';
  private _connection: Connection;
  private _schema: Schema;
  private _model: Model<UserDocument>;

  constructor(
    connection?: Connection | undefined,
    collection?: string,
    modelName?: string
  ) {
    this._connection = getMongoDbConnection(connection);
    if (collection) {
      this._collection = collection;
    }
    if (modelName) {
      this._modelName = modelName;
    }
    this._schema = getSchema(collection);
    this._model = this.connection.model<UserDocument>(this.modelName, this.schema);
  }

  get collection(): string {
    return this._collection;
  }

  get modelName(): string {
    return this._modelName;
  }

  get connection(): Connection {
    return this._connection;
  }

  get schema(): Schema {
    return this._schema;
  }

  get model(): Model<UserDocument> {
    return this._model;
  }

  clean(
    doc: any | UserInterface,
    cb?: (err: any, res: any | UserInterface) => void
  ): void {
    if (doc.name) {
      doc.name = validator.trim(doc.name);
    }
    cb(undefined, doc);
  }

  create(
    docs: Array<{} | Object>,
    cb?: (err: any, res: Array<{} | Object>) => void
  ): Promise<UserDocument[]> {
    return this.model.create(docs, (err, doc) => cb(err, docs));
  }

  delete(
    id: string,
    conditions: Object,
    cb?: (err: any, res: UserDocument) => void
  ): void {
    this.model.findOneAndRemove(
      merge(conditions, {
        _id: new ObjectID(id)
      }),
      (err, res) => cb(err, res)
    );
  }

  find(
    conditions: Object,
    cb?: (err: any, res: Array<UserDocument>) => void
  ): DocumentQuery<Array<UserDocument>, UserDocument> {
    return this.model.find(conditions, (err, res) => cb(err, res));
  }

  findById(
    id: string,
    conditions: Object,
    cb?: (err: any, res: UserDocument) => void
  ): DocumentQuery<UserDocument, UserDocument> {
    return this.model.findOne(
      merge(conditions, {
        _id: new ObjectID(id)
      }),
      (err, res) => cb(err, res)
    );
  }

  findOne(
    conditions: Object,
    cb?: (err: any, res: UserDocument) => void
  ): DocumentQuery<UserDocument, UserDocument> {
    return this.model.findOne(conditions, (err, res) => cb(err, res));
  }

  update(
    id: string,
    conditions: Object,
    update: Object,
    cb?: (err: any, doc: UserDocument, res: any) => void
  ): DocumentQuery<UserDocument, UserDocument> {
    return this.model.findOneAndUpdate(
      merge(conditions, {
        _id: new ObjectID(id)
      }),
      update,
      (err, doc, res) => cb(err, doc, res)
    );
  }

  validate(
    doc: any | UserInterface,
    cb?: (err: any, res: any | UserInterface) => void
  ): void {
    if (! doc.name || validator.isEmpty(doc.name)) {
      cb(new Error('Invalid input. Must provide a name.'), doc);
    } else if (! doc.email || ! validator.isEmail(doc.email)) {
      cb(new Error('Invalid input. Must provide a valid email address.'), doc);
    } else {
      cb(undefined, doc);
    }
  }

}
