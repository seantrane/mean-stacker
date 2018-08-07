// local dependencies
import { BaseCollection, BaseEntity } from '../../utils';
import { UserInterface, UserPhoneInterface } from './user.interface';
// (re)exports
export {
  BaseCollection,
  BaseEntity,
  UserInterface,
  UserPhoneInterface
};

export class Users extends BaseCollection {

  constructor(arr: Array<{}> | Array<Object> | Array<User>) {
    super(arr); // assignEntities(arr);
  }

  assignEntities(arr: Array<{}> | Array<Object> | Array<User>): void {
    for (const obj of arr) {
      this._collection.push(new User(obj));
    }
  }

}

export class User extends BaseEntity implements UserInterface {

  // TypeScript requires properties to be "(un)defined" so the compiler knows they exist.
  // Without this, the entity properties will never be set by `assignValues` method.
  protected _entity: UserInterface = {
    _id: undefined,
    name: undefined,
    email: undefined,
    phone: {
      work: undefined,
      mobile: undefined
    }
  };

  constructor(obj: {} | Object) {
    super(obj);
    this.assignValues(obj);
  }

  // user._id
  get _id(): string {
    return this._entity._id;
  }
  set _id(arg: string) {
    this._entity._id = arg;
  }
  set_id(arg: string): User {
    this._id = arg;

    return this;
  }

  // user.name
  get name(): string {
    return this._entity.name;
  }
  set name(arg: string) {
    this._entity.name = arg;
  }
  setName(arg: string): User {
    this.name = arg;

    return this;
  }

  // user.email
  get email(): string {
    return this._entity.email;
  }
  set email(arg: string) {
    this._entity.email = arg;
  }
  setEmail(arg: string): User {
    this.email = arg;

    return this;
  }

  // user.password
  get password(): string {
    return this._entity.password;
  }
  set password(arg: string) {
    this._entity.password = arg;
  }
  setPassword(arg: string): User {
    this.password = arg;

    return this;
  }

  // user.admin
  get admin(): boolean {
    return this._entity.admin;
  }
  set admin(arg: boolean) {
    this._entity.admin = arg;
  }
  setAdmin(arg: boolean): User {
    this.admin = arg;

    return this;
  }

  // user.phone
  get phone(): UserPhoneInterface {
    return this._entity.phone;
  }
  set phone(arg: UserPhoneInterface) {
    this._entity.phone = new UserPhone(arg);
  }
  setPhone(arg: UserPhoneInterface): User {
    this.phone = arg;

    return this;
  }

}

export class UserPhone extends BaseEntity implements UserPhoneInterface {

  // TypeScript requires properties to be "(un)defined" so it knows they exist.
  protected _entity: UserPhoneInterface = {
    mobile: undefined,
    work: undefined
  };

  constructor(obj: {} | Object) {
    super(obj);
    this.assignValues(obj);
  }

  // phone.mobile
  get mobile(): string {
    return this._entity.mobile;
  }
  set mobile(arg: string) {
    this._entity.mobile = arg;
  }
  setMobile(arg: string): UserPhone {
    this.mobile = arg;

    return this;
  }

  // phone.work
  get work(): string {
    return this._entity.mobile;
  }
  set work(arg: string) {
    this._entity.work = arg;
  }
  setWork(arg: string): UserPhone {
    this.work = arg;

    return this;
  }

}
