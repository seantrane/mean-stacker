import { BaseCollection, BaseEntity } from './entity';

export class SampleEntity extends BaseEntity {
  // TypeScript requires properties to be "(un)defined" so it knows they exist.
  // Without this, the entity properties will never be set by `assignValues` method.
  protected _entity: any = {
    _id: undefined,
    name: undefined,
    summary: undefined
  };
  // Assign entity property values using constructor.
  constructor(obj: {} | Object) {
    super(obj);
    this.assignValues(obj);
  }
  // Implement getter/setter methods for entity properties.
  // NOTE: `assignValues` method will use setter-methods first, if they exist.
  // NOTE: We can proxy any property name (e.g.; `id` is a proxy of `_id`), however...
  //       ...the entity will still contain the actual property name (e.g.; `_id`).
  get id(): string {
    return this._entity._id;
  }
  set id(arg: string) {
    this._entity._id = arg;
  }
  get name(): string {
    return this._entity.name;
  }
  set name(arg: string) {
    this._entity.name = arg;
  }
  // NOTE: Getter/setter methods are not actually required if entity-property exists, however...
  //       ...if these do not exist; TypeScript will complain that property doesn't exist.
  get summary(): string {
    return this._entity.summary;
  }
  set summary(arg: string) {
    this._entity.summary = arg;
  }
}

export class SampleCollection extends BaseCollection {
  assignEntities(arr: Array<{}> | Array<Object> | Array<BaseEntity>) {
    for (const obj of arr) {
      this._collection.push(new SampleEntity(obj));
    }
  }
}

export const sampleEntityData = {
  id: '1234567',
  name: 'Entity Name',
  summary: 'A sample entity used for testing'
};

describe('BaseEntity', () => {

  const entity: SampleEntity = new SampleEntity(sampleEntityData);

  it('should be an instanceof `SampleEntity` and `BaseEntity`', () => {
    expect(entity instanceof SampleEntity).toBeTruthy();
    expect(entity instanceof BaseEntity).toBeTruthy();
  });

  describe('`toString` method', () => {

    it('should be defined', () => {
      expect(entity.toString).toBeTruthy();
    });

    it('should return a string', () => {
      expect(typeof entity.toString()).toBe('string');
    });

    it('should return entity as a JSON string', () => {
      expect(entity.toString()).toBe('{"_id":"1234567","name":"Entity Name","summary":"A sample entity used for testing"}');
    });

  });

  describe('`id` property and methods', () => {

    it('should return `1234567`', () => {
      expect(entity.id).toBe('1234567');
    });

    it('should allow re-setting of property value', () => {
      entity.id = '1234567890';
      expect(entity.id).toBe('1234567890');
    });

  });

  describe('`name` property and methods', () => {

    it('should return `Entity Name`', () => {
      expect(entity.name).toBe('Entity Name');
    });

    it('should allow re-setting of property value', () => {
      entity.name = 'Entity Name, The Sequel';
      expect(entity.name).toBe('Entity Name, The Sequel');
    });

  });

  describe('`summary` property and methods', () => {

    it('should return `A sample entity used for testing`', () => {
      expect(entity.summary).toBe('A sample entity used for testing');
    });

    it('should allow re-setting of property value', () => {
      entity.summary = 'Another sample entity used for testing';
      expect(entity.summary).toBe('Another sample entity used for testing');
    });

  });

});

describe('BaseCollection', () => {

  const entity: SampleEntity = new SampleEntity(sampleEntityData);
  const collection: SampleCollection = new SampleCollection([entity]);

  it('should be an instanceof `SampleEntity` and `BaseEntity`', () => {
    expect(collection instanceof SampleCollection).toBeTruthy();
    expect(collection instanceof BaseCollection).toBeTruthy();
  });

  describe('`toArray` method', () => {

    it('should be defined', () => {
      expect(collection.toArray).toBeTruthy();
    });

    it('should return an array', () => {
      expect(Symbol.iterator in collection.toArray()).toBeTruthy();
    });

    it('should return an array of sample-entity objects', () => {
      console.log(JSON.stringify(collection));
      for (const obj of collection.toArray() as Array<SampleEntity>) {
        console.log(obj.toString());
        expect(typeof obj).toBe('object');
        expect('_id' in obj).toBeTruthy();
        expect('name' in obj).toBeTruthy();
        expect('summary' in obj).toBeTruthy();
        // expect(obj.id).toBe('1234567');
        expect(obj.name).toBe('Entity Name');
        expect(obj.summary).toBe('A sample entity used for testing');
      }
    });

  });

  describe('`toString` method', () => {

    it('should be defined', () => {
      expect(collection.toString).toBeTruthy();
    });

    it('should return a string', () => {
      expect(typeof collection.toString()).toBe('string');
    });

    it('should return entity as a JSON string', () => {
      expect(collection.toString()).toBe(
        '[{"_id":"1234567","name":"Entity Name","summary":"A sample entity used for testing"}]'
      );
    });

  });

  describe('`forEach` method', () => {

    it('should be defined', () => {
      expect(collection.forEach).toBeTruthy();
    });

    it('should iterate over array of sample-entities', () => {
      collection.forEach((obj) => {
        expect(typeof obj).toBe('object');
        expect(obj instanceof SampleEntity).toBeTruthy();
        expect(obj instanceof BaseEntity).toBeTruthy();
        expect('id' in obj).toBeTruthy();
        expect('name' in obj).toBeTruthy();
        expect('summary' in obj).toBeTruthy();
      });
    });

  });

  describe('`includes` method', () => {

    it('should be defined', () => {
      expect(collection.includes).toBeTruthy();
    });

    it('should find inclusion of sample-entity', () => {
      expect(collection.includes(entity)).toBeTruthy();
    });

    it('should find inclusion of sample-entity in control test', () => {
      const arr = [entity];
      expect(arr.includes(entity)).toBeTruthy();
    });

  });

  describe('`indexOf` method', () => {

    it('should be defined', () => {
      expect(collection.indexOf).toBeTruthy();
    });

    it('should find sample-entity as first item', () => {
      expect(collection.indexOf(entity)).toBe(0);
    });

    it('should find sample-entity as first item in control test', () => {
      const arr = [entity];
      expect(arr.indexOf(entity)).toBe(0);
    });

  });

  describe('`lastIndexOf` method', () => {

    it('should be defined', () => {
      expect(collection.lastIndexOf).toBeTruthy();
    });

    it('should find last sample-entity', () => {
      collection.push(entity);
      expect(collection.lastIndexOf(entity)).toBe(1);
    });

    it('should find last sample-entity in control test', () => {
      const arr = [entity, entity];
      expect(arr.lastIndexOf(entity)).toBe(1);
    });

  });

});
