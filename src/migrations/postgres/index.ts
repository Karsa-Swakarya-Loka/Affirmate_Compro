import * as migration_20261012_141706 from './20261012_141706';
import * as migration_20261013_050500_vercel_blob_object_key from './20261013_050500_vercel_blob_object_key';

export const migrations = [
  {
    up: migration_20261012_141706.up,
    down: migration_20261012_141706.down,
    name: '20261012_141706',
  },
  {
    up: migration_20261013_050500_vercel_blob_object_key.up,
    down: migration_20261013_050500_vercel_blob_object_key.down,
    name: '20261013_050500_vercel_blob_object_key'
  },
];
