import { Connection, DocumentQuery, Model, Schema } from 'mongoose';

export interface ApiServiceInterface {
  collection: string;
  modelName: string;
  connection: Connection;
  schema: Schema;
  model: Model<any>;

  create(
    docs: Array<{} | Object>,
    cb?: (err: any, res: any) => void
  ): Promise<any>;

  delete(
    id: string,
    conditions: Object,
    cb?: (err: any, res: any) => void
  ): void | any;

  find(
    conditions: Object,
    cb?: (err: any, res: Array<any>) => void
  ): DocumentQuery<Array<any>, any>;

  findById(
    id: string,
    conditions: Object,
    cb?: (err: any, res: any) => void
  ): DocumentQuery<any, any>;

  findOne(
    conditions: Object,
    cb?: (err: any, res: any) => void
  ): DocumentQuery<any, any>;

  update(
    id: string,
    conditions: Object,
    update: Object,
    cb?: (err: any, doc: any, res: any) => void
  ): DocumentQuery<any, any>;

  validate(
    doc: any,
    cb?: (err: any, res: any) => void
  ): any;

}
