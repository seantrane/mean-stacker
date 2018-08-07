module.exports = {
  apps: [
    // {
    //   name:               'express',
    //   script:             './dist/server/index.js',
    //   watch:              true,
    //   exec_mode:          'cluster',
    //   instances:          -1,
    //   max_memory_restart: '100M',
    //   log_date_format:    'YYYY-MM-DD HH:mm:ss Z',
    //   error_file:         '/logs/express-error.log',
    //   out_file:           '/logs/express-out.log',
    //   merge_logs:         true,
    //   env:                {
    //     COMMON_VARIABLE: 'true'
    //   },
    //   env_prod: {
    //     NODE_ENV: 'prod'
    //   },
    //   env_uat: {
    //     NODE_ENV: 'uat'
    //   },
    //   env_dev: {
    //     NODE_ENV: 'dev'
    //   },
    //   env_local: {
    //     NODE_ENV: 'local'
    //   },
    //   env_test: {
    //     NODE_ENV: 'test'
    //   }
    // },
    {
      // name:               'ng',
      script:             'serve',
      watch:              true,
      // exec_mode:          'cluster',
      // instances:          -1,
      max_memory_restart: '100M',
      log_date_format:    'YYYY-MM-DD HH:mm:ss Z',
      error_file:         './logs/ng-error.log',
      out_file:           './logs/ng-out.log',
      merge_logs:         true,
      env:                {
        'PM2_SERVE_PATH': './dist/client',
        'PM2_SERVE_PORT': 8080
      },
      env_prod: {
        NODE_ENV: 'prod'
      },
      env_uat: {
        NODE_ENV: 'uat'
      },
      env_dev: {
        NODE_ENV: 'dev'
      },
      env_local: {
        NODE_ENV: 'local'
      },
      env_test: {
        NODE_ENV: 'test'
      }
    }
  ]
};
