module.exports = {
  apps: [
    {
      name: 'marketing-backend',
      script: './index.js',
    },
  ],
  deploy: {
    production: {
      user: 'ubuntu',
      host: 'ec2-34-229-231-51.compute-1.amazonaws.com',
      key: 'C:UsersankumarDownloadsec2-marketing.pem',
      ref: 'origin/master',
      repo: 'https://github.com/akusany2/marketing-backend.git',
      path: '/marketingapp',
      'post-deploy':
        'npm install && npm run prestart:prod && npm run start:prod && pm2 startOrRestart ecosystem.config.js',
    },
  },
};
