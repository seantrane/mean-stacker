import { isEmpty, isString, merge } from 'lodash';
import { Connection, createConnection } from 'mongoose';

export function getMongoDbUri(
  domains: Array<string>,
  database: string,
  user: string,
  password: string,
  opt?: Array<string>
): string {
  const uri = 'mongodb://'
    + `${user}:${password}`
    + '@' + domains.join(',')
    + `/${database}`
    + '?' + opt.join('&');

  return uri;
}

export function getMlabUri(
  deploymentId: string,
  database: string,
  user: string,
  password: string,
  subdomain = 'mlab.com'
): string {
  const domains = [`${deploymentId}-a0.${subdomain}:${deploymentId.substr(-5)}`];
  const opts = [`replicaSet=rs-${deploymentId}`];
  if (subdomain !== 'mlab.com') {
    domains.push(`${deploymentId}-a1.${subdomain}:${deploymentId.substr(-5)}`);
    opts.push('ssl=true');
  }
  return getMongoDbUri(domains, database, user, password, opts);
}

export function getMongoDbConnection(connection?: Connection | String): Connection {

  if (connection instanceof Connection) {
    return connection;
  }

  const connectionString = (
    isString(connection) && ! isEmpty(connection)
  ) ? connection : undefined;

  const MONGODB_URI = connectionString || process.env.MONGODB_URI
    || (process.env.MONGODB_USER && process.env.MONGODB_PASSWORD) ? getMlabUri(
      process.env.MONGODB_MLAB_ID,
      process.env.MONGODB_USER,
      process.env.MONGODB_PASSWORD,
      process.env.MONGODB_DATABASE,
      process.env.MONGODB_MLAB_DOMAIN
    ) : '';

  let opts = (process.env.MONGODB_OPTS) ? JSON.parse(process.env.MONGODB_OPTS) : {};
  opts = merge(opts, {
    // default options
    useMongoClient: true,
    poolSize: 10,
    connectionTimeoutMS: 1000,
    socketTimeoutMS: 1000
  });

  return (MONGODB_URI === '') ? undefined : createConnection(MONGODB_URI, opts);
}
