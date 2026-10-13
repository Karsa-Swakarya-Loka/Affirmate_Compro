import * as migration_20261012_132733 from './20261012_132733';
import * as migration_20261012_140701 from './20261012_140701';

export const migrations = [
  {
    up: migration_20261012_132733.up,
    down: migration_20261012_132733.down,
    name: '20261012_132733',
  },
  {
    up: migration_20261012_140701.up,
    down: migration_20261012_140701.down,
    name: '20261012_140701'
  },
];
