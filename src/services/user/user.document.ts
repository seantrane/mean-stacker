import { Document } from 'mongoose';

// (re)exports
export { UserInterface, UserPhoneInterface } from './user.interface';

/**
 * Use this interface to implement a `User` mongoose.Document
 * @type {UserDocument}
 * @extends {Document}
 */
export interface UserDocument extends Document {
  _id: String;
  name?: String;
  email?: String;
  password?: String;
  admin?: Boolean;
  phone?: UserPhoneDocument;
}

/**
 * Use this interface to implement a `User.phone` mongoose.Document
 * @type {UserPhoneDocument}
 * @extends {Document}
 */
export interface UserPhoneDocument extends Document {
  mobile?: String;
  work?: String;
}
