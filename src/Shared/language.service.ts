import { Global } from '@nestjs/common';

@Global()
export class LanguageService {
  database = {
    userDbPrefix: 'user',
  };
}
