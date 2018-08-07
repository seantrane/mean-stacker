// global dependencies
import { NextFunction, Request, Response, Router } from 'express';
import { upperFirst } from 'lodash';
import { ObjectID } from 'mongodb';
// local dependencies
import {
  errorHandler,
  JsonApiResponse,
  UserInterface,
  UserPhoneInterface,
  UserService
} from '../../../services/user';
// (re)exports
export {
  UserInterface,
  UserPhoneInterface,
  UserService
};

/**
 * User Controller
 *
 * Controller functions handle requests and responses.
 */
export class UserController {

  private service: UserService;

  constructor() {
    this.service = new UserService();
  }

  find(req: Request, res: Response): void {
    this.service.find(req.params || {}, (err, docs) => {
      if (err) {
        errorHandler(
          res, err.message, `Failed to get ${upperFirst(this.service.collection) || 'documents'}`, 404
        );
      } else {
        res.status(200).json(new JsonApiResponse({
          data: docs,
          meta: {
            status: 'success',
            message: `Found ${upperFirst(this.service.collection) || 'documents'}`,
            params: req.params
          }
        }));
      }
    });
  }

  create(req: Request, res: Response): void {
    const obj = req.body;
    // validate object
    this.service.validate(obj, (err, doc) => {
      if (err) {
        errorHandler(res, err.message, `Failed to validate ${this.service.modelName || 'document'}`, doc);
      }
    });
    // create document object
    this.service.create([obj], (err, docs) => {
      if (err) {
        errorHandler(res, err.message, `Failed to create new ${this.service.modelName || 'document'}`);
      } else {
        const successMessage = `${this.service.modelName || 'document'} created successfully`;
        console.log(successMessage, docs || 0);
        res.status(201).json(new JsonApiResponse({
          data: docs,
          meta: {
            status: 'success',
            message: successMessage
          }
        }));
      }
    });
  }

  findById(req: Request, res: Response): void {
    this.service.findOne({
      _id: new ObjectID(req.params.id)
    }, (err, doc) => {
      if (err) {
        errorHandler(res, err.message, `Failed to get ${this.service.modelName || 'document'}`);
      } else {
        res.status(200).json(new JsonApiResponse({
          data: doc,
          meta: {
            status: 'success',
            message: `Found ${upperFirst(this.service.modelName) || 'document'}`
          }
        }));
      }
    });
  }

  update(req: Request, res: Response): void {
    const updateDoc = req.body;
    delete updateDoc._id;
    // validate object
    this.service.validate(updateDoc, (err, doc) => {
      if (err) {
        errorHandler(res, err.message, `Failed to validate ${this.service.modelName || 'document'}`, doc);
      }
    });
    // find and update document
    this.service.update(req.params.id, updateDoc, (err, doc) => {
      if (err) {
        errorHandler(res, err.message, `Failed to update ${this.service.modelName || 'document'}`);
      } else {
        updateDoc._id = req.params.id;
        res.status(200).json(new JsonApiResponse({
          data: updateDoc,
          meta: {
            status: 'success',
            message: `${this.service.modelName || 'document'} updated successfully`
          }
        }));
      }
    });
  }

  delete(req: Request, res: Response): void {
    this.service.delete(req.params.id, {}, (err, doc) => {
      if (err) {
        errorHandler(res, err.message, `Failed to delete ${this.service.modelName || 'document'}`);
      } else {
        res.status(200).json(new JsonApiResponse({
          data: true,
          meta: {
            status: 'success',
            message: `${this.service.modelName || 'document'} deleted successfully`,
            removed: req.params.id
          }
        }));
      }
    });
  }

}
