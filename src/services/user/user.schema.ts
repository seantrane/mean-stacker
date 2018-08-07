// global dependencies
import { Schema } from 'mongoose';
import { gunzipSync, gzipSync } from 'zlib';
import { assign, isEmpty } from 'lodash';
// (re)exports
export {
  UserDocument,
  UserInterface,
  UserPhoneDocument,
  UserPhoneInterface
} from './user.document';

/**
 * get schema
 * @param  {string}          collection
 * @return {Schema}
 */
export function getSchema(collection?: string): Schema {
  const schema = new Schema(assign((
    (!isEmpty(collection)) ? {
      _id: {
        type: Schema.Types.ObjectId,
        required: [true, 'ID is required']
      }
    } : {}
  ), {
    name: {
      type: String,
      trim: true
    },
    email: {
      type: String,
      trim: true
    },
    password: String,
    admin: {
      type: Boolean,
      default: false
    }
  }));

  schema.set('toObject', { getters: true });
  schema.set('toJSON', { getters: true });

  if (!isEmpty(collection)) {
    schema.set('collection', collection);
  } else {
    schema.set('_id', false);
    schema.set('id', false);
    schema.set('toJSON', {
      getters: true,
      transform: (doc: any, ret: any, options: any): any => {
        delete ret._id;
        delete ret.__v;

        return ret;
      }
    });
  }

  schema.virtual('message').get(function() {
    // let buf = Buffer.from(this.compressed, 'utf8');
    let buf = this.compressed;
    try {
      buf = gunzipSync(buf);
    } catch (err) {
      console.log('Got error from gunzipSync');
      console.error(err);
    }

    return buf.toString();
  });

  schema.virtual('message').set(function(str: string) {
    let buf = Buffer.from(str, 'utf8');
    buf = gzipSync(buf);
    this.compressed = buf;
  });

  return schema;
}
