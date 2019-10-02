import * as path from 'path';

export const jwt = {
  secret: 'omfg11',
  expires: '1d',
};

export const passwordHash = {
  saltRounds: 10,
};

export const rootDirPath = path.join(__dirname, '..');
