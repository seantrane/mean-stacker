export abstract class BaseEntity {

  // TypeScript requires properties to be "(un)defined" so it knows they exist.
  protected abstract _entity: any;

  constructor(obj: {} | Object) {
    // this.assignValues(obj);
  }

  // abstract assignValues(obj: {} | Object): void;
  assignValues(obj: {} | Object): void {
    for (const key of Object.keys(obj)) {
      if (key in this) {
        this[key] = obj[key];
      } else if (key in this._entity) {
        this._entity[key] = obj[key];
      }
    }
  }

  toObject(): {} {
    return JSON.parse(this.toString());
  }

  toString(): string {
    return JSON.stringify(this._entity);
  }

}

export abstract class BaseCollection {

  protected _collection: Array<BaseEntity> = [];

  constructor(arr: Array<{}> | Array<Object> | Array<BaseEntity>) {
    this.assignEntities(arr);
  }

  abstract assignEntities(arr: Array<{}> | Array<Object> | Array<BaseEntity>): void;
  // assignEntities(arr: Array<{}> | Array<Object> | Array<BaseEntity>) {
  //   for (const obj of arr) {
  //     this._collection.push(new BaseEntity(obj));
  //   }
  // }

  get length(): number {
    return this._collection.length;
  }

  concat(...items: Array<(BaseEntity | Array<BaseEntity>)>): number {
    this._collection = this._collection.concat(...items);

    return this.length;
  }

  every(cb: (currentValue, index?, arr?) => boolean, thisValue?): boolean {
    return this._collection.every(cb, thisValue);
  }

  filter(cb: (currentValue, index?, arr?) => {}, thisValue?): Array<BaseEntity> {
    return this._collection.filter(cb, thisValue);
  }

  find(cb: (currentValue, index?, arr?) => boolean, thisValue?): BaseEntity {
    return this._collection.find(cb, thisValue);
  }

  findIndex(cb: (currentValue, index?, arr?) => boolean, thisValue?): number {
    return this._collection.findIndex(cb, thisValue);
  }

  forEach(cb: (currentValue, index?, arr?) => void, thisValue?): BaseCollection {
    this._collection.forEach(cb, thisValue);

    return this;
  }

  includes(item: BaseEntity, start?: number): boolean {
    return (this.indexOf(item, start) >= 0);
  }

  indexOf(item: BaseEntity, start?: number, last: boolean = false): number {
    let index = -1;
    let i = 0;
    if (start === undefined) start = 0;
    for (const obj of this._collection) {
      if (i >= start && JSON.stringify(item) === JSON.stringify(obj)) {
        index = i;
        if (!last) break;
      }
      i++;
    }
    return index;
  }

  lastIndexOf(item: BaseEntity, start?: number): number {
    // return this._collection.lastIndexOf(item, start);
    return this.indexOf(item, start, true);
  }

  join(separator = ','): string {
    return this._collection.join(separator);
  }

  keys(): IterableIterator<number> {
    return this._collection.keys();
  }

  map(cb: (currentValue, index?, arr?) => {}, thisValue?): Array<{}> {
    return this._collection.map(cb, thisValue);
  }

  pop(): BaseEntity {
    return this._collection.pop();
  }

  push(...items: Array<BaseEntity>): BaseCollection {
    for (const obj of items) {
      this._collection.push(obj);
    }
    return this;
  }

  reverse(): BaseCollection {
    this._collection.reverse();

    return this;
  }

  shift(): BaseEntity {
    return this._collection.shift();
  }

  slice(start?: number, end?: number): Array<BaseEntity> {
    return this._collection.slice(start, end);
  }

  some(cb: (currentValue, index?, arr?) => boolean, thisValue?): boolean {
    return this._collection.some(cb, thisValue);
  }

  sort(compareFn?: (a: BaseEntity, b: BaseEntity) => number): BaseCollection {
    this._collection.sort(compareFn);

    return this;
  }

  splice(start?: number, deleteCount?: number): Array<BaseEntity> {
    return this._collection.splice(start, deleteCount);
  }

  toArray(): Array<Object> {
    const collection: Array<Object> = [];
    for (const entity of this._collection) {
      collection.push(entity.toObject());
    }
    return collection;
  }

  toString(): string {
    return JSON.stringify(this.toArray());
  }

  unshift(...items: Array<BaseEntity>): BaseCollection {
    for (const obj of items) {
      this._collection.unshift(obj);
    }
    return this;
  }

  values(): IterableIterator<BaseEntity> {
    return this._collection.values();
  }

}
