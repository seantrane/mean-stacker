/**
 * Use this interface to implement a `User` entity/object
 * @type {UserInterface}
 */
export interface UserInterface {
  _id?: string;
  name?: string;
  email?: string;
  password?: string;
  admin?: boolean;
  phone?: UserPhoneInterface;
}

/**
 * Use this interface to implement a `User.phone` entity/object
 * @type {UserPhoneInterface}
 */
export interface UserPhoneInterface {
  mobile?: string;
  work?: string;
}
