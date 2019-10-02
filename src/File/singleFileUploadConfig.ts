import { diskStorage } from 'multer';
import { extname } from 'path';
import { rootDirPath } from '../config';

export default {
  storage: diskStorage({
    destination: rootDirPath + '/uploads',
    filename: (req, file, cb) => {
      // Generating a 32 random chars long string
      const randomName = Array(32).fill(null).map(() => (Math.round(Math.random() * 16)).toString(16)).join('');

      cb(null, `${randomName}${extname(file.originalname)}`);
    },
  }),
};
